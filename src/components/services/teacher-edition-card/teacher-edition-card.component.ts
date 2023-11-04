import { useAppStore } from '@/store';
import { computed, markRaw, ref } from 'vue';
import lessonTypesField from '@/components/services/lesson-types-fields/lesson-types.component.vue'
import { Item, Lesson, Teacher } from '@/types';
import { Routes, updateData } from '@/api';


interface AppStore {
    getUpdatingItem: () => ReturnType<typeof useAppStore>['getUpdatingItem'],
    setStateDialog: (value: boolean) => void,
}

let appStoreInstance: AppStore | null = null;

export const initializeComponent = () => {
    appStoreInstance = {
        getUpdatingItem: () => useAppStore().getUpdatingItem,
        setStateDialog: (value: boolean) => useAppStore().setStateDialog(value),
    };
}

const currentItem = computed(() => appStoreInstance?.getUpdatingItem())
const currentTeacher = computed(() => currentItem.value?.service?.teacher)
const currentLesson = computed(() => currentItem.value?.lesson)

export const currentTeacherId = ref('')
export const currentTeacherFirstname = ref('')
export const currentTeacherLastname = ref('')
export const currentLessonGivenId = ref('')
export const currentLessonName = ref('')

export const removeModal = () => {
    appStoreInstance?.setStateDialog(false)
}

export const children = ref(new Array())

export const updateDatas = ( ) => {
    const teacher = currentTeacher.value as Teacher;
    const lesson = currentLesson.value as Lesson
    if (!teacher || !lesson) return
    currentTeacherId.value = teacher.givenId;
    currentTeacherLastname.value = teacher.lastName;
    currentTeacherFirstname.value = teacher.firstName;
    currentLessonGivenId.value = lesson.givenId
    currentLessonName.value = lesson.name
    createComponents()
}

const createComponents = () => {
    const arr = new Array()
    const item = currentItem.value as Item
    if (!item) return []
    for (const type of item.lessonTypes) {
        // arr.push(markRaw(lessonTypesField))
        arr.push({name:type.lessonType.name,amountHours:type.amountHours})
    }
    children.value = arr
}

// export const children = ref(new Array())
export const updateItem = async () => {
    const item = currentItem.value as Item
    const { lessonTypes, ...rest } = item
    const itemToUpdate = {
        types:children.value,
        ...rest
    }
    await updateData(Routes.ITEMS,itemToUpdate)
}

export const add = () => {
    // const newComponent = markRaw(lessonTypesField)
    // children.value.push(newComponent)
    children.value.push({name:'',amountHours:0})
}