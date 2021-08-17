import { useForm } from "react-hook-form";
import store from "../../../Redux/Store";
import notify from "../../../services/Notification";
import globals from "../../../services/Globals";
import { companyUpdatedAction } from "../../../Redux/CompanyState";
import CompanyModel from "../../../Models/CompanyModel";
import jwtAxios from "../../../services/JwtAxios";
import { Form, FormGroup, Button } from "react-bootstrap";


function UpdateCompany(): JSX.Element {
    const { register, handleSubmit, formState: { errors } } = useForm<CompanyModel>();

    async function send(company: CompanyModel) {
        try {
            const myFormData = new FormData();
            myFormData.append("id", company.id.toString());
            myFormData.append("name", company.name);
            myFormData.append("email", company.email);
            myFormData.append("password", company.password);
            const response = await jwtAxios.put<CompanyModel>(globals.urls.updateCompany, company);
            const updatedCompany = response.data;
            store.dispatch((companyUpdatedAction(updatedCompany)));
            notify.success("company has been updated! name: " + updatedCompany.name);
        }
        catch (err) {
            notify.error(err);
        }
    }



    return (
        <div className=" Box UpdateCompany">
            <h2>Update Company</h2>
            <form className="flex" onSubmit={handleSubmit(send)}>


                <Form>
                    <Form.Group>
                        <Form.Label> Id</Form.Label>

                        <Form.Control type="id" placeholder="id"  {...register("id"
                            , {
                                required:
                                    { value: true, message: "please enter id" }
                            })} />
                        <span className="redError">{errors.id?.message}</span>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label> Name</Form.Label>

                        <Form.Control type="name" placeholder="name"  {...register("name",
                            {
                                required:
                                    { value: true, message: "please enter name" }
                                , minLength: {
                                    value: 3, message: "name must be longer"
                                }
                            })} />
                        <span className="redError">{errors.name?.message}</span>
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
                        <div className="col text-center align-bottom">
                            <Button className="btn btn-default" type="submit">Update</Button>
                        </div>
                    </div>
                </div>

            </form>

        </div>
    );
}

export default UpdateCompany;
