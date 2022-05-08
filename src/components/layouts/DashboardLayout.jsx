import React, { Component } from 'react';

import Header from '../layouts/partials/Header';
import SideMenu from '../layouts/partials/SideMenu';

const Dashboard = (DashboardComponent) => {

    return class DashboardLayout extends Component{

        constructor(props){
            super();
        }

        render(){

            return(
                <>
                    <Header /> 

                    <div className="container-fluid">

                        <SideMenu />

                        <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">

                            <DashboardComponent {...this.props} />

                        </main>

                    </div>
                </>
            )
        }
    }
}

export default Dashboard;

