import CompanyModel from "../Models/CompanyModel";

export class CompanyState {
    public companies: CompanyModel[] = []; 
}



export enum CompnayActionType {
    CompaniesDownloaded = "CompaniesDownloaded",
    CompanyAdded = "CompanyAdded",
    CompanyUpdated = "CompanyUpdated",
    CompanyDeleted = "CompanyDeleted"
}



export interface CompanyAction {
    type: CompnayActionType;
    payload?: any; 
}



export function companiesDownloadedAction(companies: CompanyModel[]): CompanyAction {
    return { type: CompnayActionType.CompaniesDownloaded, payload:companies };
}
export function companyAddedAction(company: CompanyModel): CompanyAction {
    return { type: CompnayActionType.CompanyAdded, payload: company };
}
export function companyUpdatedAction(company: CompanyModel): CompanyAction {
    return { type: CompnayActionType.CompanyUpdated, payload: company };
}
export function companyDeletedAction(id: number): CompanyAction {
    return { type: CompnayActionType.CompanyDeleted, payload: id };
}



export function ComRecuder(currentState: CompanyState = new CompanyState(), action: CompanyAction): CompanyState {

    const newState = { ...currentState }; 

    switch (action.type) {
        case CompnayActionType.CompaniesDownloaded:
            newState.companies = action.payload; 
            break;
        case CompnayActionType.CompanyAdded:
            newState.companies.push(action.payload); 
            break;
        case CompnayActionType.CompanyUpdated:
            newState.companies.push(action.payload);        break;
        case CompnayActionType.CompanyDeleted:
            
        break;
    }

    return newState;
}
