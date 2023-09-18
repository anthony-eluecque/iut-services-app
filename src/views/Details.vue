
<template>
    <section class="container d-flex flex-column">
        <div class="container-title d-flex">
            <h2>Services prévisionnels de {{id}}</h2>
            <h2>logo</h2>
        
        </div> 
        <div class="container-teacher d-flex">
            <h2>Enseignant</h2>
        
        </div> 

        <div class ="container-info d-flex">

        <label for="nom"></label>
            <input type="text" id="Lastname" name="nom" value="Patric">
            <label for="prénom"></label>
            <input type="text" id="Firstname" name="nom" value= "Joe">
            <label for="id"></label>
            <input type="text" id="id" name="nom" value= "1">

        </div>

        <div class ="container-text d-flex">

            <h3>TABLEAU RÉCAPITULATIF DU SERVICE PRÉVISIONNEL</h3>
            <h3> ANNÉE UNIVERSITAIRE </h3>

        </div>

  </section>
  
</template>
  
<script lang="ts" setup>

import DataTable from '@/components/DataTable.vue'
import TeacherField from '@/components/TeacherField.vue';
import { useAppStore } from '@/store'
import { onMounted } from 'vue';
import { computed } from 'vue';
import router from '@/router';
const id = router.currentRoute.value.params.id

const AppStore = useAppStore();





</script>




  
<style>
/* .container-pagination{
  margin-top: 30px;
} */

.container-teacher{
    padding-left: 20px;
    padding-right: 20px;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 50px;
    margin-top: 5%;
    background: rgb(70, 99, 248);

}

.container-teacher h2{
  
    color: #ffffff;
}

.container-text{
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 110px;

}

.container-info{
    padding-left: 20px;
    padding-right: 20px;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 110px;
    background: white;
}

.container-info input{
   
    border: 1px solid black;
    padding-top: 1%;
    padding-bottom: 1%;
}

.container-title{
    padding-left: 20px;
    padding-right: 20px;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 110px;
    background: white;
}

.container-title h2{
    font-family: 'Montserrat',sans-serif;
    font-weight: bold;
    font-size: 32px;
}

</style>