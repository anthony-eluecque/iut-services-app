<template>
    <div class="table-wrap">

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
                <userRowTableComponent v-for="(i) in 5"/>
            </tbody>
        </table>
    </div>

</template>


<script setup lang="ts">
import userRowTableComponent from '../user-row-table/user-row-table.component.vue';
</script>
