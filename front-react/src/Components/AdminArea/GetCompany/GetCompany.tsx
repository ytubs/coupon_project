import { useForm } from "react-hook-form";
import globals from "../../../services/Globals";
import notify from "../../../services/Notification";
import { useState } from "react";
import CompanyCard from "../CompanyCard/CompanyCard";
import CompanyModel from "../../../Models/CompanyModel";
import jwtAxios from "../../../services/JwtAxios";
import { Form, FormGroup, Button } from "react-bootstrap";

function GetCompany(): JSX.Element {
    const { register, handleSubmit, formState: { errors } } = useForm<CompanyModel>();
    const [companyState, setCompanystate] = useState<CompanyModel>(null);
    async function send(company: CompanyModel) {
        try {
            const myFormData = new FormData();
            myFormData.append("id", company.id.toString());
            const response = await jwtAxios.get<CompanyModel>(globals.urls.getCompany + company.id);
            const getCompany = response.data;
            setCompanystate(response.data);

            notify.success("success");


        }
        catch (err) {
            notify.error(err);
        }
    }



    return (
        <div className="GetCompany LoginBox">
            <form onSubmit={handleSubmit(send)}>

                <h2>Get Company</h2>
                <  Form onSubmit={handleSubmit(send)}>
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
                            <Button className="btn btn-default" type="submit">Get</Button>
                        </div>
                    </div>
                </div>
                <br />
                {companyState && <CompanyCard company={companyState} />}
            </form>

        </div>
    );
}

export default GetCompany;
