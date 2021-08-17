import "./Logo.css";
import logoimg from "../../../Assets/images/logoimg.jpg";
function Logo(): JSX.Element {
    return (
        <div className="Logo">
            <img src={logoimg} />
        </div>
    );
}

export default Logo;
