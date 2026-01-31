import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Tutorial} from "../models/tutorial";
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TutorialService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient, private router: Router) {}

  getAll(params: any): Observable<any> {
    return this.http.get<any>(this.baseUrl, { params });
  }

    getAllByOrganismCode(organismCode: string, params: any): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/organisms/${organismCode}/tutorials`, { params });
    }

  get(id: any): Observable<Tutorial> {
    return this.http.get<Tutorial>(`${this.baseUrl}/tutorials/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }

  createTutorial(organismId: string, tutorial: Tutorial): Observable<Tutorial> {
    return this.http.post<Tutorial>(`${this.baseUrl}/organisms/${organismId}/tutorials`, tutorial);
  }

  createTutorialByOrganismCode(organismCode: string, tutorial: Tutorial): Observable<Tutorial> {
    return this.http.post<Tutorial>(`${this.baseUrl}/organisms/${organismCode}/tutorials`, tutorial);
  }

  navigateToCreateTutorial(organismId: string): void {
    this.router.navigate(['/create-tutorial', organismId]);
  }
  update(id: any, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/tutorials/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/tutorials/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(this.baseUrl);
  }

  findByTitle(title: any): Observable<Tutorial[]> {
    return this.http.get<Tutorial[]>(`${this.baseUrl}?title=${title}`);
  }

  getTotalRecipe(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/tutorials/totalRecipe`);
  }

  getTotalRecipeByDate(titleDate: string): Observable<number> {
    const params = new HttpParams().set('titleDate', titleDate);
    return this.http.get<number>(`${this.baseUrl}/tutorials/totalRecipeWithOrWithoutDate`, { params });
  }

  getTotalTreasuryOperations(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/tutorials/totalTreasuryOperations`);
  };

  getTotalRegulationOperations(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/tutorials/totalRegulationOperation`);
  };

  getTotalExpenses(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/tutorials/totalExpenses`);
  };

  getCurrentBalanceToday(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/tutorials/totalCurrentBalanceToday`);
  }

  getFinalPostalCurrentAccount(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/tutorials/finalPostalCurrentAccount`);
  }

  getTotalCash(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/tutorials/totalCash`);
  }

  getCurrencyCashOnCashier(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/tutorials/currencyCashOnCashier`);
  }

  getFinalBalanceLastMonth(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/tutorials/finalBalanceLastMonth`);
  }

  getTotalTreasuryOperationsLastRow(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/tutorials/treasuryOperationsLastRow`);
  }
  getTotalRegulationOperationsLastRow(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/tutorials/regulationOperationsLastRow`);
  }

  getPostalCurrentAccountLastRow(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/tutorials/postalCurrentAccountLastRow`);
  }

  getStatesRepartitionLastRowLastRow(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/tutorials/statesRepartitionLastRow`);
  }

  getStatesRepartitionLastRowLastRowByOrganismCode(organismCode: string): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/tutorials/statesRepartitionLastRow`);

  }

  getCreditExpectedLastRowLastRow(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/tutorials/creditExpectedLastRow`);
  }

  getExpectedFlowLastRow(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/tutorials/expectedFlowLastRow`);
  }
}
