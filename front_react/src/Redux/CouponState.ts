import Coupon from "../Models/CouponModel";

export class CouponState {
    public coupons: Coupon[] = []; // We're going to create initial object
}

// ----------------------------------------------------------------------------------

// Products Action Types - אלו פעולות ניתן לבצע על המידע ברמת האפליקציה:
export enum CouponActionType {
    CouponsDownloaded = "CouponsDownloaded",
    CouponAdded = "CouponAdded",
    CouponUpdated = "CouponUpdated",
    CouponDeleted = "CouponDeleted"
}

// ----------------------------------------------------------------------------------

// Product Action - אובייקט המכיל את המידע עבור הפעולה שאנו מבצעים על המידע ברמת הפליקציה
export interface CouponAction {
    type: CouponActionType;
    payload?: any; // payload?: any; if the payload can be empty.
}

// ----------------------------------------------------------------------------------

// Products Action Creators - מתאים עבור כל פעולה Action ומחזירות אובייקט payload-פונקציות המקבלות את ה

export function couponsDownloadedAction(coupons: Coupon[]): CouponAction {
    return { type: CouponActionType.CouponsDownloaded, payload: coupons };
}
export function couponAddedAction(coupon: Coupon): CouponAction {
    return { type: CouponActionType.CouponAdded, payload: coupon };
}
export function couponUpdatedAction(coupon: Coupon): CouponAction {
    return { type: CouponActionType.CouponUpdated, payload: coupon };
}
export function couponDeletedAction(id: number): CouponAction {
    return { type: CouponActionType.CouponDeleted, payload: id };
}

// ----------------------------------------------------------------------------------

// Products Reducer - פונקציה המבצעת את הפעולה בפועל
export function CouReducer(currentState: CouponState = new CouponState(), action: CouponAction): CouponState {

    const newState = { ...currentState }; // Spread Operator - שכפול אובייקט

    switch (action.type) {
        case CouponActionType.CouponsDownloaded:
            newState.coupons = action.payload; // Here payload is all products!
            break;
        case CouponActionType.CouponAdded:
            newState.coupons.push(action.payload); // Here payload is the added product!
            break;
        case CouponActionType.CouponUpdated:
            newState.coupons.map(val => {
                if (val.id !== action.payload.id) {
                    return val;
                }
                return {
                    ...val,
                    ...action.payload
                }
            })
            break;
        case CouponActionType.CouponDeleted:
            let coupons = newState.coupons.slice();
            const idxDel = newState.coupons.findIndex(c => c.id === action.payload.id);
            coupons.splice(idxDel,1);
            newState.coupons = coupons;
            break;
            
    }

    return newState;
}