import CouponModel from "../../../Models/CouponModel";
import "./CouponCard.css";
import { NavLink } from "react-router-dom";
import globals from "../../../services/Globals";

interface CouponCardProps {
    coupon: CouponModel;
}
function CouponCard(props: CouponCardProps): JSX.Element {
    console.log(globals.urls.images + props.coupon.image)

    return (
        <div className="CouponCard Box">
            <div>
                Title: {props.coupon.title}<br />

                Amount: {props.coupon.amount} <br />
                Category: {props.coupon.category}<br />
                Description: {props.coupon.description}<br />
                StartDate: {props.coupon.startDate}<br />
                EndDate: {props.coupon.endDate}<br />
                price: {props.coupon.price}<br />
                <img className="Image" src={globals.urls.images + props.coupon.image} />




            </div>

        </div>
    );
}

export default CouponCard;
