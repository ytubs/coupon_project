import "./CompanyCard.css";
import { NavLink } from "react-router-dom";
import CompanyModel from "../../../Models/CompanyModel";


interface CompanyCardProps {
    company: CompanyModel;
}

function CompanyCard(props: CompanyCardProps): JSX.Element {
    return (
        <div className="CompanyCard Box">
            <div>
                Name: {props.company.name} <br />
                Email: {props.company.email}<br />
                Password: {props.company.password}<br />

            </div>

        </div>
    );
}

export default CompanyCard;
