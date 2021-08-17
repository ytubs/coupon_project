import "./Menu.css";
import { NavLink, useHistory, } from "react-router-dom";
import store from "../../../Redux/Store";
import { useEffect, useState } from "react";

function Menu(): JSX.Element {
    const history = useHistory();
    // const client = store.getState().AuthState.user.clientType;
   
    const [isCLient, setClient] = useState(null);
     useEffect(() => {
       
        const unsbscribe= store.subscribe(() => {
            setClient(store.getState().AuthState?.user?.clientType);
        });
        return() => {
            unsbscribe();
        }
    }
    )
console.log(isCLient);    
    let Lp = "";
    if (isCLient === "adminstrator") {
        Lp = "/adminLp";
    }
    if (isCLient === "company") {
        Lp = "/companyLp";
    }
    if (isCLient === "customer") {
        Lp = "/customerLp";
    }
    return (
        <div className="Menu">

            <NavLink to="/home" exact>Home</NavLink>
            <br />
            <NavLink to="/contact-us" exact>Contact us</NavLink>       
             <br />

            <NavLink to={Lp}> Landing page</NavLink>

        </div>
    );
}

export default Menu;
