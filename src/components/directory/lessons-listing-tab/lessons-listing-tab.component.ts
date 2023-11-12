import { Item, Lesson } from "@/types";
import { cloneDeep } from "lodash";
import { DeepReadonly, Ref, computed, ref, watch } from "vue";
import { search } from "../teacher-search-bar/teacher-search-bar.component";

interface RowDataTable {
  givenId : string
  name : string
  amountHours : number
}

export const itemsPerPageText = ref('Résultats par page');

export const headers: Ref<DeepReadonly<any[]>> = ref([
  { title: 'ID Ressource', align: 'start', sortable: false, key: 'givenId' },
  { title: 'Enseignement', align: 'start', sortable: true, key: 'name' },
  { title: 'Total Heures', align: 'start', sortable: true, key: 'amountHours' },
]);


export const lessonData = ref(new Array())
export const displayTable = ref(false)

const lessonsArray = ref(new Array())

export const createArrayLessons = (lessons : Lesson[]) =>{
  lessonData.value = lessons.map((lesson : Lesson) : RowDataTable => {
    const totalAmountHours = lesson.items?.reduce((acc, item) => {
      return acc + calculateSumHours(item,lesson)
    }, 0) || 0;
    return {
      givenId : lesson.givenId,
      name : lesson.name,
      amountHours : totalAmountHours
    }
  })
  lessonsArray.value = cloneDeep(lessonData.value) 
}

export const calculateSumHours = (item : Item, lesson : Lesson) : number => {
  if (item.lesson?.name === lesson.name) {
    return item.lessonTypes.reduce(
      (acc,lessonType) => acc + lessonType.amountHours,0) || 0
  } else return 0
}   

export const searchGivenId = ref('')
export const searchName = ref('')

watch([searchName,searchGivenId],() => {
  if (searchName.value === '' && searchGivenId.value === '') lessonData.value = cloneDeep(lessonsArray.value)
  else 
    lessonData.value = lessonData.value.filter((lesson : Lesson) => {
      if (lesson.name.includes(searchName.value) && lesson.givenId.includes(searchGivenId.value))
        return lesson
    });
})