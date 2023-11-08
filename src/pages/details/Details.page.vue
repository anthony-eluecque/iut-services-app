<template>
    <section class="container">
        <v-container fluid class="container-title-page primary bg-background-container">
            <h2>Visualisation d'un Service Prévisionnel</h2>
        </v-container>
        <section class="container-teacher">
            <div class="container-title">
                <h2>Enseignant</h2>
            </div>
            <TeacherInformations :teacher="selectedTeacher" />
        </section>
        <section class="container-data-table">
            <div class="container-text">
                <h3>TABLEAU RÉCAPITULATIF DU SERVICE PRÉVISIONNEL</h3>
                <h3>ANNÉE UNIVERSITAIRE {{ selectedItem?.service?.year }}-{{ selectedItem?.service?.year! + 1 }} </h3>
            </div>
            <DetailsServiceTable :service="selectedService" />
        </section>
        <div class="container-hours">
            <h3>TOTAL HEURES: {{ getServiceHours() }}</h3>
        </div>
        <div class="return-action">
            <v-btn prepend-icon="mdi-arrow-left" text="Retour" color="red" @click="returnServicePage()" />
            <v-btn prepend-icon="mdi-download" text="Télécharger en PDF" color="green" @click="generatePDFObject()" />
        </div>
      
       
    </section>
</template>
  
<script lang="ts" setup>

import DetailsServiceTable from '@/components/details/details-service-table/details-service-table.vue'
import TeacherInformations from '@/components/details/teacher-informations/teacher-informations.component.vue';
import { Ref, ref, onBeforeMount } from 'vue';
import router from '@/router';
import { Routes, fetchData, extractData } from '@/api';
import { Item, Teacher } from '@/types';
import { Service } from '@/types/service.types';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { useAppStore } from '@/store';
import {PDFSemesters} from '@/types/pdfSemesters.interface';
import { SemesterTable } from '@/types/semesterTable';

const AppStore = useAppStore();
const selectedItem: Ref<Item | null> = ref(null)
const selectedTeacher: Ref<Teacher> = ref({ firstName: '', givenId: '', id: '', lastName: '' })
const selectedService: Ref<Service> = ref({ id: '', year: 0 });
const selectedServiceByOrder: Ref<Service> = ref({ id: '', year: 0 });


const props = defineProps({
    id: String,
    itemToOpenJSON: Object,
});

onBeforeMount(async () => {
    selectedItem.value = props.itemToOpenJSON as Item
    selectedTeacher.value = props.itemToOpenJSON?.service?.teacher
    selectedService.value = selectedItem.value.service as Service
    selectedServiceByOrder.value = selectedItem.value.service as Service

    selectedService.value = extractData(await fetchData(Routes.SERVICES + `/${selectedService.value.id}`))
    selectedServiceByOrder.value = extractData(await fetchData(Routes.SERVICES + `/${selectedService.value.id}/ascending`))[0]
})

const returnServicePage = () => {
    router.push('/services/')
}


const generatePDFObject = () => {

    const pdfSemester: PDFSemesters = {
        semesters : [],
        teacher : selectedTeacher.value,
        year : selectedServiceByOrder.value.year.toString() +'-' + (selectedServiceByOrder.value.year + 1).toString()
    }

    const Items = selectedServiceByOrder.value.items as Item[]

    let lastNumSemester = 0

    for (const item of Items ) {

        const id = item.lesson?.givenId as string; 
        const numSemester = parseInt(id.split('.')[0].slice(1));

        if (numSemester !== lastNumSemester) {
            const newSemester : SemesterTable = {
                numSemester : numSemester,
                items : [item]
            }

            pdfSemester.semesters.push(newSemester)
            lastNumSemester = numSemester;

        }
        else {

            const numSelectedSemester = pdfSemester.semesters.findIndex((sem:SemesterTable) => sem.numSemester == numSemester)
            const semester = pdfSemester.semesters[numSelectedSemester]

            pdfSemester.semesters[numSelectedSemester] = {
                numSemester : semester.numSemester, 
                items: [...semester.items , item] 
            }

        }
        
    }
    downloadPDF(pdfSemester)
}

