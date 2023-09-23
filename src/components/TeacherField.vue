<template>
  <div class ="container-info d-flex">
   
    <tr v-for="item in dataRows" :key="item.id">

      <td>
        <v-text-field
          :value="item.service?.teacher?.firstName"
          variant="solo"
          readonly
        ></v-text-field>
      </td>
        
      <td>
        <v-text-field
          :value="item.service?.teacher?.lastName"
          variant="solo"
          readonly
        ></v-text-field>
      </td>

          <td>
            <v-text-field
              :value="item.service?.teacher?.givenId"
              variant="solo"
              readonly
            ></v-text-field>
          </td>
        </tr>
     
  </div>

</template>

<script lang="ts" setup>
import { useAppStore } from '@/store'
import { computed, onMounted, ref} from 'vue';

const AppStore = useAppStore();

const dataRows = computed(() => AppStore.getDataRows);

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

.container-info td{

   padding-right: 10%;
  display: inline-block; 
  width: 300px;

}


</style>