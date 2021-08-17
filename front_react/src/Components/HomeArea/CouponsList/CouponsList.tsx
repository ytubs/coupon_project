import axios from "axios";
import { Component } from "react";
import CouponModel from "../../../Models/CouponModel";
import { couponsDownloadedAction } from "../../../Redux/CouponState";
import store from "../../../Redux/Store";
import globals from "../../../services/Globals";
import notify from "../../../services/Notification";
import CouponCard from "../../CompanyArea/CouponCard/CouponCard";
import "./CouponsList.css";

interface CouponsListState {
    coupons: CouponModel[];
}

class CouponsList extends Component<{}, CouponsListState> {

    public constructor(props: {}) {
        super(props);

        this.state = { coupons: store.getState().CouponState.coupons };
    }


    public async componentDidMount() {
        try {

            if (store.getState().CouponState.coupons.length === 0) {
                const response = await axios.get<CouponModel[]>(globals.urls.couponsList);

                store.dispatch(couponsDownloadedAction(response.data));

                this.setState({ coupons: response.data });
            }
        }
        catch (err) {
            notify.error("Error: " + err.message);
        }
    }

    public render(): JSX.Element {
        return (
            <div className="CouponList Scroller">


                <h2>Our Coupons</h2>



                {this.state.coupons && this.state.coupons.map((coupon, index) => {
                    return (
                        <CouponCard key={index} coupon={coupon} />
                    )
                }
                )}
            </div>
        );
    }
}

export default CouponsList;
