/* tslint:disable */
/* eslint-disable */
export interface Tutorial {
  balancePreviousMonth?: number;
  createDate?: string;
  createdBy?: string;
  creditExpected?: number;
  description?: string;
  finalBalanceToday?: number;
  finalPostCurrentAccount?: number;
  id?: number;
  lastModified?: string;
  lastModifiedBy?: string;
  moneyOnCashier?: number;
  moneySpecies?: number;
  operationPreviousRegulation?: number;
  operationRegulationToday?: number;
  operationTreasuryAnterior?: number;
  operationTreasuryToday?: number;
  organismCode?: string;
  otherValues?: number;
  postCurrentAccount?: number;
  published?: boolean;
  rateExpected?: number;
  recipeToday?: number;
  statesRepartition?: number;
  title?: string;
  totalCash?: number;
  totalExpenses?: number;
  totalOperationRegulation?: number;
  totalOperationTreasury?: number;
  totalRecipeToday?: number;
  providedMoneyOnCashier?: number;
  surplus?: number;
  deficit?: number;
}
