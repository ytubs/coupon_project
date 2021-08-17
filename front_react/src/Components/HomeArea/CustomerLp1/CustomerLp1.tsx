import "./CustomerLp1.css";
import { Dropdown, Nav } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import GetAllCustomerCouponsByCategory from "../../CustomerArea/GetAllCustomerCouponsByCategory/GetAllCustomerCouponsByCategory";
import GetAllCustomerCouponsByMaxPrice from "../../CustomerArea/GetAllCustomerCouponsByMaxPrice/GetAllCustomerCouponsByMaxPrice";
import PurchaseCoupon from "../../CustomerArea/purchaseCoupon/purchaseCoupon";
import { useEffect } from "react";
import store from "../../../Redux/Store";
import notify from "../../../services/Notification";

function CustomerLp1(): JSX.Element {
    const history = useHistory();
    useEffect(() => {
        if (store.getState().AuthState.user?.clientType !== "customer") {
            notify.error("Please log in as customer to continue to customer landing page");
            history.push("/login");
        }
    }, []);
    return (
        <div className="CustomerLp1 Scroller">
			<Dropdown className="dropDown">
        <Dropdown.Toggle variant="success" id="dropdown-basic" >
        My Account
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item><Nav.Link as={Link} to="/getAllCustomerCoupons">My Coupons</Nav.Link></Dropdown.Item>
          <Dropdown.Item><Nav.Link as={Link} to="/getCustomerDetails"> My Account Details</Nav.Link></Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <div className="firstRow">
      <PurchaseCoupon />
          
          <GetAllCustomerCouponsByCategory />
        
      </div>
      <div className="seconedRow">
          <GetAllCustomerCouponsByMaxPrice />

     
      </div>

        </div>
    );
}

export default CustomerLp1;
