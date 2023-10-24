<template>
    <div class="table-wrap">
        <h2>Liste des utilisateurs de l’Application</h2>
        <table class="table">
            <thead class="thead">
                <tr>
                    <th>Nom</th>
                    <th>Prénom</th>
                    <th>Adresse Mail</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <userRowTableComponent :item="user" v-for="(i) in 5"/>
            </tbody>
        </table>
    </div>

</template>


<script setup lang="ts">
import userRowTableComponent from '../user-row-table/user-row-table.component.vue';
import { User } from '@/types';
const user : User = {
    email : 'test@gmail.com',
    firstName : 'prénom',
    isAdmin : false,
    lastName : "nom",
    password : "oui"
}

</script>
