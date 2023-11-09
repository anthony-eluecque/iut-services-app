<template>
    <section class="container">
        <v-container fluid class="container-title-page primary bg-background-container">
            <h2>Gestion des utilisateurs</h2>
        </v-container>
        <UserEditionModal v-if="isEditingUser" />
        <v-container fluid class="container-actions">
            <v-row no-gutters>
                <v-col cols="6">
                    <searchBar />
                </v-col>
                <v-col cols="2">
                </v-col>
                <v-col cols="4">
                    <div class="add-action">
                        <v-btn height="55px" append-icon="mdi-plus" text="Ajouter un utilisateur" color="primary"
                            @click="addInputFields" />
                    </div>
                </v-col>
            </v-row>
        </v-container>
        <UsersTable @emit-update="openModalUpdate" :is-creating-user="isCreatingUser"
            @remove-create-component="removeInputFields" />
    </section>
</template>


<script setup lang="ts">
import UsersTable from '@/components/admin/users-table/users-table.component.vue';
import searchBar from '@/components/admin/search-bar/search-bar.component.vue'
import UserEditionModal from '@/components/admin/user-edition-modal/user-edition-modal.component.vue';
import { useAppStore } from '@/store';
import { Ref, ref, computed, onMounted } from 'vue';

const isCreatingUser: Ref<boolean> = ref(false);
const isEditingUser: Ref<boolean> = ref(false);
const AppStore = useAppStore();
const alert = computed(() => AppStore.getAlert);
const page = computed({
    get: () => AppStore.pagination.page,
    set: (value: number) => AppStore.fetchUsersPage(value)
});

onMounted(async () => {
    AppStore.paginationHandler(page.value);
});

const openModalUpdate = (index: number) => {
    isEditingUser.value = true;
    AppStore.setUpdateUser(AppStore.users[index]);
    AppStore.setStateDialog(true);
};

const addInputFields = () => {
    isCreatingUser.value = true;
};

const removeInputFields = () => {
    isCreatingUser.value = false;
};
</script>


<style lang="scss">
@import './admin';
</style>