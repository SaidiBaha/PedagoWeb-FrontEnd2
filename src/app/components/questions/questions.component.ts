import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Question, Option } from 'src/app/model/Question';
import { QuestionDTO } from 'src/app/model/QuestionDTO ';
import { QuestionService } from 'src/app/services/QuestionService';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit  {


  correctAnswersCount: number = 0;
  incorrectAnswersCount: number = 0;
  showResults: boolean = false;
  //--

  totalQuestions: number = 0;
  userScore: number = 0;

  isAnswering: boolean = false; // Pour désactiver le bouton "Valider" pendant le traitement
  canProceed: boolean = false; // Pour activer le bouton "Suivant" après 5 secondes

  questions!: any[];
  currentQuestionIndex: number = 0;
  questionsWithOptions: any[] = [];
  
  
 // @Input() sousCompetenceId! : number  ;
  sousCompetenceId: number=0;
 // questions: QuestionDTO[] = [];
 // currentQuestionIndex = 0;
  currentQuestion!: QuestionDTO;
  //currentQuestion2!:Question;
  userAnswer = '';

  constructor(
    private route: ActivatedRoute,
    private questionService: QuestionService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    
    this.route.queryParams.subscribe(params => {
      this.sousCompetenceId = params['sousCompetenceId'];
      this.loadQuestions();
      this.loadUserScore();
    });
  }

  loadQuestions(): void {
   
    console.log(this.sousCompetenceId);
    
    this.questionService.getQuestionsBySousCompetence(this.sousCompetenceId)
    .subscribe(questions => {
      this.questionsWithOptions = questions.map((question: any) => ({
        question,
        options: []
      }));
      this.totalQuestions = this.questionsWithOptions.length; // Définit le nombre total de questions
      this.loadOptionsForCurrentQuestion();
    });
  }


  loadOptionsForCurrentQuestion(): void {
    const questionId = this.questionsWithOptions[this.currentQuestionIndex].question.id;
    this.questionService.getOptionsByQuestion(questionId)
      .subscribe(options => {
        this.questionsWithOptions[this.currentQuestionIndex].options = options;
      });
  }


  navigateToQuestion(offset: number): void {
    const newIndex = this.currentQuestionIndex + offset;
    if (newIndex >= 0 && newIndex < this.questionsWithOptions.length) {
      this.currentQuestionIndex = newIndex;
      this.loadOptionsForCurrentQuestion();
    }
    
  }




//////////////////////////////////////////////////////////////////////////----
 /* previousQuestion(): void {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;     
      this.currentQuestion = this.questions[this.currentQuestionIndex];
    }
  }

  nextQuestion(): void {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      this.currentQuestion = this.questions[this.currentQuestionIndex];
    }
  }*/




    answerQuestion(): void {
      this.isAnswering = true; // Désactive le bouton "Valider" pendant le traitement
      const userId = 1; // Remplacez par l'ID de l'utilisateur connecté
     // const sousCompetenceId = 2; // Remplacez par l'ID de la sous-compétence souhaitée
     const questionId = this.questionsWithOptions[this.currentQuestionIndex].question.id;
     const correctAnswer  = this.questionsWithOptions[this.currentQuestionIndex].question.correctAnswer;
     console.log(correctAnswer);

     const userAnswer = this.userAnswer; 
     const isAnswerCorrect = userAnswer === correctAnswer;
     
     console.log(isAnswerCorrect);
      this.questionService.answerQuestion(userId, this.sousCompetenceId, questionId, this.userAnswer)
        .subscribe(
          
          message => {
           
            console.log(message);
            if (isAnswerCorrect) {
             
              this.toastr.success('Réponse correcte', 'Succès');
              this.correctAnswersCount++;
            } else {
              this.toastr.error('Réponse incorrecte', 'Échec');
              this.incorrectAnswersCount++; // Incrémente le compteur de réponses incorrectes
            }
            
          // Appel à la fonction pour passer à la question suivante après 5 secondes
         if (this.currentQuestionIndex < this.totalQuestions - 1) {
          this.nextQuestionWithDelay();
        } else {
          // Affiche les résultats lorsque c'est la dernière question
          this.showResults = true;
        }
        
        // Recharge le score après avoir répondu
        this.loadUserScore();
          },
          error => console.error(error)
        );
    }


    nextQuestionWithDelay(): void {
      setTimeout(() => {
        this.isAnswering = false; // Réactive le bouton "Valider"
        this.navigateToQuestion(1); // Appelle la fonction pour passer à la question suivante
        this.canProceed = true; // Active le bouton "Suivant" après 5 secondes
      }, 5000); // Attend 5 secondes avant de passer à la question suivante
    }

    loadUserScore(): void {
      const userId = 1; // Remplacez par l'ID de l'utilisateur connecté
      this.questionService.getUserScore(userId)
        .subscribe(score => {
          this.userScore = score;
        });
    }

 /*nextQuestion(): void {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      this.currentQuestion = this.questions[this.currentQuestionIndex];
      this.userAnswer = ''; // Réinitialiser la réponse de l'utilisateur
    }
  }*/















  //----------------------------------------------------2 éme méthode ---------------//

  /*
  ngOnInit() {
    this.loadQuestions();
  }

  loadQuestions() {
    this.questionService.getQuestions().subscribe(
      questions => {
        this.questions = questions;
      },
      error => {
        console.error('Error loading questions:', error);
      }
    );
  }

  onNextQuestion() {
    this.currentQuestionIndex = (this.currentQuestionIndex + 1) % this.questions.length;
  }

  onPreviousQuestion() {
    this.currentQuestionIndex = (this.currentQuestionIndex - 1 + this.questions.length) % this.questions.length;
  }*/




  //----------------------------------------------------1 ére méthode ---------------//
 /* ngOnInit(): void {
    this.loadQuestion(1);
  }


  loadQuestion(questionId: number): void {
    this.questionService.getQuestionById(questionId).subscribe(question => {
      this.currentQuestion = question;
      this.selectedOption = { id: 0, option: '', correctAnswer: false };
      this.answerMessage = '';
      console.log('Authentication successful:', response);

    });
  }

  answerQuestion(): void {
    this.questionService.answerQuestion(this.userId, this.currentQuestion.id, this.selectedOption.option)
      .subscribe(message => {
        this.answerMessage = message;
        this.loadUserScore();
      });
  }

  loadUserScore(): void {
    // Chargez le score de l'utilisateur depuis le service UserService
  }

*/


  
}
