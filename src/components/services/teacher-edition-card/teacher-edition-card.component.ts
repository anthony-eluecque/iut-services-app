import { useAppStore } from '@/store';
import { computed } from 'vue';

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

export const currentTeacherId = computed(() => currentTeacher.value?.givenId ? currentTeacher.value?.givenId : '')
export const currentTeacherFirstname = computed(() => currentTeacher.value?.firstName ? currentTeacher.value?.firstName : '')
export const currentTeacherLastname = computed(() => currentTeacher.value?.lastName ? currentTeacher.value?.lastName : '')

export const currentLesson = computed(() => currentItem.value?.lesson)
export const currentLessonGivenId = computed(() => currentLesson.value?.givenId ? currentItem.value?.lesson?.givenId : '')
export const currentLessonName = computed(() => currentLesson.value?.name ? currentItem.value?.lesson?.name : '')

export const removeModal = () => {
    appStoreInstance?.setStateDialog(false)
}