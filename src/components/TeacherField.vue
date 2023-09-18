<template>
        <div class ="container-info d-flex">
            <!-- <tr
                v-for="item in dataRowsById"
                :key="item.id"
            > -->
       
            <label for="nom"></label>
            <input type="text" id="Lastname" name="nom" value="Cozot">
            <label for="prénom"></label>
            <input type="text" id="Firstname" name="nom" value="Rémi">
            <label for="id"></label>
            <input type="text" id="id" name="nom" value="2">
       
        <!-- </tr> -->
        </div>
    
</template>

<script lang="ts" setup>
import { useAppStore } from '@/store'
import InputField from './InputField.vue';
import { computed, onMounted, ref} from 'vue';
import { Item } from '@/types';
import router from '@/router';

const AppStore = useAppStore();

const dataRowsById = computed(() => AppStore.getDataRows);

const teacherId = router.currentRoute.value.params.id

</script>

<style>

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

</style>