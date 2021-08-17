import "./CompanyLP.css";
import AddCoupon from "../../CompanyArea/AddCoupon/AddCoupon";
import UpdateCoupon from "../../CompanyArea/UpdateCoupon/UpdateCoupon";
import DeleteCoupon from "../../CompanyArea/DeleteCoupon/DeleteCoupon";
import { useHistory } from "react-router";
import { useEffect } from "react";
import store from "../../../Redux/Store";
import notify from "../../../services/Notification";
import GetCoupon from "../../CompanyArea/GetCoupon/GetCoupon";
import { Dropdown, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";


function CompanyLP(): JSX.Element {
    const history = useHistory();
    useEffect(() => {
        if (store.getState().AuthState.user?.clientType !== "company") {
            notify.error("Please log in as company to continue to company landing page");
            history.push("/login");
        }
    }, []);
    return (
        <div className="CompanyLP Scroller">
            <Dropdown className="dropDown">
                <Dropdown.Toggle variant="success" id="dropdown-basic" >
                    My Account
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item><Nav.Link as={Link} to="/GetAllCoupons" > My Coupons</Nav.Link></Dropdown.Item>
                    <Dropdown.Item><Nav.Link as={Link} to="/getCompanyDetails"> My Account Details</Nav.Link></Dropdown.Item>
                    <Dropdown.Item><Nav.Link as={Link} to="/getAllCouponsByCategory"> My Coupons By Category</Nav.Link></Dropdown.Item>
                    <Dropdown.Item><Nav.Link as={Link} to="/getAllCouponsByMaxPrice">My Coupons By MaxPrice</Nav.Link></Dropdown.Item>
                    <Dropdown.Item><Nav.Link as={Link} to="/getCoupon">View One Coupon</Nav.Link></Dropdown.Item>

                </Dropdown.Menu>
            </Dropdown>
            <div className="firstRow">
                <AddCoupon />
                <UpdateCoupon />
            </div>
            <div className="seconedRow">

                <DeleteCoupon /> 
            </div>
        </div>

    );
}

export default CompanyLP;
