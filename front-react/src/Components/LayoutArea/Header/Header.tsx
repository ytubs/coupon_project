import Logo from "../Logo/Logo";
import "./Header.css";
import Logout from "../../AuthArea/Logout/Logout";
function Header(): JSX.Element {
    return (
        <div className="Header">
    	<Logo/>
<h1>Cuopon project Chen and Yoni</h1>
        <div className="button">
             <Logout/>
        </div>
        </div>
      
    );
}

export default Header;
