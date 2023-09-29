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


const selectedItem: Ref<Item | null> = ref(null)
const selectedTeacher: Ref<Teacher> = ref({ firstName: '', givenId: '', id: '', lastName: '' })
const selectedService: Ref<Service> = ref({ id: '', year: 0 });

const props = defineProps({
    id: String,
    itemToOpenJSON: Object,
});

onBeforeMount(async () => {
    selectedItem.value = props.itemToOpenJSON as Item
    selectedTeacher.value = props.itemToOpenJSON?.service?.teacher
    selectedService.value = selectedItem.value.service as Service

    // Todo : On doit récupérer tous items d'un service (celui selectionner)
    // selectedService.service
    selectedService.value = extractData(await fetchData(Routes.SERVICES + `/${selectedService.value.id}`))
})

console.log(selectedItem.value?.lesson?.givenId)

const returnServicePage = () => {
    router.push('/services/')
}

const downloadAsPDF = () => {

    const doc = new jsPDF({ unit: 'pt', format: 'a4' });


    // header

const leftText = `Année Universitaire: ${selectedService.value.year}-${selectedService.value.year + 1}`;
const rightText = `Service prévisionnel de ${selectedTeacher.value.lastName} ${selectedTeacher.value.firstName}`;

const headerBlockX = 50;
const headerBlockY = 50;
const headerBlockWidth = doc.internal.pageSize.getWidth() - headerBlockX * 2;
const headerBlockHeight = 40;

doc.rect(headerBlockX, headerBlockY, headerBlockWidth, headerBlockHeight);

doc.setFontSize(12);

const rightTextWidth = doc.getTextWidth(rightText);
const rightTextX = headerBlockX + headerBlockWidth - rightTextWidth - 10; // 10 is a padding from the right edge

doc.text(leftText, headerBlockX + 10, headerBlockY + headerBlockHeight / 2 + 3); // The +3 is to adjust the vertical centering of the text
doc.text(rightText, rightTextX, headerBlockY + headerBlockHeight / 2 + 3); // The +3 is to adjust the vertical centering of the text

//  semestre

const id = selectedItem.value?.lesson?.givenId ? selectedItem.value?.lesson?.givenId : ""


const Semestre = parseInt(id.split('.')[0].slice(1));

const CenterText = `Semestre ${Semestre}`;


const Block1X = 50;
const Block1Y = 125;
const Bloc1kWidth = doc.internal.pageSize.getWidth() - Block1X * 2;
const Block1Height = 40;

doc.rect(Block1X, Block1Y, Bloc1kWidth, Block1Height);

doc.setFontSize(12);
const textWidth = doc.getTextWidth(CenterText);
const centerX = Block1X + (Bloc1kWidth - textWidth) / 2;

doc.text(CenterText, centerX, Block1Y + Block1Height / 2 + 3);


// tableau semestre

    const tableSemestres = [
        ['Enseignements', 'Type', 'Volume'],
        [selectedItem.value?.lesson?.givenId + ' ' + selectedItem.value?.lesson?.name, selectedItem.value?.type + ' 1h30', selectedItem.value?.amountHours],
   
];
    const startY = 225; 


const tablePosition = {
  startY: startY, 
};


autoTable(doc,{
  head: [tableSemestres[0]], 
  body: tableSemestres.slice(1),
  ...tablePosition, 
});

    doc.save('Service  ' +(selectedTeacher.value.lastName) + ' ' + (selectedTeacher.value.firstName) + (selectedService.value.year) + '-' +(selectedService.value.year + 1) +'.pdf');
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