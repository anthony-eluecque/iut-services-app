<template>
  <table class="styled-table">
    <thead>
      <tr>
        <th>ID</th>
        <th>NOM</th>
        <th>Prénom</th>
        <th>ID</th>
        <th>Libellé</th>
        <th>Vol H</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="AppStore.isCreatingItem">
        <td
          v-for="(field,index) in inputField"
          :key="index"
        > 
          <div class="text-field-container">
            <v-text-field
              class=""
              :label="field.label"
              variant="outlined"
            />
          </div>
        </td>
      </tr>

      <tr
        v-for="(item, index) in tableData"
        :key="index"
      >
        <td>{{ item.id }}</td>
        <td>{{ item.nom }}</td>
        <td>{{ item.prenom }}</td>
        <td>{{ item.id }}</td>
        <td>{{ item.libelle }}</td>
        <td>{{ item.volH }}</td>
        <td>
          <!-- Todo : Ajouter nos actions -->
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/store'
const AppStore = useAppStore(); // Init un store avec pinia

// Temp : fake data (remplacer avec faker (voir doc sur google))
const tableData =  [
  { id: 1, nom: 'Nom1', prenom: 'Prenom1', libelle: 'Libelle1', volH: 10 },
  { id: 2, nom: 'Nom2', prenom: 'Prenom2', libelle: 'Libelle2', volH: 15 },
  { id: 3, nom: 'Nom2', prenom: 'Prenom2', libelle: 'Libelle2', volH: 15 },
  { id: 4, nom: 'Nom2', prenom: 'Prenom2', libelle: 'Libelle2', volH: 15 },
  { id: 5, nom: 'Nom2', prenom: 'Prenom2', libelle: 'Libelle2', volH: 15 }
];

const inputField = [
  { label : "Id"},
  { label : "Nom"},
  { label : "Prénom"},
  { label : "Id"},
  { label : "Libellé"},
  { label : "Vol H"},
  { label : "Temporaire"}
]

</script>


<style scoped>

.styled-table{
    width: 100%;
    border-collapse: collapse;
}

.styled-table thead{
    background-color: #4663F8;
    font-family: 'Montserrat',sans-serif;
    font-weight: 500;
    font-size: 25px;
}


.styled-table thead tr {
    /* background-color: #009879; */
    color: #ffffff;
    text-align: left;
}

.styled-table th {
    padding: 10px 15px;
}

.styled-table td {
    padding: 15px 15px;
}

.styled-table tbody tr:nth-of-type(even) {
    background-color: #f3f3f3;
}

.styled-table tbody tr:nth-of-type(odd) {
    background-color: white;
}


.text-field-container {
    display: flex;
    align-items: center; 
}

</style>