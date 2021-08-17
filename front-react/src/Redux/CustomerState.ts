import CustomerModel from "../Models/CustomerModel";
import Customer from "../Models/CustomerModel";

export class CustomerState {
    public customers: CustomerModel[]=[]; // We're going to create initial object
}

// ----------------------------------------------------------------------------------

// Products Action Types - אלו פעולות ניתן לבצע על המידע ברמת האפליקציה:
export enum CustomerActionType {
    CustomersDownloaded = "CustomersDownloaded",
    CustomerAdded = "CustomerAdded",
   CustomerUpdated = "CustomerUpdated",
   CustomerDeleted = "CustomerDeleted"
}

// ----------------------------------------------------------------------------------

// Product Action - אובייקט המכיל את המידע עבור הפעולה שאנו מבצעים על המידע ברמת הפליקציה
export interface CustomerAction {
    type: CustomerActionType;
    payload?: any; // payload?: any; if the payload can be empty.
}

// ----------------------------------------------------------------------------------

// Products Action Creators - מתאים עבור כל פעולה Action ומחזירות אובייקט payload-פונקציות המקבלות את ה

export function customersDownloadedAction(customers: CustomerModel[]): CustomerAction {
    return { type: CustomerActionType.CustomersDownloaded, payload:customers };
}
export function customerAddedAction( customer: CustomerModel): CustomerAction {
    return { type: CustomerActionType.CustomerAdded, payload: customer };
}
export function customerUpdatedAction(customer: CustomerModel): CustomerAction {
    return { type: CustomerActionType.CustomerUpdated, payload: customer };
}
export function cusotmerDeletedAction(id: number): CustomerAction {
    return { type: CustomerActionType.CustomerDeleted, payload: id };
}

// ----------------------------------------------------------------------------------

// Products Reducer - פונקציה המבצעת את הפעולה בפועל
export function CusReducer(currentState: CustomerState = new CustomerState(), action: CustomerAction): CustomerState {

    const newState = { ...currentState }; // Spread Operator - שכפול אובייקט

    switch (action.type) {
        case CustomerActionType.CustomersDownloaded:
            newState.customers = action.payload; // Here payload is all products!
            break;
        case CustomerActionType.CustomerAdded:
            newState.customers.push(action.payload); // Here payload is the added product!
            break;
        case CustomerActionType.CustomerUpdated:
            // Do the correct action...
            break;
        case CustomerActionType.CustomerDeleted:
            // Do the correct action...
            break
    }

    return newState;
}
