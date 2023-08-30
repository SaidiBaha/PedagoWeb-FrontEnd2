import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Competence } from 'src/app/model/Competence';
import { ParagrapheScraped } from 'src/app/model/ParagrapheScraped';
import { SousCompetence } from 'src/app/model/SousCompetence';
import { Thematique } from 'src/app/model/Thematique';
import { CompetenceService } from 'src/app/services/CompetenceService';
import { QuestionService } from 'src/app/services/QuestionService';
import { SousCompetenceService } from 'src/app/services/SousCompetenceService';
import { ThematiqueService } from 'src/app/services/ThematiqueService';

@Component({
  selector: 'app-list-thematique',
  templateUrl: './list-thematique.component.html',
  styleUrls: ['./list-thematique.component.css']
})
export class ListThematiqueComponent implements OnInit {

  listCours!:ParagrapheScraped;
  listThematique!:Thematique[]
  listCompetences!:Competence[]
  thematique: Thematique = new Thematique();
  showModal = false;

    idUser: number= 1;
  idthematique!: number;
  sousCompetenceId!:number ;


////

selectedThematique: Thematique | null = null;
selectedCompetence: Competence | null = null;

SouscompetencesForSelectedCompetence: SousCompetence[] = [];
competencesForSelectedThematique: Competence[] = [];


///


  constructor(private questionservice:QuestionService,private thematiqueservice:ThematiqueService,private competenceservice:CompetenceService,private Souscompetenceservice:SousCompetenceService,private  route:Router){}

  ngOnInit(): void {
    this.thematiqueservice.getAllThematique().subscribe(
      (res) => {
        this.listThematique = res;
      },
      (error) => {
        console.error('Error fetching thematiques:', error);
      }
    );

    this.competenceservice.getAllCompetence().subscribe(
      (res) => {
        this.listCompetences = res;
      },
      (error) => {
        console.error('Error fetching competences:', error);
      }
    );
  }

  createThematique(): void {
    this.thematiqueservice.createThematique(this.thematique,this.idUser)
      .subscribe(response => {
        console.log(response);      
        // Faire quelque chose avec la réponse
        // (rediriger vers une autre page, afficher un message de confirmation, etc.)
        this.thematiqueservice.getAllThematique().subscribe(
          res=>{
            console.log("res",res);
            this.listThematique=res
          }
        )
      });
    }
    closeModal() {
      this.showModal = false;
    }

    deleteUser(id : number){
    
      this.thematiqueservice.deletetThematique(id).subscribe((response)=> {
        this.thematiqueservice.getAllThematique().subscribe(
          res=>{
            console.log("res",res);
            
            this.listThematique=res
          }
        )
        
      })
    }
   

 getId(id: number) {
  this.idthematique = id;
  this.thematiqueservice.getThematiqueById(id).subscribe((data) => {
    this.thematique = data;
    // Fetch the competences for the selected thematique
    this.competenceservice.getCompetencesByThematiqueId(id).subscribe((competences) => {
      this.competencesForSelectedThematique = competences;

      

    })
  })
}




showCompetences(thematique: Thematique) {
  this.selectedThematique = thematique;
  this.competenceservice.getCompetencesByThematiqueId(thematique.id).subscribe(
    competences => {
      this.competencesForSelectedThematique = competences;
    },
    error => {
      console.error('Error fetching competences:', error);
    }
  );
}

showSousCompetences(competence: Competence) {
  this.selectedCompetence = competence;
  this.Souscompetenceservice.getSousCompetencesByCompetenceId(competence.id).subscribe(
    Souscompetences => {
      this.SouscompetencesForSelectedCompetence = Souscompetences;
    },
    error => {
      console.error('Error fetching Souscompetences:', error);
    }
  );
}


scrapedContent: string = '';
showCours(sousCompetenceId: number) {
  this.questionservice.scrapeAndSave(sousCompetenceId).subscribe(
    (response: any) => {
      this.scrapedContent = response.scrapedData; // Extraire la propriété contenu
    },
    (error) => {
      console.error('Erreur lors de l\'extraction et de l\'enregistrement des données :', error);
    }
  );
}


}
