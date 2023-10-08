import { Pagination } from "@/types";
import { RootState } from "./app";

export const initPagination = () : Pagination => {
    return {
        page : 1,
        rowsPerPage : 5,
        totalItems : 5
    }
}
  
  // Méthode d'appel pour initialiser le store
export const initStore = () : RootState => {
    // const fakeData = generateFakerArrayItem()
    return {
        dataRows : [],
        currentUpdateItem : null,
        // inputField : initInputField(), 
        editingIndex : null,
        token : undefined,
        pagination : initPagination(),
        currentYear : new Date().getFullYear(),
        openUpdateCard: false,
        teachers : [],
        lessons : []
    };
}