import { useEffect, useState } from "react";
import CustomerModel from "../../../Models/CustomerModel";
import jwtAxios from "../../../services/JwtAxios";
import globals from "../../../services/Globals";
import notify from "../../../services/Notification";
import CustomerCard from "../../AdminArea/CustomerCard/CustomerCard";

function GetCustomerDetails(): JSX.Element {
    const [customerState, setCustomerState] = useState<CustomerModel>(null);
    useEffect(() => {

        async function send() {
            try {
                const response = await jwtAxios.get<CustomerModel>(globals.urls.getCustomerDetails);
                const getCompany = response.data;
                setCustomerState(response.data);
                notify.success("success ");
            }
            catch (err) {
                notify.error(err);
            }
        }
        send();
    }, []);


    return (

        <div className="getCustomerDetails">
            {customerState && <CustomerCard customer={customerState} />}

        </div>
    );
}
export default GetCustomerDetails;
