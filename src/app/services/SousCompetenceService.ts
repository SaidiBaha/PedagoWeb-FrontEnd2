import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { Competence } from "../model/Competence";
import { SousCompetence } from "../model/SousCompetence";


@Injectable({
    providedIn: 'root'
  })

export class SousCompetenceService{

    baseUrl:string="http://localhost:8088/springMVC/sous-competences";

    constructor(private http: HttpClient) { }

    getAllSousCompetence(): Observable<SousCompetence[]> {
        return this.http.get<SousCompetence[]>(this.baseUrl);
      }
    
      getSousCompetenceById(id: number): Observable<SousCompetence> {
        return this.http.get<SousCompetence>(`${this.baseUrl}/${id}`);
      }
    
      createSousCompetence(Souscompetence: SousCompetence,id:number): Observable<SousCompetence> {
        return this.http.post<SousCompetence>(`${this.baseUrl}/${id}`, SousCompetence);
      }
    
      updateSousCompetence(id: number, Souscompetence: SousCompetence): Observable<SousCompetence> {
        return this.http.put<SousCompetence>(`${this.baseUrl}/${id}`, SousCompetence);
      }
    
      deletetSousCompetence(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
      }

      
      getSousCompetencesByCompetenceId(competenceId: number): Observable<Competence[]> {
        // Make the HTTP GET request
        return this.http.get<Competence[]>(`${this.baseUrl}/by-thematique/${competenceId}`);
      }




}