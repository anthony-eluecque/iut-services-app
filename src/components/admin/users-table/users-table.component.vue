<template>
    <div class="table-wrap">
        <h2>Liste des utilisateurs de l'Application</h2>
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
                <userRowTableComponent :item="user" v-for="user in users" />
            </tbody>
        </table>
    </div>
</template>


<script setup lang="ts">
import { isLoading } from '@/components/services/data-table-service/data-table-service.component';
import userRowTableComponent from '../user-row-table/user-row-table.component.vue';
import { useAppStore } from '@/store';
import { computed, onBeforeMount } from 'vue';

const AppStore = useAppStore();
const users = computed(() => AppStore.users);

onBeforeMount(async () => {
    await AppStore.fetchUsers();
    isLoading.value = true
})

</script>
