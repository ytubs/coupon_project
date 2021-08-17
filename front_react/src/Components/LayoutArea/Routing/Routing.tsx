import { Redirect, Route, Switch } from "react-router";
import AddCompany from "../../AdminArea/AddCompany/AddCompany";
import AddCustomer from "../../AdminArea/AddCustomer/AddCustomer";
import DeleteCompany from "../../AdminArea/DeleteCompany/DeleteCompany";
import DeleteCustomer from "../../AdminArea/DeleteCustomer/DeleteCustomer";
import GetAllCompanies from "../../AdminArea/GetAllCompanies/GetAllCompanies";
import GetAllCustomers from "../../AdminArea/GetAllCustomers/GetAllCustomers";

import GetCompany from "../../AdminArea/GetCompany/GetCompany";
import GetCustomer from "../../AdminArea/GetCustomer/GetCustomer";
import UpdateCompany from "../../AdminArea/UpdateCompany/UpdateCompany";
import UpdateCustomer from "../../AdminArea/UpdateCustomer/UpdateCustomer";

import Login from "../../AuthArea/Login/Login";
import AddCoupon from "../../CompanyArea/AddCoupon/AddCoupon";
import DeleteCoupon from "../../CompanyArea/DeleteCoupon/DeleteCoupon";
import GetAllCoupons from "../../CompanyArea/GetAllCoupons/GetAllCoupons";
import GetAllCouponsByMaxPrice from "../../CompanyArea/GetAllCouponsByMaxPrice/GetAllCouponsByMaxPrice";
import GetCompanyDetails from "../../CompanyArea/GetCompanyDetails/GetCompanyDetails";

import GetCoupon from "../../CompanyArea/GetCoupon/GetCoupon";
import GetCouponsByCategory from "../../CompanyArea/getCouponsByCategory/getCouponsByCategory";
import UpdateCoupon from "../../CompanyArea/UpdateCoupon/UpdateCoupon";
import GetAllCustomerCoupons from "../../CustomerArea/getAllCustomerCoupons/getAllCustomerCoupons";
import GetAllCustomerCouponsByCategory from "../../CustomerArea/GetAllCustomerCouponsByCategory/GetAllCustomerCouponsByCategory";
import GetAllCustomerCouponsByMaxPrice from "../../CustomerArea/GetAllCustomerCouponsByMaxPrice/GetAllCustomerCouponsByMaxPrice";
import GetCustomerDetails from "../../CustomerArea/getCustomerDetails/getCustomerDetails";
import PurchaseCoupon from "../../CustomerArea/purchaseCoupon/purchaseCoupon";
import AdminLP from "../../HomeArea/AdminLP/AdminLP";
import CompanyLP from "../../HomeArea/CompanyLP/CompanyLP";
import ContactUs from "../../HomeArea/ContactUs/ContactUs";
import CouponsList from "../../HomeArea/CouponsList/CouponsList";
import CustomerLp1 from "../../HomeArea/CustomerLp1/CustomerLp1";
import Page404 from "../../SharedArea/Page404/Page404";

function Routing(): JSX.Element {
    return (
        <div className="Routing">
                <Switch>


                    <Route path="/getCompany" component={GetCompany} exact />
                    <Route path="/getCustomer" component={GetCustomer} exact />
                    <Route path="/getAllCompanies" component={GetAllCompanies} exact />
                    <Route path="/getAllCustomers" component={GetAllCustomers} exact />
                    <Route path="/addCompany" component={AddCompany} exact />
                    <Route path="/addCustomer" component={AddCustomer} exact />
                    <Route path="/updateCustomer" component={UpdateCustomer} exact />
                    <Route path="/updateCompany" component={UpdateCompany} exact />
                    <Route path="/deleteCompany" component={DeleteCompany} exact />
                    <Route path="/deleteCustomer" component={DeleteCustomer} exact />
                    <Route path="/deleteCoupon" component={DeleteCoupon} exact />
                    <Route path="/updateCoupon" component={UpdateCoupon} exact />
                    <Route path="/getCoupon" component={GetCoupon} exact />
                    <Route path="/getAllCoupons" component={GetAllCoupons} exact />
                    <Route path="/getCompanyDetails" component={GetCompanyDetails} exact />
                    <Route path="/getCustomerDetails" component={GetCustomerDetails} exact />
                    <Route path="/purchaseCoupon" component={PurchaseCoupon} exact />
                    <Route path="/getAllCustomerCoupons" component={GetAllCustomerCoupons} exact />
                    <Route path="/getAllCouponsByCategory" component={GetCouponsByCategory} exact />
                    <Route path="/getAllCouponsByMaxPrice" component={GetAllCouponsByMaxPrice} exact />
                    <Route path="/getAllCustomerCouponsByCategory" component={GetAllCustomerCouponsByCategory} exact />
                    <Route path="/getAllCustomerCouponsByMaxPrice" component={GetAllCustomerCouponsByMaxPrice} exact />
                    <Route path="/adminLP" component={AdminLP} exact />
                    <Route path="/customerLP" component={CustomerLp1} exact />
                    <Route path="/companyLP" component={CompanyLP} exact />
                    <Route path="/home" component={CouponsList} exact />

                    <Route path="/addCoupon" component={AddCoupon} exact />

                    <Route path="/login" component={Login} exact />
                    <Route path="/contact-us" component={ContactUs} exact />

                    <Redirect from="/" to="/home" exact />
                    <Route component={Page404} /> {/* Must be Last! */}
                </Switch>
          
        </div>
    );
}

export default Routing;
