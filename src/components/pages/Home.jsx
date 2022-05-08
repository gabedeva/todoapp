import React, { useEffect, useContext, useState } from 'react';

import storage from '../helpers/storage';

import SEO from '../layouts/partials/SEO';

const Home = () => {

    const [notifications, setNotif] = useState([]);
    const[listen, setListen] = useState(false);

    useEffect(() => {

        initListen();

    }, [listen, notifications])

    const initListen = async () => {
        if(listen === false){
            const events = await new EventSource('http://localhost:5000/api/identity/v1/notify/events');

            events.onmessage = (e) => {

                const parsed = JSON.parse(e.data);
                setNotif(parsed);
            }

            setListen(true);
        }
    }

    
    return(

        <>

            <SEO type="main" />
            <h1>Hello Todo!</h1>

            <table className="table table-striped">

                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Sender</th>
                        <th>Body</th>
                    </tr>
                </thead>

                <tbody>

                    {
                        notifications.map((n, i) =>

                            <tr key={i}> 
                                <td>{ n.refId }</td>
                                <td>{ n.sender ? n.sender['name'] : '' }</td>
                                <td>{ n.body }</td>
                            </tr>
                        )     
                    }

                </tbody>

            </table>
        
        </>
    )

}

export default Home;