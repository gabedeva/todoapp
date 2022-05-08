import React, { useEffect, useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { Tabs, Tab, TabPanel, TabList } from 'react-web-tabs';

import UserContext from '../../../context/user/userContext';

import storage from '../../helpers/storage';
import TopBar from '../../layouts/partials/TopBar';
import UpdateModal from '../../layouts/partials/UpdateModal';
import Friend from './Friend';

const Home = () => {

    const history = useHistory();

    const userContext = useContext(UserContext);

    const [show, setShow] = useState(false);

    useEffect(() => {
        toggleUpdate();
    }, [])

    const toggleUpdate = (e) => {

        if (e) {
            e.preventDefault();
        }

        setShow(!show)
    }

    const barLinks = () => {

        return (
            <>
                <div className="ui-group-button">
                    <Link className="btn btn-sm btn-primary onwhite fs-15">Back</Link>
                    <Link className="btn btn-sm btn-primary onwhite fs-15">Meetings</Link>
                </div>
            </>
        )
    }

    return (
        <>
            <TopBar pageTitle="Dashboard" linkComps={barLinks} />

            <section className="overview-box mrgb2">

                <div className="row">

                    <div className="col-md-3">


                        <div className="ui-dashboard-card">

                            <div className="ui-card-body ui-text-center">

                                <h3 className="omineshaft fs-25 mt-2">0</h3>
                                <p className="onsilver fs-16 mrgb">Todo Lists</p>
                            </div>

                        </div>

                    </div>
                    <div className="col-md-3">


                        <div className="ui-dashboard-card">

                            <div className="ui-card-body ui-text-center">

                                <h3 className="omineshaft fs-25 mt-2">0</h3>
                                <p className="onsilver fs-16 mrgb">Meetings</p>
                            </div>

                        </div>

                    </div>
                    <div className="col-md-3">


                        <div className="ui-dashboard-card">

                            <div className="ui-card-body ui-text-center">

                                <h3 className="omineshaft fs-25 mt-2">0</h3>
                                <p className="onsilver fs-16 mrgb">Friends</p>
                            </div>

                        </div>

                    </div>
                    <div className="col-md-3">


                        <div className="ui-dashboard-card">

                            <div className="ui-card-body ui-text-center">

                                <h3 className="omineshaft fs-25 mt-2">Free</h3>
                                <p className="onsilver fs-16 mrgb">Plan</p>
                            </div>

                        </div>

                    </div>

                </div>

            </section>

            <section>

                <div className="row">

                    <div className="col-md-8">

                        <div className="ui-dashboard-card">

                            <Tabs defaultTab="one" onChange={(tabId) => { }}>

                                <TabList>

                                    <Tab onClick={(e) => e.preventDefault()} tabFor="one" className="tab-head">

                                        <span className="fs-14">Todo Lists</span>

                                    </Tab>

                                    <Tab onClick={(e) => e.preventDefault()} tabFor="two" className="tab-head">

                                        <span className="fs-14">Meetings</span>

                                    </Tab>

                                </TabList>

                                <TabPanel tabId="one">

                                    <div className="ui-card-body">

                                        <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th scope="col">#</th>
                                                    <th scope="col">First</th>
                                                    <th scope="col">Last</th>
                                                    <th scope="col">Handle</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th scope="row">1</th>
                                                    <td>Mark</td>
                                                    <td>Otto</td>
                                                    <td>@mdo</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">2</th>
                                                    <td>Jacob</td>
                                                    <td>Thornton</td>
                                                    <td>@fat</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">3</th>
                                                    <td>Larry</td>
                                                    <td>the Bird</td>
                                                    <td>@twitter</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                </TabPanel>

                                <TabPanel tabId="two">

                                    <div className="ui-card-body">

                                        <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th scope="col">#</th>
                                                    <th scope="col">Second</th>
                                                    <th scope="col">First</th>
                                                    <th scope="col">SN</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th scope="row">1</th>
                                                    <td>Mark</td>
                                                    <td>Otto</td>
                                                    <td>@mdo</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">2</th>
                                                    <td>Jacob</td>
                                                    <td>Thornton</td>
                                                    <td>@fat</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">3</th>
                                                    <td>Larry</td>
                                                    <td>the Bird</td>
                                                    <td>@twitter</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                </TabPanel>

                            </Tabs>

                            <div className="ui-card-footer">

                                <div className="ui-card-footer-options">

                                </div>

                            </div>

                        </div>

                    </div>

                    <div className="col-md-4">

                        <div className="ui-dashboard-card">

                            <div className="ui-card-header">

                                <h3 className="omineshaft ui-card-title">Friends</h3>

                                <div className="ui-card-header-options">


                                </div>

                            </div>

                            <div className="ui-card-body frnd-list">

                                <Friend name={'Adeniji Opeyemi'} email={'adenijiopeyemi68@gmail.com'} />
                                <Friend name={'Immanuela jones'} email={'adenijiopeyemi68@gmail.com'} />
                                <Friend name={'Immanuela jones'} email={'adenijiopeyemi68@gmail.com'} />
                                <Friend name={'Immanuela jones'} email={'adenijiopeyemi68@gmail.com'} />
                                <Friend name={'Immanuela jones'} email={'adenijiopeyemi68@gmail.com'} />
                                <Friend name={'Immanuela jones'} email={'adenijiopeyemi68@gmail.com'} />

                            </div>

                            <div className="ui-card-footer">

                                <div className="ui-card-footer-options">

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

            {/* {
                userContext.user && !userContext.loading && !userContext.user.isUpdated &&
                <UpdateModal isShow={show} closeModal={toggleUpdate} />
            } */}

        </>
    )
}

export default Home;