import { SousCompetence } from "./SousCompetence";

export class Competence {
   
    id !: number
    nom!: string
    Souscompetences?: SousCompetence[];
    
    }