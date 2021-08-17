import { useForm } from "react-hook-form";
import globals from "../../../services/Globals";
import store from "../../../Redux/Store";
import notify from "../../../services/Notification";
import { companyDeletedAction } from "../../../Redux/CompanyState";
import CompanyModel from "../../../Models/CompanyModel";
import jwtAxios from "../../../services/JwtAxios";
import { Form, FormGroup, Button } from "react-bootstrap";

function DeleteCompany(): JSX.Element {
    const { register, handleSubmit, formState: { errors } } = useForm<CompanyModel>();
    async function send(company: CompanyModel) {
        try {
            const myFormData = new FormData();
            myFormData.append("id", company.id.toString());
            const response = await jwtAxios.delete<CompanyModel>(globals.urls.deleteCompany + company.id);
            const deletedCompany = response.data;

            store.dispatch(companyDeletedAction(deletedCompany.id));
            notify.success("company has been deleted!");
         
        }
        catch (err) {
            notify.error(err);
        }
    }

    return (
        <div className="Box DeleteCompany ">
            <form className="flex" onSubmit={handleSubmit(send)}>
                <h2>Delete Company</h2>

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

export default DeleteCompany;
