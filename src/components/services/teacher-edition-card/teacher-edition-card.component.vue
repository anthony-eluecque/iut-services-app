<template>
  <v-dialog 
    v-model="AppStore.getOpenDialog" 
    width="500"
    transition="slide-x-transition"
    content-class="custom-dialog"
    height="100vh"
  >
    <v-container
      fluid
      class="container-edition primary bg-background-container"
    >
      <div class="container-modal">
        <div class="container-title-edition">
          <h1>Modification d'un enseignement</h1>
        </div>
        <section class="container-content-modal">
          <div class="about-teacher">
            <h2>A propos du professeur :</h2>
            <v-text-field
              v-model="currentTeacher.givenId"
              hide-details
              class="pa-2"
              label="Matricule Enseignant"
              variant="outlined"
              readonly
            />
            <div class="container-v-fields">
              <v-text-field
                v-model="currentTeacher.firstName"
                hide-details
                class="pa-2"
                label="Prénom"
                variant="outlined"
                readonly
              />
              <v-text-field
                v-model="currentTeacher.lastName"
                hide-details
                class="pa-2"
                label="Nom"
                variant="outlined"
                readonly
              />
            </div>
          </div>
          <div class="about-lesson">
            <h2>Information sur la leçon</h2>

            <div class="container-v-fields">
              <v-text-field
                v-model="currentLesson.givenId"
                hide-details
                class="pa-2"
                label="Ressource"
                variant="outlined"
                readonly
              />
              <v-text-field
                v-model="currentLesson.name"
                hide-details
                class="pa-2"
                label="Libellé"
                variant="outlined"
              />
            </div>
            <div class="container-lesson">
              <v-btn
                type="submit"
                color="primary"
                class="search-button"
                append-icon="mdi-plus"
                block
                @click="add"
              >
                Ajouter un type de cours
              </v-btn>
            </div>
            <v-list>
              <v-list-subheader class="menu-title">
                Types
              </v-list-subheader>

              <v-list-item
                v-for="(item, index) in children"
                :key="index"
              >   
                <lessonTypesField 
                  :id="item.id"
                  :index="index" 
                  :name="item.name" 
                  :items="items"
                  :amount-hours="item.amountHours.toString()"
                  :validator="validators[index]"
                  @emitDelete="deleteValues"
                  @emitUpdate="updateValues"
                />
              </v-list-item>
            </v-list>
          </div>
        </section>
        <section class="container-actions">
          <div class="actions">
            <v-btn
              color="error"
              width="40%"
              text="ANNULER"
              @click="removeModal()"
            />
            <v-btn
              color="green"
              width="40%"
              text="METTRE à JOUR"
              @click="updateItem()"
            />
          </div>
        </section>
      </div>
    </v-container>
  </v-dialog>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store';
import { 
  removeModal, 
  initializeComponent,
  children,
  add,
  updateDatas,
  updateItem,
  validators,
  currentTeacher,
  currentLesson,
  items,
needToBeDeleted
} from './teacher-edition-card.component'
import lessonTypesField from '@/components/services/lesson-types-fields/lesson-types.component.vue'
import { onUnmounted, ref } from 'vue';
import { onMounted } from 'vue';

const AppStore = useAppStore();
initializeComponent();

onMounted(() => updateDatas());

const updateValues = (
  index : number, name : string, hours : number , isValidOrNot : boolean
) => {
  items.value = items.value.filter((n) => n !== name);
  children.value[index].name = name;
  children.value[index].amountHours = hours;
  validators.value[index] = isValidOrNot;
}


const deleteValues = (index : number, id: string) => {
  if (id !== ''){
    needToBeDeleted.value.push(id)
  }
  children.value = children.value.filter((value,i) => i!==index);
  validators.value = validators.value.filter((value,i) => i!==index);
}

onUnmounted(() => {
  AppStore.setUpdateItem(null);
})
</script>