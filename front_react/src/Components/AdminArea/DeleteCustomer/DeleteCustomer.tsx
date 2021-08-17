import { useForm } from "react-hook-form";
import globals from "../../../services/Globals";
import store from "../../../Redux/Store";
import notify from "../../../services/Notification";
import { cusotmerDeletedAction } from "../../../Redux/CustomerState";
import CustomerModel from "../../../Models/CustomerModel";
import jwtAxios from "../../../services/JwtAxios";
import { Form, FormGroup, Button } from "react-bootstrap";

function DeleteCustomer(): JSX.Element {
    const { register, handleSubmit, formState: { errors } } = useForm<CustomerModel>();

    async function send(customer: CustomerModel) {
        try {
            const myFormData = new FormData();
            myFormData.append("id", customer.id.toString());
            const response = await jwtAxios.delete<CustomerModel>(globals.urls.deleteCustomer + customer.id);
            const deletedCustomer = response.data;

            store.dispatch(cusotmerDeletedAction(deletedCustomer.id));
            notify.success("customer has been deleted! ");
        }
        catch (err) {
            notify.error(err);
        }
    }


    return (
        <div className="DeleteCustomer Box">
            <form onSubmit={handleSubmit(send)}>

                <h2>Delete Customer</h2>
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
                            <Button className="btn btn-default" type="submit">Delete</Button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default DeleteCustomer;
