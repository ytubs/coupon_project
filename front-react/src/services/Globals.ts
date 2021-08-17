class Globals {
}

// Global settings which are suitable only for development:
class DevelopmentGlobals extends Globals {
    public urls = {

        login: "http://localhost:8080/api/login/",
        addCompany: "http://localhost:8080/admin/add-company/",
        updateCompany: "http://localhost:8080/admin/update-company/",
        updateCustomer: "http://localhost:8080/admin/update-customer/",
        addCustomer: "http://localhost:8080/admin/add-customer/",
        deleteCompany: "http://localhost:8080/admin/delete-company?id=",
        deleteCustomer: "http://localhost:8080/admin/delete-customer?id=",
        getCompany: "http://localhost:8080/admin/get-company?id=",
        getCustomer: "http://localhost:8080/admin/get-customer?id=",
        getAllCompanies: "http://localhost:8080/admin/getall-companies",
        getAllCustomers: "http://localhost:8080/admin/getall-customers",
        addCoupon: "http://localhost:8080/comapny/add-coupon",
        deleteCoupon: "http://localhost:8080/comapny/delete-coupon?id=",
        updateCoupon: "http://localhost:8080/comapny/update",
        getCoupon: "http://localhost:8080/comapny/getone?id=",
        getAllCoupons: "http://localhost:8080/comapny/getall",
        getAllCouponsByCategory: "http://localhost:8080/comapny/getAll-Category?category=",
        getComapnyDetails: "http://localhost:8080/comapny/details",
        purchaseCoupon: "http://localhost:8080/customer/purchase/",
        getCustomerDetails: "http://localhost:8080/customer/detalis",
        getAllCustomerCoupons: "http://localhost:8080/customer/getall",
        GetAllCouponsByMaxPrice: "http://localhost:8080/comapny/getAll-maxPrice?maxPrice=",
        getAllCustomerCouponsByCategory: "http://localhost:8080/customer/getall-Category?category=",
        getAllCustomerCouponsByMaxPrice: "http://localhost:8080/customer/getall-maxPrice?maxPrice=",
        couponsList: "http://localhost:8080/admin/getAllCoupons",
        images: "http://localhost:8080/"







    };
}

// Global settings which are suitable only for production:
class ProductionGlobals extends Globals {
    public urls = {
        login: "http://localhost:8080/api/login",
        addCompany: "http://localhost:8080/admin/add-company/",
        updateCompany: "http://localhost:8080/admin/update-company/",
        updateCustomer: "http://localhost:8080/admin/update-customer/",
        addCustomer: "http://localhost:8080/admin/add-customer/",
        deleteCompany: "http://localhost:8080/admin/delete-company?id=",
        deleteCustomer: "http://localhost:8080/admin/delete-customer?id=",
        getCompany: "http://localhost:8080/admin/get-company?id=",
        getCustomer: "http://localhost:8080/admin/get-customer?id=",
        getAllCompanies: "http://localhost:8080/admin/getall-companies",
        getAllCustomers: "http://localhost:8080/admin/getall-customers",
        addCoupon: "http://localhost:8080/comapny/add-coupon",
        deleteCoupon: "http://localhost:8080/comapny/delete-coupon?id=",
        updateCoupon: "http://localhost:8080/comapny/update",
        getCoupon: "http://localhost:8080/comapny/getone?id=",
        getAllCoupons: "http://localhost:8080/comapny/getall",
        getAllCouponsByCategory: "http://localhost:8080/comapny/getAll-Category?category=",
        getComapnyDetails: "http://localhost:8080/comapny/details",
        purchaseCoupon: "http://localhost:8080/customer/purchase?id=",
        getCustomerDetails: "http://localhost:8080/customer/detalis",
        getAllCustomerCoupons: "http://localhost:8080/customer/getall",
        GetAllCouponsByMaxPrice: "http://localhost:8080/comapny/getAll-maxPrice?maxPrice=",
        getAllCustomerCouponsByCategory: "http://localhost:8080/customer/getall-Category?category=",
        getAllCustomerCouponsByMaxPrice: "http://localhost:8080/customer/getall-maxPrice?maxPrice=",
        couponsList: "http://localhost:8080/admin/getAllCoupons",
        images: "http://localhost:8080/"














    };
}

// Creating the correct object
const globals = process.env.NODE_ENV === "development" ? new DevelopmentGlobals() : new ProductionGlobals();

export default globals;