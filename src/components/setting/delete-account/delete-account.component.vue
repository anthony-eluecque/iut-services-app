<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialogVisible"
      width="auto"
    >
      <v-card>
        <v-card-title class="text-h5">
          Suppression de votre compte
        </v-card-title>
        <v-card-text>
          Voulez vous vraiment supprimez votre compte ?
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="red-darken-1"
            variant="text"
            @click="props.deleteAccount()"
          >
            Oui
          </v-btn>
          <v-btn
            color="blue-darken-1"
            variant="text"
            @click="closeDialog"
          >
            Non
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
  
<script setup lang="ts">
import { ref, watch } from 'vue';

 
const props = defineProps({
  deleteAccount: {
    type: Function,
    required:true
  },
  isDisplay : {
    type : Boolean,
    required: true
  }
})

const emit = defineEmits<{
  (e:'closeDialog') : void,
}>();

const dialogVisible = ref(props.isDisplay);

watch(dialogVisible, () => closeDialog());

const closeDialog = () => emit('closeDialog')
    
</script>
  