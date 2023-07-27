import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, forkJoin, map, mergeMap } from "rxjs";
import { Thematique } from "../model/Thematique";
import { Competence } from "../model/Competence";
import { CompetenceService } from "./CompetenceService";


@Injectable({
    providedIn: 'root'
  })

export class ThematiqueService{

    baseUrl:string="http://localhost:8088/springMVC/thematiques";

    constructor(private http: HttpClient, private competenceService: CompetenceService) { }

    getAllThematique(): Observable<Thematique[]> {
        return this.http.get<Thematique[]>(this.baseUrl);
      }
    
      getThematiqueById(id: number): Observable<Thematique> {
        return this.http.get<Thematique>(`${this.baseUrl}/${id}`);
      }
    
      createThematique(thematique: Thematique,id:number): Observable<Thematique> {
        return this.http.post<Thematique>(`${this.baseUrl}/${id}`, thematique);
      }
    
      updateThematique(id: number, thematique: Thematique): Observable<Thematique> {
        return this.http.put<Thematique>(`${this.baseUrl}/${id}`, thematique);
      }
    
      deletetThematique(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
      }


      
  


}