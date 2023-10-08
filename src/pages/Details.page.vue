<template>
    <section class="container d-flex flex-column justify-space-between">
        <v-container fluid class="container-title d-flex primary bg-background-container">
            <h2>Visualisation d'un Service Prévisionnel</h2>
        </v-container>
        <section class="d-flex flex-column container-teacher mt-10">
            <div class="pl-4 pr-4 pt-2 pb-2">
                <h2>Enseignant</h2>
            </div>
            <TeacherInformations :teacher="selectedTeacher" />
        </section>
        <section class="d-flex flex-column justify-space-between">
            <div class="container-text d-flex  justify-space-between">
                <h3>TABLEAU RÉCAPITULATIF DU SERVICE PRÉVISIONNEL</h3>
                <h3>ANNÉE UNIVERSITAIRE {{ selectedItem?.service?.year }}-{{ selectedItem?.service?.year! + 1 }} </h3>
            </div>
            <DetailsServiceTable :service="selectedService" />
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

import DetailsServiceTable from '@/components/details-service-table/details-service-table.vue'
import TeacherInformations from '@/components/teacher-informations/teacher-informations.component.vue';
import { Ref, ref, onBeforeMount } from 'vue';
import router from '@/router';
import { Routes, fetchData, extractData } from '@/api';
import { Item, Teacher } from '@/types';
import { Service } from '@/types/service.types';
import { jsPDF } from "jspdf";

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

const returnServicePage = () => {
    router.push('/services/')
}

const downloadAsPDF = () => {
    // this.refs.Vue3Html2pdf.generatePdf();

    console.log("pdf")

    const doc = new jsPDF({
        orientation:"portrait",
        unit: "px",
        format: "a4"
    });

    doc.save(`Service.pdf`);
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