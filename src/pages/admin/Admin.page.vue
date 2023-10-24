<template>
<section class="container">
        <v-container fluid class="container-title-page primary bg-background-container">
            <h2>Gestion des utilisateurs</h2>
        </v-container>   
        
        <v-container fluid class="container-actions">
            <v-row no-gutters>
                <v-col cols="6">
                    <searchBar/>

                </v-col>
                <v-col cols="2">

                </v-col>
                <v-col cols="4">
                    <addUser/>

                </v-col>
            </v-row>
        </v-container>

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