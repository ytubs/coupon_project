import { useForm } from "react-hook-form";
import "./AddCustomer.css";
import store from "../../../Redux/Store";
import notify from "../../../services/Notification";
import globals from "../../../services/Globals";
import { customerAddedAction } from "../../../Redux/CustomerState";
import CustomerModel from "../../../Models/CustomerModel";
import jwtAxios from "../../../services/JwtAxios";
import { Form, FormGroup, Button } from "react-bootstrap";


function AddCustomer(): JSX.Element {
    const { register, handleSubmit, formState: { errors } } = useForm<CustomerModel>();

    async function send(customer: CustomerModel) {
        try {
            const myFormData = new FormData();
            myFormData.append("email", customer.email);
            myFormData.append("firstName", customer.firstName);
            myFormData.append("lastMame", customer.lastName);
            myFormData.append("password", customer.password);
            const response = await jwtAxios.post<CustomerModel>(globals.urls.addCustomer, customer);
            const addedCustomer = response.data;

            store.dispatch(customerAddedAction(addedCustomer));
            notify.success("customer has been added! name: " + addedCustomer.firstName);
        }
        catch (err) {
            notify.error(err);
        }
    }

    return (
        <div className="addCustomer Box">

            <h2>Add Customer</h2>

            <form className="flex" onSubmit={handleSubmit(send)}>

                <Form>
                    <Form.Group>
                        <Form.Label>First Name</Form.Label>

                        <Form.Control type="firstName" placeholder="first name"  {...register("firstName",
                            {
                                required:
                                    { value: true, message: "please enter name" }
                                , minLength: {
                                    value: 3, message: "name must be longer"
                                }
                            })} />
                        <span className="redError">{errors.firstName?.message}</span>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Last Name</Form.Label>

                        <Form.Control type="lastName" placeholder="last name"   {...register("lastName",
                            {
                                required:
                                    { value: true, message: "please enter last name" }
                                , minLength: {
                                    value: 3, message: "last name must be longer"
                                }
                            })} />
                        <span className="redError">{errors.lastName?.message}</span>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label> Email</Form.Label>

                        <Form.Control type="email" placeholder="email@example"  {...register("email",
                            {
                                required:
                                    { value: true, message: "please enter email" }
                                , minLength: {
                                    value: 3, message: "email must be longer"
                                }
                            })} />
                        <span className="redError">{errors.email?.message}</span>
                    </Form.Group>


                    <Form.Group>
                        <Form.Label> Password</Form.Label>
                        <Form.Control type="password" placeholder="password"   {...register("password",
                            {
                                required:
                                    { value: true, message: "please enter password" }
                                , minLength: {
                                    value: 3, message: "password must be longer"
                                }
                            })} />
                        <span className="redError">{errors.password?.message}</span>
                    </Form.Group>
                </Form>








                <div className="container">
                    <div className="row">
                        <div className="col text-center">
                            <Button className="btn btn-default" type="submit">Add</Button>
                        </div>
                    </div>
                </div>
            </form>

        </div>
    );
}

export default AddCustomer;
