<template>
    <v-container fluid class="pl-0 pr-0 container-types-modal">
        <v-form ref="form">
            <v-row>
                <v-col cols="6">
                    <v-select  
                        v-model="name"
                        variant="outlined"
                        label="Type de cours"
                        :items="props.items"
                        hide-details
                    />
                </v-col>
                <v-col cols="1"></v-col>
                <v-col cols="5">
                    <v-text-field
                        label="Nb Heures de cours"
                        variant="outlined"
                        v-model="hours"
                        :rules="[rules.formatStringNumber,rules.required]"    
                    />
                </v-col>
            </v-row>
        </v-form>
    </v-container>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { ref,Ref, watch } from 'vue';

const props = defineProps({
    name: {
      type: String, 
      required: true, 
      default : ''
    },
    amountHours : {
        type : String,
        required: true,
        default: ''
    },
    index: {
        type : Number,
        required: true
    },
    validator: {
        type : Boolean,
        required : true
    },
    items : {
        type : Array,
        required: true
    }
});

const emit = defineEmits<{
    (e:'emitUpdate',index : number, name : string, hours: number, isValidOrNot : boolean) : void
}>();


const name = computed({
        get: () => props.name,
        set: async (newValue) => {
            const res = await form.value.validate();
            const { errors, valid} = res;
            emit('emitUpdate',props.index,newValue,parseInt(hours.value),valid);
        }
    }
)
const hours = computed(
    {
        get: () => props.amountHours,
        set: async (newValue) => {
            if (isNaN(parseInt(newValue))){
                newValue = '0'
            }
            const res = await form.value.validate();
            const { errors, valid} = res;
            emit('emitUpdate',props.index,name.value,parseInt(newValue),valid);
        }
    }
)

const form = ref(null)
const rules = {
    required: (value : string) => !!value || 'Champs requis',
    formatStringNumber: (value : string) => {
        const regex = /^\d+$/;
        return regex.test(value) || 'Un chiffre/nombre entier est attendu'
    }
}
</script>

