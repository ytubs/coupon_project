import "./Login.css";
import * as reactRouterDom from "react-router-dom";
import CredentialsModel from "../../../Models/CredentialsModel";
import { useForm } from "react-hook-form";
import axios from "axios";
import { loginAction } from "../../../Redux/AuthState";
import UserModel from "../../../Models/UserModel";
import store from "../../../Redux/Store";
import notify from "../../../services/Notification";
import globals from "../../../services/Globals";
import { Form, FormGroup, Button } from "react-bootstrap";

function Login(): JSX.Element {
    const history = reactRouterDom.useHistory(); // Redirect function
    const { register, handleSubmit,formState : {errors} } = useForm<UserModel>();

    async function send(user: UserModel) {
        try {
          console.log(user);
            const response = await axios.post<UserModel>(globals.urls.login+user.clientType+"/"+user.password+"/"+user.email, user); // UserModel is the type return back from the server.
            store.dispatch(loginAction(response.data));
            notify.success("You have been successfully logged in!");
            if(user.clientType ==="adminstrator"){
                history.push("/adminLP");
            }
            if(user.clientType ==="company"){
                history.push("/companyLP");
            }
            if(user.clientType ==="customer"){
                history.push("/customerLP");
            }
        }
        catch (err) {
            notify.error(err);
        }
    }

    return (
        <div className="Login LoginBox">

            <h2>Login</h2>

            <form onSubmit={handleSubmit(send)}>
            <Form>
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
              
              <Form.Group>
            <Form.Label > CLient Type:</Form.Label> <br/>
            <select {...register("clientType", { required: true })}>
            <option value="company" >company</option>
                    <option value="adminstrator">adminstrator</option>
                    <option value="customer">customer</option>

            </select>
          </Form.Group>
        
                <br /> 
                
                </Form>
                
                <div className="container">
                    <div className="row">
                        <div className="col text-center align-bottom">
                            <Button className="btn btn-default" type="submit">Login</Button>
                        </div>
                    </div>
                </div>

            </form>
        </div>
    );
}


export default Login;
