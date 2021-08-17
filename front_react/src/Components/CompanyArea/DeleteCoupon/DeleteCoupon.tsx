import { useForm } from "react-hook-form";
import CouponModel from "../../../Models/CouponModel";
import store from "../../../Redux/Store";
import jwtAxios from "../../../services/JwtAxios";
import notify from "../../../services/Notification";
import { Form, FormGroup, Button } from "react-bootstrap";

import globals from "../../../services/Globals";
import { couponDeletedAction, couponUpdatedAction } from "../../../Redux/CouponState";

function DeleteCoupon(): JSX.Element {
    const { register, handleSubmit, formState: { errors } } = useForm<CouponModel>();
    async function send(coupon: CouponModel) {
        try {
            const myFormData = new FormData();
            myFormData.append("id", coupon.id.toString());
            const response = await jwtAxios.delete<CouponModel>(globals.urls.deleteCoupon + coupon.id);
            const deletedCoupon = response.data;
            const deleteId=deletedCoupon.id
            store.dispatch(couponDeletedAction(coupon.id));
            notify.success("coupon has been deleted! ");
        
        }
        catch (err) {
            notify.error(err);
        }
    }

    return (
        <div className="DeleteCoupon Box">
            <form className="flex" onSubmit={handleSubmit(send)}>

                <h2>Delete Coupon</h2>
                <Form >
                    <Form.Group>
                        <Form.Label >Id:</Form.Label>

                        <Form.Control type="id" placeholder="id"   {...register("id"
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
                            <Button className="btn btn-default" type="submit">Delete</Button>
                        </div>
                    </div>
                </div>

            </form>


        </div>
    );
}

export default DeleteCoupon;
