<template>
    <section class="container d-flex flex-column">
        <div class="container-title d-flex">
            <h2>Visualisation d'un Service Prévisionnel</h2>
        </div>
        <div class="container-teacher d-flex">
            <h2>Enseignant</h2>
        </div>
        <TeacherField />
        <div class="container-text d-flex">
            <h3>TABLEAU RÉCAPITULATIF DU SERVICE PRÉVISIONNEL</h3>
            <h3>ANNÉE UNIVERSITAIRE {{ dataRows[0].service?.year }}</h3>
        </div>
        <DetailsTable />
        <div class="container-hour d-flex">
            <p>TOTAL HEURES</p>
        </div>
        <div class="return-action">
            <v-btn height="55px" prepend-icon="mdi-arrow-left" text="Retour" color="red" @click="returnServicePage()" />
            <v-btn height="55px" prepend-icon="mdi-download" text="Télécharger en PDF" color="green" @click="downloadAsPDF()" />
        </div>
    </section>
</template>

  
<script lang="ts" setup>

import DetailsTable from '@/components/DetailsTable.vue';
import TeacherField from '@/components/TeacherField.vue';
import { useAppStore } from '@/store'
import { computed } from 'vue';
import router from '@/router';

const id = router.currentRoute.value.params.id
const AppStore = useAppStore();
const dataRows = computed(() => AppStore.getDataRows);

const page = computed({
    get: () => AppStore.pagination.page,
    set: async (newValue) => {
        await AppStore.fetchItems(newValue)
    }
})

const returnServicePage = () => {
    router.push('/services/')
}

const downloadAsPDF = () => {
    // do nothing
}

</script>


<style>
.main-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

.container-content {
    margin-top: 80px;
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: space-between;
}

.container-hour {
    text-align: center;
    margin-top: 20px;
    margin-bottom: 20px;
}

.container-teacher {
    padding-left: 20px;
    padding-right: 20px;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 50px;
    margin-top: 5%;
    background: rgb(70, 99, 248);
}

.container-teacher h2 {
    color: #ffffff;
}

.container-text {
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 110px;
}

.container-title {
    padding-left: 20px;
    padding-right: 20px;
    justify-content: space-between;
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
    margin-top: 60px;
    justify-content: space-between;
    display: flex;
}
</style>