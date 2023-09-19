<template>
        <div class ="container-info d-flex">
            <!-- <tr
                v-for="item in dataRowsById"
                :key="item.id"
            > -->
       
        


            <v-text-field
            model-value="John"

            variant="solo"
            readonly
          ></v-text-field>
          <v-text-field
            model-value="Doe"
            variant="solo"
      
            readonly
          ></v-text-field>
          <v-text-field
            model-value="1"
            variant="solo"
            readonly
          ></v-text-field>
       
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

.container-info v-text-field{


    padding-left: 20px;
    padding-right: 20px;
    border: 1px solid black;
    padding-top: 1%;
    padding-bottom: 1%;
}

.v-input__control {
  display: flex;
  grid-area: control;
  margin-left: 5%;
}

</style>