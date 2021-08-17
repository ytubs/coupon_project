import CompanyModel from "../../../Models/CompanyModel";
import { useEffect, useState } from "react";
import jwtAxios from "../../../services/JwtAxios";
import globals from "../../../services/Globals";
import notify from "../../../services/Notification";
import CompanyCard from "../../AdminArea/CompanyCard/CompanyCard";



function GetCompanyDetails(): JSX.Element {
    const [companyState, setCompanyState] = useState<CompanyModel>(null);
    useEffect(()=>{

        async function send() {
            try {
               
                const response = await jwtAxios.get<CompanyModel>(globals.urls.getComapnyDetails);
                const getCompany = response.data;
                setCompanyState(response.data);  
                notify.success("success " );
                
                
            }
            catch (err) {
                notify.error(err);
            }
        }
         send();
    },[]);
   
   
    return (
			   
        <div className="getCompanyDetails ">
                {companyState && <CompanyCard company={companyState}  />}
                
        </div>
    );
}

export default GetCompanyDetails;
