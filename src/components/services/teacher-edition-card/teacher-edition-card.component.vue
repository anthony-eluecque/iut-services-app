<template>
    <v-dialog 
      v-model="AppStore.getOpenDialog" 
      width="500"
      transition="slide-x-transition"
      content-class="custom-dialog"
      height="100vh"
    >
        <v-container fluid class="container-edition primary bg-background-container"  >
            <div class="container-modal">
                <div class="container-title-edition">
                    <h1>Modification d'un enseignement</h1>
                  </div>
                 <section class="container-content-modal">
                    <div class="about-teacher">
                        <h2>A propos du professeur :</h2>
                        <v-text-field
                            v-model="currentTeacherId"
                            hide-details
                            class="pa-2"
                            label="Matricule Enseignant"
                            variant="outlined"
                            readonly
                        />
                        <div class="container-v-fields">
                            <v-text-field
                                v-model="currentTeacherFirstname"
                                hide-details
                                class="pa-2"
                                label="Prénom"
                                variant="outlined"
                                readonly
                            />
                            <v-text-field
                                v-model="currentTeacherLastname"
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
                                v-model="currentLessonGivenId"
                                hide-details
                                class="pa-2"
                                label="Ressource"
                                variant="outlined"
                                readonly
                            />
                            <v-text-field
                                v-model="currentLessonName"
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
                                    :index="index" 
                                    :name="item.name" 
                                    :amountHours="item.amountHours"
                                    :validator="validators[index]"
                                    @emitUpdate="updateValues"
                                    ref="child"

                                />
                                <!-- <component :is="item" :name="''" :hours="0"></component> -->
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
    currentTeacherId,
    currentTeacherFirstname,
    currentTeacherLastname,
    currentLessonGivenId,
    currentLessonName,
    initializeComponent,
    children,
    add,
    updateDatas,
    updateItem,
    validators
} from './teacher-edition-card.component'
import lessonTypesField from '@/components/services/lesson-types-fields/lesson-types.component.vue'
import { onUpdated } from 'vue';

const AppStore = useAppStore();
initializeComponent();
onUpdated(() => updateDatas());
const updateValues = (
    index : number, name : string, hours : number , isValidOrNot : boolean
) => {
    children.value[index].name = name
    children.value[index].amountHours = hours
    validators.value[index] = isValidOrNot
}
</script>