import AddCompany from "../../AdminArea/AddCompany/AddCompany";
import "./AdminLP.css";
import AddCustomer from "../../AdminArea/AddCustomer/AddCustomer";
import DeleteCustomer from "../../AdminArea/DeleteCustomer/DeleteCustomer";
import DeleteCompany from "../../AdminArea/DeleteCompany/DeleteCompany";
import GetCompany from "../../AdminArea/GetCompany/GetCompany";
import GetCustomer from "../../AdminArea/GetCustomer/GetCustomer"
import UpdateCompany from "../../AdminArea/UpdateCompany/UpdateCompany"
import UpdateCustomer from "../../AdminArea/UpdateCustomer/UpdateCustomer"
import store from "../../../Redux/Store";
import notify from "../../../services/Notification";
import { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Dropdown, Nav } from "react-bootstrap";


function AdminLP(): JSX.Element {
  const history = useHistory();
  useEffect(() => {
    if (store.getState().AuthState.user?.clientType !== "adminstrator") {
      notify.error("Please log in as admin to continue to admin landing page");
      history.push("/login");
    }
  }, []);

  return (

    <div className="AdminLP Scroller">
      <Dropdown className="dropDown">
        <Dropdown.Toggle variant="success" id="dropdown-basic" >
          My Customers/Companies
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item><Nav.Link as={Link} to="/getAllCustomers">My Customers</Nav.Link></Dropdown.Item>
          <Dropdown.Item><Nav.Link as={Link} to="/getAllCompanies"> My Companeis</Nav.Link></Dropdown.Item>
          <Dropdown.Item><Nav.Link as={Link} to="/getCompany">View one Company</Nav.Link></Dropdown.Item>
          <Dropdown.Item><Nav.Link as={Link} to="/getCustomer">  View One Customer</Nav.Link></Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <div className="firstRow">

        <UpdateCustomer />

        <AddCustomer />
        <UpdateCompany />
        <AddCompany />
      </div>
      <div className="seconedRow">

        <DeleteCompany />

        <DeleteCustomer />
       
      </div>

    </div>
  );

}

export default AdminLP;
