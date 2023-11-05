<template>
    <v-container fluid class="pl-0 pr-0 container-types-modal">
        <v-row no-gutters>
            <v-col cols="6">
                <v-select  
                    v-model="name"
                    variant="outlined"
                    label="Type de cours"
                    :items="items"
                    hide-details
                />
            </v-col>
            <v-col cols="1"></v-col>
            <v-col cols="5">
                <v-text-field
                    label="Nombre de cours"
                    variant="outlined"
                    hide-details
                    v-model="hours"
                />
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import { onMounted,ref,Ref, watch } from 'vue';

const items = ['CM','TP','TD']

const props = defineProps({
    name: {
      type: String, 
      required: true, 
      default : ''
    },
    amountHours : {
        type : Number,
        required: true,
        default: 0
    },
    index: {
        type : Number,
        required: true
    }
});

const emit = defineEmits<{
    (e:'emitUpdate',index : number, name : string, hours: number)
}>();

const name : Ref<string> = ref(props.name)
const hours : Ref<number> = ref(props.amountHours)

watch(name, () => {
    emit('emitUpdate',props.index,name.value,parseInt(hours.value))
})
watch(hours, () => {
    emit('emitUpdate',props.index,name.value,parseInt(hours.value))
})
</script>

