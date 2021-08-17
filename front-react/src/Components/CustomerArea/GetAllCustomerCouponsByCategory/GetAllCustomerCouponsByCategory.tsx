import CouponModel, { Category } from "../../../Models/CouponModel";
import { useForm } from "react-hook-form";
import { useState } from "react";
import jwtAxios from "../../../services/JwtAxios";
import globals from "../../../services/Globals";
import notify from "../../../services/Notification";
import CouponCard from "../../CompanyArea/CouponCard/CouponCard";
import { Form, FormGroup, Button } from "react-bootstrap";

interface FormCategory {
    category: Category;
}


function GetAllCustomerCouponsByCategory(): JSX.Element {
    const { register, handleSubmit, formState } = useForm<FormCategory>();
    const [couponsState, setCouponsState] = useState<CouponModel[]>([]);
    async function send(formCategory: FormCategory) {
        try {
            const response = await jwtAxios.get<CouponModel[]>(globals.urls.getAllCustomerCouponsByCategory + formCategory.category);
            const getCoupon = response.data;
            setCouponsState(response.data);
            notify.success("success");

        }
        catch (err) {
            notify.error(err);
        }
    }
    return (
        <div className="GetAllCustomerCouponsByCategory Box margin25    ">
            <h2>Get Coupons By Category</h2>
            <form onSubmit={handleSubmit(send)}>

                <label>please choose category: </label> <br />

                <Form >
                    <Form.Group>
                        <Form.Label > Category:</Form.Label>
                        <select {...register("category", { required: true })}>
                            <option>Food</option>
                            <option>Elecricity</option>
                            <option>restaurant</option>
                            <option>Vaction</option>

                        </select>
                    </Form.Group>
                </Form >
                <div className="container">
                    <div className="row">
                        <div className="col text-center align-bottom">
                            <Button className="btn btn-default" type="submit">Get</Button>
                        </div>
                    </div>
                </div>

                {couponsState && couponsState.map((coupon, index) => {
                    return (
                        <CouponCard key={index} coupon={coupon} />
                    )
                })}
            </form>

        </div>
    );
}

export default GetAllCustomerCouponsByCategory;
