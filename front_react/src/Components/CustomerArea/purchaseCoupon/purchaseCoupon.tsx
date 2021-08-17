import { useForm } from "react-hook-form";
import jwtAxios from "../../../services/JwtAxios";
import globals from "../../../services/Globals";
import notify from "../../../services/Notification";
import CouponModel from "../../../Models/CouponModel";
import { Form, FormGroup, Button } from "react-bootstrap";


interface FormInt {
    id: number;
}

function PurchaseCoupon(): JSX.Element {
    const { register, handleSubmit, formState: { errors } } = useForm<FormInt>();
    async function update(formInt: FormInt) {

        try {
            const response = await jwtAxios.post<CouponModel>(globals.urls.purchaseCoupon + formInt.id, formInt);
            const PurchasedCoupon = response.data;
            notify.success("coupon has been purchased");
        }
        catch (err) {
            notify.error(err);
        }
    }

    return (
        <div className="PurchaseCoupon Box padding10">
            <h2>Purchase Coupon</h2>

            <form onSubmit={handleSubmit(update)}>

                <Form >
                    <Form.Group>
                        <Form.Label >Id:</Form.Label>

                        <Form.Control type="id" placeholder="id" {...register("id"
                            , {
                                required:
                                    { value: true, message: "please enter id" }
                            })} />
                        <span className="redError">{errors.id?.message}</span>

                    </Form.Group>
                </Form>
                <div className="container">
                    <div className="row">
                        <div className="col text-center align-bottom">
                            <Button className="btn btn-default" type="submit">Purchase</Button>
                        </div>
                    </div>
                </div>            </form>
        </div>
    );
}
export default PurchaseCoupon;
