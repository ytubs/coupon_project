import { useEffect, useState } from "react";
import CouponModel from "../../../Models/CouponModel";
import jwtAxios from "../../../services/JwtAxios";
import globals from "../../../services/Globals";
import notify from "../../../services/Notification";
import CouponCard from "../../CompanyArea/CouponCard/CouponCard";


function GetAllCustomerCoupons(): JSX.Element {
    const [couponsState, setCouponsState] = useState<CouponModel[]>(null);
    useEffect(() => {

        async function send() {
            try {
                const response = await jwtAxios.get<CouponModel[]>(globals.urls.getAllCustomerCoupons);
                const getCompany = response.data;
                setCouponsState(response.data);
                notify.success("success");
            }
            catch (err) {
                notify.error(err);
            }
        }
        send();
    }, []);



    return (
        <div className="GetAllCustomerCoupons Scroller">
            {couponsState && couponsState.map((coupon, index) => {
                return (
                    <CouponCard key={index} coupon={coupon} />
                )
            }
            )}
        </div>
    );
}


export default GetAllCustomerCoupons;
