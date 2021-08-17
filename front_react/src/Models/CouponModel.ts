import CompanyModel from "./CompanyModel";

class CouponModel{
    public id: number;
    public category:Category;
    public title:string;
    public description:string;
    public startDate:Date;
    public endDate:Date;
    public amount:number;
    public price:number;
    public image:FileList;
}
export enum Category {
    Food = "Food",
    Elecricity = "Elecricity",
    restaurant = "restaurant",
    Vaction = "Vaction"
}

export default CouponModel;