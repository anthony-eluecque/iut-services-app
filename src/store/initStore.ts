import { Pagination } from "@/types";
import { RootState } from "./app";


/**
 * Initialise la configuration de pagination avec des valeurs par défaut.
 *
 * @returns {Pagination} - La configuration initiale de pagination.
 */
export const initPagination = () : Pagination => {
  return {
    page : 1,
    rowsPerPage : 5,
    totalItems : 5
  }
}
  
/**
 * Initialise l'état de l'application avec des valeurs par défaut.
 *
 * @returns {RootState} - L'état initial de l'application.
 */
export const initStore = () : RootState => {
  return {
    teacherCriterias : {
      matricule : '',
      nom : '',
      prenom : ''
    },
    dataRows : [],
    currentUpdateItem : null,
    editingIndex : null,
    token : undefined,
    pagination : initPagination(),
    currentYear : new Date().getFullYear(),
    openUpdateCard: false,
    criterias: {id: '', prenom: '', nom: '', ressource: '', libelle: ''},
    userCriterias: { nom: '', prenom: '', email: ''},
    teachers : [],
    lessons : [],
    users: [],
    currentDeleteTeacher : null,
    currentDeleteUser : null,
    currentUpdateUser : null,
    alert : {
      display : false,
      text : '',
      title : '',
      type : undefined
    },
    currentUpdateTeacher : null,
    isDisplayParams: false,
  };
}