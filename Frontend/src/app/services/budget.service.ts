import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  AUTH_SERVER_ADDRESS:  string  =  'http://localhost:4000';

  constructor(private  httpClient:  HttpClient) { }

  private getOptions(token: string){

    let bearerAccess = 'Bearer ' + token;

    let options = {
      headers: {
        'Authorization' : bearerAccess,
        // 'Content-Type' : 'application/x-www-form-urlencoded',
      }
      //, withCredentials: true
    };

    return options;
  }

  getBudgets(token: string) {
    let myOptions = this.getOptions(token);
    return this.httpClient.get(`${this.AUTH_SERVER_ADDRESS}/api/budgets`, myOptions);
  }
  
  getBudgetsByUser(token: string, userId:number) {
    let myOptions = this.getOptions(token);
    return this.httpClient.get(`${this.AUTH_SERVER_ADDRESS}/api/budgets/user/${userId}`, myOptions);
  }
  deleteBudget(budgetId: number, token: string) {
    let myOptions = this.getOptions(token);
    return this.httpClient.delete(`${this.AUTH_SERVER_ADDRESS}/api/budgets/${budgetId}`, myOptions);
  }
  
  editBudget(budgetId: number, budget: any, token: string): Observable<any> {
    let myOptions = this.getOptions(token);
    return this.httpClient.put(`${this.AUTH_SERVER_ADDRESS}/api/budgets/${budgetId}`, budget, myOptions);

  };
    // Método para añadir un nuevo presupuesto
    addBudget(budget: any, token: string): Observable<any> {
      let myOptions = this.getOptions(token);
      return this.httpClient.post(`${this.AUTH_SERVER_ADDRESS}/api/budgets`, budget, myOptions);
    }
}