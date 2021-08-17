import { useForm } from "react-hook-form";
import CouponModel from "../../../Models/CouponModel";
import { useState } from "react";
import globals from "../../../services/Globals";
import jwtAxios from "../../../services/JwtAxios";
import notify from "../../../services/Notification";
import CouponCard from "../CouponCard/CouponCard";
import { Form, FormGroup, Button } from "react-bootstrap";

function GetCoupon(): JSX.Element {
    const { register, handleSubmit, formState: { errors } } = useForm<CouponModel>();
    const [couponState, setCouponState] = useState<CouponModel>(null);
    async function send(coupon: CouponModel) {
        try {
            const myFormData = new FormData();
            myFormData.append("id", coupon.id.toString());
            const response = await jwtAxios.get<CouponModel>(globals.urls.getCoupon + coupon.id);
            const getCoupon = response.data;
            setCouponState(response.data);
            notify.success("success");

        }
        catch (err) {
            notify.error(err);
        }
    }

    return (
        <div className="GetCoupon Scroller padding10 " >
            <form  onSubmit={handleSubmit(send)}>

                <h2>Get One Coupon</h2>

                <Form >
                    <Form.Group>

                        <Form.Label>Id:</Form.Label>

                        <Form.Control type="id" placeholder="id"  {...register("id"
                            , {
                                required:
                                    { value: true, message: "please enter id" }
                            })} />
                        <span className="redError">{errors.id?.message}</span>
                    </Form.Group>

                </Form>
                <div className="container padding10">
                    <div className="row">
                        <div className="col text-center align-bottom">
                            <Button className="btn btn-default" type="submit">Get</Button>
                        </div>
                    </div>
                </div>
                {couponState && <CouponCard coupon={couponState} />}
            </form>

        </div>
    );
}


export default GetCoupon;
