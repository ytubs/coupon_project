import { useForm } from "react-hook-form";
import globals from "../../../services/Globals";
import store from "../../../Redux/Store";
import notify from "../../../services/Notification";
import { customerUpdatedAction } from "../../../Redux/CustomerState";
import CustomerModel from "../../../Models/CustomerModel";
import jwtAxios from "../../../services/JwtAxios";
import { Form, FormGroup, Button } from "react-bootstrap";


function UpdateCustomer(): JSX.Element {
    const { register, handleSubmit, formState: { errors } } = useForm<CustomerModel>();
    async function update(customer: CustomerModel) {

        try {
            const myFormData = new FormData();
            myFormData.append("id", customer.id.toString());
            myFormData.append("email", customer.email);
            myFormData.append("firstName", customer.firstName);
            myFormData.append("lastName", customer.lastName);
            myFormData.append("password", customer.password);
            const response = await jwtAxios.put<CustomerModel>(globals.urls.updateCustomer, customer);
            const updatedCustomer = response.data;
            store.dispatch(customerUpdatedAction(updatedCustomer));
            notify.success("customer has been updated! name: " + updatedCustomer.firstName);
        }
        catch (err) {
            notify.error(err);
        }
    }

    return (
        <div className="UpdateCustomer Box">
            <h2>Update Customer</h2>

            <form className="flex" onSubmit={handleSubmit(update)}>
                <Form>
                    <Form.Group>
                        <Form.Label>Id:</Form.Label>

                        <Form.Control type="id" placeholder="id"  {...register("id"
                            , {
                                required:
                                    { value: true, message: "please enter id" }
                            })} />
                        <span className="redError">{errors.id?.message}</span>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>First Name</Form.Label>

                        <Form.Control type="firstName" placeholder="first name"   {...register("firstName",
                            {
                                required:
                                    { value: true, message: "please enter first name" }
                                , minLength: {
                                    value: 3, message: "first  name must be longer"
                                }
                            })} />
                        <span className="redError">{errors.firstName?.message}</span>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Last Name</Form.Label>

                        <Form.Control type="lastName" placeholder="last name"  {...register("lastName",
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

                        <Form.Control type="email" placeholder="email@example" {...register("email",
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
                        <div className="col text-center align-bottom">
                            <Button className="btn btn-default" type="submit">Update</Button>

                        </div>
                    </div>
                </div>            </form>
            <br />


        </div>
    );
}

export default UpdateCustomer;










