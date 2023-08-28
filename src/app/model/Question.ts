export interface Question {
   
    id : number
    enonce: string
    correctAnswer:string
    Options?: Option[];
    
    
    }
    export class Option {
        id!: number;
        option!: string;
        correctAnswer!: boolean;
        
      }

      export class Answer {
        id !: number
        answer!: string
        
      }
      
      export class Score {
        id !: number
        score!:number
       
      }