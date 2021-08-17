import { useEffect, useState } from "react";
import CustomerModel from "../../../Models/CustomerModel";
import notify from "../../../services/Notification";
import globals from "../../../services/Globals";
import CustomerCard from "../CustomerCard/CustomerCard";
import jwtAxios from "../../../services/JwtAxios";

function GetAllCustomers(): JSX.Element {
    const [companiesState, setCompaniesState] = useState<CustomerModel[]>(null);
    useEffect(() => {

        async function send() {
            try {
                const response = await jwtAxios.get<CustomerModel[]>(globals.urls.getAllCustomers);
                const getCompany = response.data;
                setCompaniesState(response.data);
                notify.success("success");


            }
            catch (err) {
                notify.error(err);
            }
        }
        send();
    }, []);


    return (
        <div className="GetAllCustomers">
            {companiesState && companiesState.map((customer, index) => {
                return (
                    <CustomerCard key={index} customer={customer} />
                )
            })};
        </div>
    );
}

export default GetAllCustomers;
