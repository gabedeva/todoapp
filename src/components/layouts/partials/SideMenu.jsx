import {useEffect, useState, useContext} from 'react';
import { Link, useHistory } from 'react-router-dom';
import UserContext from '../../../context/user/userContext';

import storage from '../../helpers/storage';
import Body from '../../helpers/body';

const SideMenu = () => {

    const userContext = useContext(UserContext)

    const history = useHistory();

    useEffect(() => {

        redirectToLogin();

        if(storage.checkToken()){
            userContext.getUser();
            Body.changeBackground('dash-body');
        }

    }, [])

    const redirectToLogin = () => {

        if(!storage.checkToken()){
            localStorage.clear();
            history.push('/login');
            Body.dismissBackground('dash-body');
        }

    }

    const logout = async(e) => {
        e.preventDefault();
        await storage.clearAuth();
        await Body.dismissBackground('dash-body');
        history.push('/login');
    }

    return(
        <>
            <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
                    <div className="sidebar-sticky pt-3">
                        <ul className="nav flex-column">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/dashboard">
                                        <span className="fe fe-home pdr" />
                                        Dashboard 
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <Link className="nav-link" to="/dashboard/todo-list" >
                                        <span className="fe fe-list pdr" />
                                        Todo Lists 
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <Link className="nav-link" href="#">
                                        <span className="fe fe-calendar pdr" />
                                        Meetings 
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <Link className="nav-link" href="#">
                                        <span className="fe fe-settings pdr" />
                                        Settings 
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <Link onClick={(e) => logout(e)} className="nav-link" href="#">
                                        <span className="fe fe-log-out pdr" />
                                        Logout
                                    </Link>
                                </li>
                        </ul>
                    </div>
                </nav>
        </>
    )
}

export default SideMenu;