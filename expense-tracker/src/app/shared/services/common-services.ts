import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CommonServices {
  private commonBaseURL = environment.appConstants.baseApiURL
  constructor(private http: HttpClient) {

  }
  getAllCategories() {
    return this.http.get(this.commonBaseURL + '/Category/GetAllCategories')
  }

  //income apis
  addIncome(payload: any) {
    return this.http.post(this.commonBaseURL + '/Income/AddIncome', payload)
  }
  getIncomes() {
    return this.http.get(this.commonBaseURL + '/Income/GetIncomes')
  }
  getIncomeKPIS() {
    return this.http.get(this.commonBaseURL + '/Income/GetIncomeKPIs/kpis')
  }
  deleteIncome(id: any) {
    return this.http.delete(this.commonBaseURL + '/Income/DeleteIncome/' + id)
  }
  getIncomesByCategory(categoryId: any) {
    return this.http.get(this.commonBaseURL + '/Income/GetIncomeByCategoryId/category/' + categoryId)
  }
  getIncomeByid(id: any) {
    return this.http.get(this.commonBaseURL + '/Income/GetIncomeById/' + id)
  }
  updateIncome(id: any, payload: any) {
    return this.http.put(this.commonBaseURL + '/Income/UpdateIncome/' + id, payload)
  }

  //expense apis
  addExpense(payload: any) {
    return this.http.post(this.commonBaseURL + '/Expense/AddExpense', payload)
  }
  getExpenses() {
    return this.http.get(this.commonBaseURL + '/Expense/GetExpense')
  }
  getExpenseKPIS() {
    return this.http.get(this.commonBaseURL + '/Expense/GetExpenseKPIS')
  }
  deleteExpense(id: any) {
    return this.http.delete(this.commonBaseURL + '/Expense/DeleteExpense/' + id)
  }
  getExpensesByCategory(categoryId: any) {
    return this.http.get(this.commonBaseURL + '/Expense/GetExpenseByCategoryId/category/' + categoryId)
  }
  getExpenseByid(id: any) {
    return this.http.get(this.commonBaseURL + '/Expense/GetExpenseById/' + id)
  }
  updateExpense(id: any, payload: any) {
    return this.http.put(this.commonBaseURL + '/Expense/UpdateExpense/' + id, payload)
  }
  downloadExpenseReport() {
    return this.http.get(this.commonBaseURL + '/Expense/ExportExpenseListReport/export', { responseType: 'blob' });
  }
  importExpenses(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(this.commonBaseURL + '/Expense/ImportExpenses', formData);
  }

  //dashboard apis
  getMonthlyIncome() {
    return this.http.get(this.commonBaseURL + '/Dashboard/GetMonthlyIncome')
  }
  getMonthlyExpense() {
    return this.http.get(this.commonBaseURL + '/Dashboard/GetExpenseByMonth')
  }
  getExpenseByCategory() {
    return this.http.get(this.commonBaseURL + '/Dashboard/GetExpenseByCategories')
  }

  //tax calculation apis
  calculateTax(fy: string, userId: number): any {
    return this.http.get(this.commonBaseURL + '/Tax/CalculateTax/calculate', {
      params: { fy, userId }
    })
  }

  //deduction apis
  addDeduction(payload: any) {    
    return this.http.post(this.commonBaseURL + '/Tax/AddDeduction', payload)
  }
  updateDeduction(id: any, payload: any) {
    return this.http.put(this.commonBaseURL + '/Tax/UpdateDeduction/' + id, payload)
  }
  getDeductions() {
    return this.http.get(this.commonBaseURL + '/Tax/GetDeductions')
  }
  getDeductionById(id: any) {
    return this.http.get(this.commonBaseURL + '/Tax/GetDeductionById/' + id)
  }
  deleteDeduction(id: any) {
    return this.http.delete(this.commonBaseURL + '/Tax/DeleteDeduction/' + id)
  }
  getDeductionKPIS(financialYear: any,userId:any) {
    return this.http.get(this.commonBaseURL + '/Tax/GetDeductionKpis/kpi',{params: {fy: financialYear, userId: userId}})
  } 
  getDeductionBySectionCode(sectionCode: any,financialYear: any,userId:any) {
    return this.http.get(this.commonBaseURL + '/Tax/GetDeductionBySectionCode/' + sectionCode, {params: {fy: financialYear, userId: userId}})
  }
}

