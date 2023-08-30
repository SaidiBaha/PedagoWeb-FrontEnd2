import { ParagrapheScraped } from "./ParagrapheScraped";
import { Question } from "./Question";

export class SousCompetence {
   
    id !: number
    nom!: string

    Question?: Question[];
 
    ParagrapheScraped?:ParagrapheScraped[];
    
    }