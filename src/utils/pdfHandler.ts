import { Item, Teacher } from "@/types";
import { PDFSemesters } from "@/types/pdfSemesters.interface";
import { SemesterTable } from "@/types/semesterTable";
import { Service } from "@/types/service.types";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

/**
 * Génère un Objet PDF à partir des Services Sélectionnés
 *
 * @description
 * Cette fonction crée un objet PDF contenant les informations sur les semestres, les enseignants,
 * et l'année académique à partir des services sélectionnés. Elle organise les services par semestre
 * et génère un fichier PDF à partir de ces données.
 */
export const generatePDFObject = (
  teacher : Teacher,
  service: Service
) => {

  const pdfSemester: PDFSemesters = {
    semesters : [],
    teacher : teacher,
    year : service.year.toString() +'-' + (service.year + 1).toString()
  }
  
  const Items = service.items as Item[]
  
  let lastNumSemester = 0
  
  for (const item of Items ) {
  
    const id = item.lesson?.givenId as string; 
    const numSemester = parseInt(id.split('.')[0].slice(1));
  
    if (numSemester !== lastNumSemester) {
      const newSemester : SemesterTable = {
        numSemester : numSemester,
        items : [item]
      }
  
      pdfSemester.semesters.push(newSemester)
      lastNumSemester = numSemester;
  
    }
    else {
  
      const numSelectedSemester = pdfSemester.semesters.findIndex((sem:SemesterTable) => sem.numSemester == numSemester)
      const semester = pdfSemester.semesters[numSelectedSemester]
  
      pdfSemester.semesters[numSelectedSemester] = {
        numSemester : semester.numSemester, 
        items: [...semester.items , item] 
      }
  
    }
          
  }
  downloadPDF(pdfSemester,teacher,service)
}


/**
 * Télécharge un Fichier PDF à partir des Informations de Semestres
 *
 * @param {PDFSemesters} pdfSemester - Les informations sur les semestres à inclure dans le PDF.
 *
 * @description
 * Cette fonction utilise la bibliothèque jsPDF pour générer un fichier PDF contenant les détails
 * sur les services universitaires, organisés par semestre. Le fichier PDF est ensuite téléchargé avec
 * un nom de fichier spécifique.
 */
export const downloadPDF = (
  pdfSemester : PDFSemesters,
  teacher : Teacher,
  service : Service
    
) => {
  const doc = new jsPDF({ unit: 'pt', format: 'a4' });
  
  const yearText = `Année Universitaire: ${pdfSemester.year}`;
  const serviceText = `Service prévisionnel de ${pdfSemester.teacher.firstName} ${pdfSemester.teacher.lastName}`;
  const headerBlockX = 50;
  const headerBlockY = 50;
  const headerBlockWidth = doc.internal.pageSize.getWidth() - headerBlockX * 2;
  const headerBlockHeight = 60;
  doc.rect(headerBlockX, headerBlockY + 3, headerBlockWidth, headerBlockHeight);
  
  const rightTextWidth = doc.getTextWidth(serviceText) -35;
  const rightTextX = headerBlockX + headerBlockWidth - rightTextWidth ;
  
  doc.text(serviceText, headerBlockX , headerBlockY + headerBlockHeight / 2 + 3);
  doc.text(yearText, rightTextX , headerBlockY + headerBlockHeight ); 
  
  
  const tableSemestres = [
    ['Enseignements', 'Types de Cours', 'Volume (en Heures)'],
  ];
  
  const totalSBlockX = 500;
  let blockY = 135
  const blockHeight = 40;
  
  for (const semester of pdfSemester.semesters) {
  
    if (blockY >= 760){
      blockY = 50
      doc.addPage()
              
    }
  
    const centerText = `Semestre ${semester.numSemester}`;
    const block1X = 50;
    const bloc1kWidth = doc.internal.pageSize.getWidth() - block1X * 2;
  
    doc.rect(block1X, blockY, bloc1kWidth, blockHeight);
    const textWidth = doc.getTextWidth(centerText);
    const centerX = block1X + (bloc1kWidth - textWidth) / 2;
    doc.text(centerText, centerX, blockY + blockHeight / 2 + 3);
      
    blockY = blockY+ 50; 
  
    const res = []
    for (const item of semester.items) {
      res.push([
                  item.lesson?.givenId as string + ' ' + item.lesson?.name,
                  item.lessonTypes.map((lessonType) => lessonType.lessonType.name + " "),
                  item.lessonTypes.map((lessonType) => lessonType.amountHours.toString() + " ")
      ])
          
    }
  
    const tablePosition = {
      startY: blockY, 
    };
    autoTable(doc,{
      head: [tableSemestres[0]], 
      body: res,
      ...tablePosition,   
      styles:{
        minCellHeight: 30
      }  
  
    });
    blockY = ((res.length +1) * 35 ) + blockY ;
          
    doc.text("Total:" + getSemesterHours(semester) , totalSBlockX, blockY);
    blockY = blockY+ 50;  
  
  }
  
  const totalText = `Total ${getServiceHours(service)}`;
  const blockTotalX = 450;
  blockY = blockY+ 50;
  const blocTotalWidth = 120;
  
  doc.rect(blockTotalX, blockY, blocTotalWidth, blockHeight);
  doc.text(totalText, totalSBlockX, blockY + blockHeight / 2 + 3);
  
  doc.save('Service_Prévisionnel_de_' +(teacher.lastName) + '_' + (teacher.firstName) + (service.year) + '-' +(service.year + 1) +'.pdf');
  
}



/**
 * Calcule le Total des Heures pour un Semestre donné
 *
 * @param {SemesterTable} semester - Le semestre pour lequel calculer le total des heures.
 * @returns {number} Le total des heures pour le semestre.
 *
 * @description
 * Cette fonction prend un objet SemestreTable en entrée et calcule le total des heures pour ce semestre,
 * en tenant compte des différents types de cours et de leurs heures respectives.
 */
export const getSemesterHours = (semester : SemesterTable) : number => {
  return semester.items?.reduce((acc, item) => acc + 
          item.lessonTypes.reduce((acc,type) => acc+type.amountHours 
            ,0)
  ,0) as number;
}
  
/**
 * Calcule le Total des Heures pour le Service Sélectionné
 *
 * @returns {number} Le total des heures pour le service sélectionné.
 *
 * @description
 * Cette fonction calcule le total des heures pour le service sélectionné, en tenant compte des
 * différents types de cours et de leurs heures respectives.
 */
export const getServiceHours = (service : Service) : number => {
  return service.items?.reduce((acc, item) => acc + 
        item.lessonTypes.reduce((acc,type) => acc+type.amountHours 
          ,0)
  ,0) as number;
}