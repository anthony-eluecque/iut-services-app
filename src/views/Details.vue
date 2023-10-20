<template>

    <section class="container d-flex flex-column justify-space-between">
        <div class="container-title d-flex">
            <h2>Visualisation d'un Service Prévisionnel</h2>
           
        </div>
        <section class="d-flex flex-column container-teacher mt-10">
            <div class="pl-4 pr-4 pt-2 pb-2">
                <h2>Enseignant</h2>
            </div>
            <TeacherField :teacher="selectedTeacher" />
        </section>
        <section class="d-flex flex-column justify-space-between">
            <div class="container-text d-flex  justify-space-between">
                <h3>TABLEAU RÉCAPITULATIF DU SERVICE PRÉVISIONNEL</h3>
                <h3>ANNÉE UNIVERSITAIRE {{ selectedItem?.service?.year }}-{{ selectedItem?.service?.year! + 1 }} </h3>
            </div>
            <DetailsTable :service="selectedService" />
        </section>
        <div class="container-hour d-flex">
            <h3>TOTAL HEURES: {{ selectedItem?.amountHours }}</h3>
        </div>
        <div class="return-action d-flex">
            <v-btn prepend-icon="mdi-arrow-left" text="Retour" color="red" @click="returnServicePage()" />
            <v-btn prepend-icon="mdi-download" text="Télécharger en PDF" color="green" @click="downloadAsPDF()" />
        </div>
       
    </section>
</template>
  
<script lang="ts" setup>

import DetailsTable from '@/components/DetailsTable.vue';
import TeacherField from '@/components/TeacherField.vue';
import { Ref, ref, onBeforeMount } from 'vue';
import router from '@/router';
import { Routes, fetchData, extractData } from '@/api';
import { Item, Teacher } from '@/types';
import { Service } from '@/types/service.types';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { useAppStore } from '@/store';

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
   
   
    // Todo : On doit récupérer tous items d'un service (celui selectionner)
    // selectedService.service 
})

const returnServicePage = () => {
    router.push('/services/')
}

const downloadAsPDF = () => {

    const doc = new jsPDF({ unit: 'pt', format: 'a4' });

    // header
    const yearText = `Année Universitaire: ${selectedServiceByOrder.value.year}-${selectedServiceByOrder.value.year + 1}`;
    const serviceText = `Service prévisionnel de ${selectedTeacher.value.lastName} ${selectedTeacher.value.firstName}`;

    const headerBlockX = 50;
    const headerBlockY = 50;
    const headerBlockWidth = doc.internal.pageSize.getWidth() - headerBlockX * 2;
    const headerBlockHeight = 40;

    doc.rect(headerBlockX, headerBlockY, headerBlockWidth, headerBlockHeight);

    const rightTextWidth = doc.getTextWidth(serviceText);
    const rightTextX = headerBlockX + headerBlockWidth - rightTextWidth - 10;

    doc.text(yearText, headerBlockX + 10, headerBlockY + headerBlockHeight / 2 + 3);
    doc.text(serviceText, rightTextX, headerBlockY + headerBlockHeight / 2 + 3); 

//  semestre

    const TotalSBlockX = 500;
    let BlockY = 125
    let semestrePrecedent = 0;

    const tableSemestres = [
                ['Enseignements', 'Type', 'Volume'],
                

            ];

    selectedServiceByOrder.value.items?.forEach((item : Item) => {

        const id = item.lesson?.givenId ? item.lesson?.givenId : ""
        const semestre = parseInt(id.split('.')[0].slice(1));


        if (semestre !== semestrePrecedent) {


            const CenterText = `Semestre ${semestre}`;

            const block1X = 50;
            const bloc1kWidth = doc.internal.pageSize.getWidth() - block1X * 2;
            const block1Height = 40;

            doc.rect(block1X, BlockY, bloc1kWidth, block1Height);
            const textWidth = doc.getTextWidth(CenterText);
            const centerX = block1X + (bloc1kWidth - textWidth) / 2;
            doc.text(CenterText, centerX, BlockY + block1Height / 2 + 3);

            tableSemestres.length = 1

           
            tableSemestres.push( [item.lesson?.givenId+ ' ' + item.lesson?.name!, item.type!+ ' 1h30', item.amountHours])
                 

        }

        else{

         
                tableSemestres.push([item.lesson?.givenId+ ' ' + item.lesson?.name!, item.type!+ ' 1h30', item.amountHours])
                

        



     
        }

        const tabY = BlockY + 50; 

const tablePosition = {
    startY: tabY, 
    };
autoTable(doc,{
head: [tableSemestres[0]], 
body: tableSemestres.slice(1),
...tablePosition, 
});


const TotalY = tabY + 100;


doc.text("Total:" +  AppStore.getServiceHours , TotalSBlockX, TotalY);
BlockY = TotalY + 50;  

        

        semestrePrecedent = semestre;
       
});


const TotalBlockX = 350;
const TotalBlockY = BlockY + 50;
const TotalBlockWidth = doc.internal.pageSize.getWidth() - TotalBlockX * 2;
const TotalBlockHeight = 40;

const TotalText = "Total" + AppStore.getServiceHours

doc.rect(TotalBlockX, TotalBlockY, TotalBlockWidth, TotalBlockHeight);

doc.setFontSize(12);

const rightTotalWidth = doc.getTextWidth(TotalText);
const rightTotalX = TotalBlockX + headerBlockWidth - rightTotalWidth - 10;

doc.text(TotalText, rightTotalX, TotalBlockY + headerBlockHeight); 

    doc.save('Service_Prévisionnel_de_' +(selectedTeacher.value.lastName) + '_' + (selectedTeacher.value.firstName) + (selectedService.value.year) + '-' +(selectedService.value.year + 1) +'.pdf');
}

</script>

<style>
.container {
    height: 100%;
}

.main-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    justify-content: space-between;
}

.container-hour {
    text-align: center;
    margin-top: 20px;
    margin-bottom: 20px;
    margin-left: auto;
}

.container-teacher {
    width: 100%;
    background: rgb(70, 99, 248);
}

.container-teacher h2 {
    color: #ffffff;
}

.container-text {
    align-items: center;
    width: 100%;
    margin-top: 20px;
    margin-bottom: 20px;
}

.container-title {
    padding: 20px;
    align-items: center;
    width: 100%;
    height: 110px;
    background: white;
}

.container-title h2 {
    font-family: 'Montserrat', sans-serif;
    font-weight: bold;
    font-size: 32px;
}

.return-action {
    display: flex;
    justify-content: space-between;
}
</style>