<template>
<section class="container">
        <v-container fluid class="container-title-page primary bg-background-container">
            <h2>Gestion des utilisateurs</h2>
        </v-container>   
        
        <div class="container-actions">
            <searchBar/>
            <addUser/>
        </div>

        <UsersTable/>


    </section>
</template>


<script setup lang="ts">
import UsersTable from '@/components/admin/users-table/users-table.component.vue';
import addUser from '@/components/admin/add-user/add-user.component.vue'
import searchBar from '@/components/admin/search-bar/search-bar.component.vue'
</script>


<style lang="scss">
@import './admin';
</style>