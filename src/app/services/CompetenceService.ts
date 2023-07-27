import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { Competence } from "../model/Competence";


@Injectable({
    providedIn: 'root'
  })

export class CompetenceService{

    baseUrl:string="http://localhost:8088/springMVC/competences";

    constructor(private http: HttpClient) { }

    getAllCompetence(): Observable<Competence[]> {
        return this.http.get<Competence[]>(this.baseUrl);
      }
    
      getCompetenceById(id: number): Observable<Competence> {
        return this.http.get<Competence>(`${this.baseUrl}/${id}`);
      }
    
      createCompetence(competence: Competence,id:number): Observable<Competence> {
        return this.http.post<Competence>(`${this.baseUrl}/${id}`, Competence);
      }
    
      updateCompetence(id: number, Competence: Competence): Observable<Competence> {
        return this.http.put<Competence>(`${this.baseUrl}/${id}`, Competence);
      }
    
      deletetCompetence(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
      }

      
      getCompetencesByThematiqueId(thematiqueId: number): Observable<Competence[]> {
        // Make the HTTP GET request
        return this.http.get<Competence[]>(`${this.baseUrl}/by-thematique/${thematiqueId}`);
      }




}