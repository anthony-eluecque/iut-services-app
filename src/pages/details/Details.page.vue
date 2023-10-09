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
            <h3>TOTAL HEURES: {{ selectedItem?.amountHours }}</h3>
        </div>
        <div class="return-action">
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

<style lang="scss">
@import './details';
</style>