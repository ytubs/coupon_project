import { useEffect, useState } from "react";
import globals from "../../../services/Globals";
import notify from "../../../services/Notification";
import CompanyCard from "../CompanyCard/CompanyCard";
import CompanyModel from "../../../Models/CompanyModel";
import jwtAxios from "../../../services/JwtAxios";


function GetAllCompanies(): JSX.Element {
    const [companiesState, setCompaniesState] = useState<CompanyModel[]>(null);
    useEffect(() => {

        async function send() {
            try {
                const response = await jwtAxios.get<CompanyModel[]>(globals.urls.getAllCompanies);
                const getCompany = response.data;
                setCompaniesState(response.data);
                notify.success("success ");


            }
            catch (err) {
                notify.error(err);
            }
        }
        send();
    }, []);


    return (

        <div className="GetAllCompanies">
            {companiesState && companiesState.map((company, index) => {
                return (
                    <CompanyCard key={index} company={company} />
                )
            })};
        </div>
    );
}

export default GetAllCompanies;
