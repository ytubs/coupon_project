import CustomerModel from "../../../Models/CustomerModel";
import "./CustomerCard.css";

interface CustomerCardProps {
    customer: CustomerModel;
}

function CustomerCard(props: CustomerCardProps): JSX.Element {
    return (
        <div className="CustomerCard Box">
            <div>
                First Name: {props.customer.firstName} <br />
                Last Name: {props.customer.lastName} <br />
                Email: {props.customer.email}<br />
                Password: {props.customer.password}<br />

            </div>

        </div>
    );
}

export default CustomerCard;
