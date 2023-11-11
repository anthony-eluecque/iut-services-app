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
        <addUser
          :is-creating-user="isCreatingUser"
          @removeCreateComponent="removeAddRow"
        />
        <userRowTableComponent
          v-for="(user, index) in users"
          :key="user.id"
          :user="user"
          :index="index"
          :is-updated="index === AppStore.getEditingIndex"
          @emitUpdate="toggleUpdate"
        />
      </tbody>
    </table>
  </div>
</template>


<script setup lang="ts">
import { isLoading } from '@/components/services/data-table-service/data-table-service.component';
import { useAppStore } from '@/store';
import { computed, onMounted } from 'vue';
import userRowTableComponent from '../user-row-table/user-row-table.component.vue';
import addUser from '../add-user/add-user.component.vue';

const AppStore = useAppStore();
const users = computed(() => AppStore.users);

const props = defineProps({
  isCreatingUser: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits<{
    (e: 'emitUpdate', index: number): void,
    (e: 'removeCreateComponent'): void
}>();

const toggleUpdate = (index: number) => {
  emit('emitUpdate', index)
}

const removeAddRow = () => {
  emit('removeCreateComponent')
}

onMounted(async () => {
  await AppStore.fetchUsersPage(1);
  isLoading.value = true
})

</script>