const downloadPDF = (pdfSemester : PDFSemesters) => {
    const doc = new jsPDF({ unit: 'pt', format: 'a4' });

    const yearText = `Année Universitaire: ${pdfSemester.year}`;
    const serviceText = `Service prévisionnel de ${pdfSemester.teacher.firstName} ${pdfSemester.teacher.lastName}`;
    const headerBlockX = 50;
    const headerBlockY = 50;
    const headerBlockWidth = doc.internal.pageSize.getWidth() - headerBlockX * 2;
    const headerBlockHeight = 60;
    doc.rect(headerBlockX, headerBlockY + 3, headerBlockWidth, headerBlockHeight);

    const rightTextWidth = doc.getTextWidth(serviceText) -35;
    const rightTextX = headerBlockX + headerBlockWidth - rightTextWidth ;

    doc.text(serviceText, headerBlockX , headerBlockY + headerBlockHeight / 2 + 3);
    doc.text(yearText, rightTextX , headerBlockY + headerBlockHeight ); 


    const tableSemestres = [
        ['Enseignements', 'Types de Cours', 'Volume (en Heures)'],
    ];

    const totalSBlockX = 500;
    let blockY = 135
    const blockHeight = 40;

    for (const semester of pdfSemester.semesters) {

        if (blockY >= 760){
            blockY = 50
            doc.addPage()
            
        }

        const centerText = `Semestre ${semester.numSemester}`;
        const block1X = 50;
        const bloc1kWidth = doc.internal.pageSize.getWidth() - block1X * 2;

        doc.rect(block1X, blockY, bloc1kWidth, blockHeight);
        const textWidth = doc.getTextWidth(centerText);
        const centerX = block1X + (bloc1kWidth - textWidth) / 2;
        doc.text(centerText, centerX, blockY + blockHeight / 2 + 3);
    
        blockY = blockY+ 50; 

        const res = []
        for (const item of semester.items) {
            res.push([
                item.lesson?.givenId as string + ' ' + item.lesson?.name,
                "1H30 " + item.lessonTypes.map((lessonType) => lessonType.lessonType.name + " "),
                item.lessonTypes.map((lessonType) => lessonType.amountHours.toString() + " ")
            ])
        
        }

        const tablePosition = {
            startY: blockY, 
        };
        autoTable(doc,{
            head: [tableSemestres[0]], 
            body: res,
            ...tablePosition,   
            styles:{
                minCellHeight: 30
            }  

        });
        blockY = ((res.length +1) * 35 ) + blockY ;
        
        doc.text("Total:" + getSemesterHours(semester) , totalSBlockX, blockY);
        blockY = blockY+ 50;  

    }

    const totalText = `Total ${getServiceHours()}`;
    const blockTotalX = 450;
    blockY = blockY+ 50;
    const blocTotalWidth = 120;

    doc.rect(blockTotalX, blockY, blocTotalWidth, blockHeight);
    doc.text(totalText, totalSBlockX, blockY + blockHeight / 2 + 3);

    doc.save('Service_Prévisionnel_de_' +(selectedTeacher.value.lastName) + '_' + (selectedTeacher.value.firstName) + (selectedService.value.year) + '-' +(selectedService.value.year + 1) +'.pdf');

}

const getSemesterHours = (semester : SemesterTable) : number => {
    return semester.items?.reduce((acc, item) => acc + 
        item.lessonTypes.reduce((acc,type) => acc+type.amountHours 
        ,0)
    ,0) as number;
}

const getServiceHours = () : number => {
    return selectedService.value.items?.reduce((acc, item) => acc + 
        item.lessonTypes.reduce((acc,type) => acc+type.amountHours 
        ,0)
    ,0) as number;
}
</script>

<style lang="scss">
@import './details';
</style>