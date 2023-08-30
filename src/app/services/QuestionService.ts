// question.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

import { QuestionDTO } from '../model/QuestionDTO ';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private baseUrl = 'http://localhost:8088/springMVC/sous-competences';
  private baseUrl2 ='http://localhost:8088/springMVC/api/v1/user';
  private baseUrl3 ='http://localhost:8088/springMVC/questions';
  private baseUrl4 ='http://localhost:8088/springMVC/options' ;


  constructor(private http: HttpClient) { }

 /* answerQuestion(userId: number, questionId: number, answer: string): Observable<string> {
    const url = `${this.baseUrl2}/${userId}/answer/${questionId}?answer=${answer}`;
    return this.http.post<string>(url, null);
  }*/

  answerQuestion(userId: number, sousCompetenceId: number, questionId: number, answer: string): Observable<string> {
    const url = `${this.baseUrl2}/${userId}/answer/${sousCompetenceId}/question/${questionId}?answer=${answer}`;
    return this.http.post<string>(url, {});
  }

  getUserScore(userId: number): Observable<number> {
    const url = `${this.baseUrl2}/getUserScore?userId=${userId}`;
    return this.http.get<number>(url);
  }
  
  getQuestionsWithOptionsBySousCompetenceId(sousCompetenceId: number): Observable<QuestionDTO[]> {
    const url = `${this.baseUrl3}/question/${sousCompetenceId}`;
    return this.http.get<QuestionDTO[]>(url);
  }

  //-------------------------------------------------------------------------//
  getQuestionsBySousCompetence(sousCompetenceId: number): Observable<any> {
    const url = `${this.baseUrl3}/bySousCompetence/${sousCompetenceId}`;
    return this.http.get(url);
  }

  getOptionsByQuestion(questionId: number): Observable<any> {
    const url = `${this.baseUrl4}/option/${questionId}`;
    return this.http.get(url);
  }
/////////////////////////-    web scraping       ------////////////////////////////


  scrapeAndSave(sousCompetenceId: number): Observable<string> {
    const url = `${this.baseUrl}/scrape-and-save/${sousCompetenceId}`;
    return this.http.get<string>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error);
    return throwError('Something went wrong; please try again later.');
  }


}
