import { Teacher } from "./teacher.types"
import { SemesterTable } from "./semesterTable"

export interface PDFSemesters {
   semesters : SemesterTable[]
   year : string
   teacher : Teacher

} 