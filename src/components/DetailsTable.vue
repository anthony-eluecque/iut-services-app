<template>
    <table class="styled-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Enseignement</th>
          <th>Type</th>
          <th>Semestre</th>
          <th>Libellé</th>
          <th>Total d'heure</th>
        </tr>
      </thead>

      <tbody>
        <!-- <tr
        v-for="item in dataRows"
        :key="item.id"
      > -->
      <tr>
     
        <td>2</td>
        <td>Maths</td>
        <td>TD</td>
        <td>1</td>
        <td>Geo</td>
        <td>10</td>
        
      </tr>
     
    </tbody>
  </table>
</template>
   

<script lang="ts" setup>
import { useAppStore } from '@/store'
import InputField from './InputField.vue';
import { computed, onMounted, ref} from 'vue';
import { Item } from '@/types';
import router from '@/router';

const AppStore = useAppStore();

</script>

<style scoped>

.styled-table{
    padding-left: 20px;
    padding-right: 20px; 
    justify-content: space-between;
    align-items: center; 
    width: 100%;
    height: 110px; 

    margin: auto;
    /* height: 100vh; */
    /* display: flex; */
    padding: 20px;
    background: white;
}
.styled-table td{
    border-bottom: 1px solid grey;
    text-align: center;
     vertical-align: middle
}

.styled-table th{
    border-bottom: 1px solid grey;
    text-align: center;
}
</style>
