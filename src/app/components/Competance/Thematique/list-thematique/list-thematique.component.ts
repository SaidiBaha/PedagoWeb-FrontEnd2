import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Competence } from 'src/app/model/Competence';
import { Thematique } from 'src/app/model/Thematique';
import { CompetenceService } from 'src/app/services/CompetenceService';
import { ThematiqueService } from 'src/app/services/ThematiqueService';

@Component({
  selector: 'app-list-thematique',
  templateUrl: './list-thematique.component.html',
  styleUrls: ['./list-thematique.component.css']
})
export class ListThematiqueComponent implements OnInit {

  listThematique!:Thematique[]
  listCompetences!:Competence[]
  thematique: Thematique = new Thematique();
  showModal = false;
 // @Input() idUser! : number  ;
    idUser: number= 1;
  idthematique!: number;


////

selectedThematique: Thematique | null = null;
competencesForSelectedThematique: Competence[] = [];


///


  constructor(private thematiqueservice:ThematiqueService,private competenceservice:CompetenceService,private  route:Router){}

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

 //   getId(id : number){
 //     this.idthematique = id;
 //     this.thematiqueservice.getThematiqueById(id).subscribe((data)=>{
 //       this.thematique = data      
 //     })
 //   }

 getId(id: number) {
  this.idthematique = id;
  this.thematiqueservice.getThematiqueById(id).subscribe((data) => {
    this.thematique = data;
    // Fetch the competences for the selected thematique
    this.competenceservice.getCompetencesByThematiqueId(id).subscribe((competences) => {
      this.competencesForSelectedThematique = competences;
    });
  });
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





  

}
