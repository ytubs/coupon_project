import { useForm } from "react-hook-form";
import globals from "../../../services/Globals";
import notify from "../../../services/Notification";
import { useState } from "react";
import CustomerCard from "../CustomerCard/CustomerCard";
import CustomerModel from "../../../Models/CustomerModel";
import jwtAxios from "../../../services/JwtAxios";
import { Form, FormGroup, Button } from "react-bootstrap";

function GetCustomer(): JSX.Element {
    const { register, handleSubmit, formState: { errors } } = useForm<CustomerModel>();
    const [customerState, setCustomerstate] = useState<CustomerModel>(null);
    async function send(customer: CustomerModel) {
        try {
            const myFormData = new FormData();
            myFormData.append("id", customer.id.toString());
            const response = await jwtAxios.get<CustomerModel>(globals.urls.getCustomer + customer.id);
            const getCustomer = response.data;
            setCustomerstate(response.data);

            notify.success("success");

        }
        catch (err) {
            notify.error(err);
        }
    }

    return (
        <div className="GetCustomer LoginBox">
            <form className="flex" onSubmit={handleSubmit(send)}>
                <h2>Get Customer</h2>

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
                <div className="container">
                    <div className="row">
                        <div className="col text-center align-bottom">
                            <Button className="btn btn-default" type="submit">Get</Button>
                        </div>
                    </div>
                </div>
                <br />

                {customerState && <CustomerCard customer={customerState} />}
            </form>

        </div>
    );
}

export default GetCustomer;
