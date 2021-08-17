import "./GetAllCouponsByMaxPrice.css";
import { useState } from "react";
import CouponModel from "../../../Models/CouponModel";
import jwtAxios from "../../../services/JwtAxios";
import globals from "../../../services/Globals";
import { useForm } from "react-hook-form";
import notify from "../../../services/Notification";
import CouponCard from "../CouponCard/CouponCard";
import { Form, FormGroup, Button } from "react-bootstrap";

interface FormMaxPrice {
    maxPrice: number;
}

function GetAllCouponsByMaxPrice(): JSX.Element {
    const { register, handleSubmit, formState: { errors } } = useForm<FormMaxPrice>();
    const [couponsState, setCouponsState] = useState<CouponModel[]>(null);
    async function send(FormMaxPrice: FormMaxPrice) {
        try {
            const response = await jwtAxios.get<CouponModel[]>(globals.urls.GetAllCouponsByMaxPrice + FormMaxPrice.maxPrice);
            const getCoupon = response.data;
            setCouponsState(response.data);
            notify.success("success");

        }
        catch (err) {
            notify.error(err);
        }
    }

    return (
        <div className=" GetAllCouponsByMaxPrice ">
            <form onSubmit={handleSubmit(send)}>

                <h2>My Coupons By Max Price</h2>
                <Form >
                    <Form.Group>
                        <Form.Label >Max Price:</Form.Label>

                        <Form.Control type="number" placeholder="max price" className="padding10" {...register("maxPrice"
                            , {
                                required:
                                    { value: true, message: "please enter Start Date" }
                            })} />
                        <span className="redError">{errors.maxPrice?.message}</span>
                    </Form.Group>
                </Form>
                <div className="container">
                    <div className="row">
                        <div className="col text-center align-bottom">
                            <Button className="btn btn-default" type="submit">Get</Button>
                        </div>
                    </div>
                </div>

                {couponsState && couponsState.map((coupon, index) =>

                    <CouponCard key={index} coupon={coupon} />

                )}
            </form>

        </div>
    );
}


export default GetAllCouponsByMaxPrice;
