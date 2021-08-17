import { useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { logoutAction } from "../../../Redux/AuthState";
import store from "../../../Redux/Store";
import notify from "../../../services/Notification";

function Logout(): JSX.Element {
    let history = useHistory();
    
    const [isLoggedIn, setIsLoggedIn] = useState(null);
    useEffect(() => {
        setIsLoggedIn(store.getState().AuthState?.user?.token);

        const unsbscribe= store.subscribe(() => {
            setIsLoggedIn(store.getState().AuthState?.user?.token);
        });
        return() => {
            unsbscribe();
        }
    }
    )


    const handleLogin = () => {

        history.push("/login");
    }
    const handleLogout = () => {

        store.dispatch(logoutAction());
        notify.success("youre logged out");
       history.push("/login");

    }

    return (
        <div>
            {isLoggedIn ?
                <div className="Logout">
                    <button onClick={handleLogout}>Logout</button>
                </div>
                :

                <div className="Login">
                    <button onClick={handleLogin}>Login</button>
                </div>
            }
        
        </div>
    );


}

export default Logout;
