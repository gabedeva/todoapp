import React, { useState, useEffect, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Axios from 'axios';
import CountryContext from '../../../context/countries/countryContext';

import Alert from '../../layouts/partials/Alert';
import Message from '../../layouts/partials/Message';

import CountrySearch from '../../layouts/partials/CountrySearch';
import SEO from '../../layouts/partials/SEO';

const Register = () => {
    
    const history = useHistory();

    const countryContext = useContext(CountryContext);

    const [regData, setRegData] = useState({
        email: '',
        password: '',
        phoneNumber: '',
        phoneCode: ''
    });

    const [alert, setAlert] = useState({
        type: '',
        show: false,
        message: ''
    })

    const [selected, setSelected] = useState(false);
    const [showPass, setShowPass] = useState(false);
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(0);
    const [msgData, setMsgData] = useState({
        title: '',
        type: 'success',
        message: '',
        buttonText: 'Ok'
    })


    useEffect(() => {

        countryContext.getCountries(9999);
        countryContext.getIpAddress();

    }, []);

    const msgAction = (e) => {
        history.push('/login')
    }

    const register = async (e) => {

        e.preventDefault();

        // set the default country
        if (!selected) {
            const cty = setDefault(countryContext.ipData.loc);
            regData.phoneCode = cty.left ? cty.left : '+234';
        }


        if (!regData.email && !regData.password && !regData.phoneNumber && !regData.phoneCode) {
            setAlert({ ...alert, type: "danger", show: true, message: 'All Fields are required' })
            setTimeout(() => {
                setAlert({ ...alert, show: false });
            }, 5000)
        } else if (!regData.email) {
            setAlert({ ...alert, type: "danger", show: true, message: 'Enter your email' })
            setTimeout(() => {
                setAlert({ ...alert, show: false });
            }, 5000)

        } else if (!regData.password) {
            setAlert({ ...alert, type: "danger", show: true, message: 'Enter your preferred password' })
            setTimeout(() => {
                setAlert({ ...alert, show: false });
            }, 5000)
        } else if (regData.password.length < 8) {
            setAlert({ ...alert, type: "danger", show: true, message: 'Password cannot be less than 8 characters' })
            setTimeout(() => {
                setAlert({ ...alert, show: false });
            }, 5000)
        } else if (!regData.phoneNumber) {
            setAlert({ ...alert, type: "danger", show: true, message: 'Enter your phone number' })
            setTimeout(() => {
                setAlert({ ...alert, show: false });
            }, 5000)
        } else if (!regData.phoneCode) {
            setAlert({ ...alert, type: "danger", show: true, message: 'Please choose a country' })
            setTimeout(() => {
                setAlert({ ...alert, show: false });
            }, 5000)
        } else {
            setLoading(true);

            try {
                await Axios.post(`${process.env.REACT_APP_IDENTITY_URL}/auth/register`, { ...regData })
                    .then((resp) => {
                        if (resp.data.error === false) {
                            console.log(resp);
                            setMsgData({...msgData, type: 'success', title: 'Account created successfully!', message: 'You have successfully created an account', buttonText: 'Ok' })
                            setStep(1);
                            setLoading(false);
                        }
                    }).catch((err) => {
                        if (err.response.data.errors[0].includes('Password must contain')) {
                            setAlert({ ...alert, type: "danger", show: true, message: err.response.data.errors[0] })
                            setTimeout(() => {
                                setAlert({ ...alert, show: false });
                            }, 5000)

                            setLoading(false);
                        } else {
                            setAlert({ ...alert, type: "danger", show: true, message: err.response.data.message })
                            setTimeout(() => {
                                setAlert({ ...alert, show: false });
                            }, 5000)

                            setLoading(false);
                        }

                    })
            } catch (err) {
                setAlert({ ...alert, type: "danger", show: true, message: err.response.data.message })
                setTimeout(() => {
                    setAlert({ ...alert, show: false });
                }, 5000)

                setLoading(false);
            }
        }
    }


    const getOptions = () => {
        const formatted = countryContext.countries.filter((i) => i.phoneCode !== undefined);
        const cp = formatted.map((i) => {

            let c = {
                value: i._id,
                label: i.name,
                left: i.phoneCode,
                image: i.flag ? i.flag : '../../../images/assets/c-avatar.svg'
            }

            return c;
        })
        return cp ? cp : [];
    }

    const setDefault = (code) => {
        if (!countryContext.loading && countryContext.countries.length > 0) {
            const ct = countryContext.countries.find((i) => i.code2 === code);
            const fm = {
                value: ct._id,
                label: ct.name,
                left: ct.phoneCode,
                image: ct.flag ? ct.flag : '../../../images/assets/c-avatar.svg'
            }
            return fm;
        } else {
            return 1;
        }
    }

    const getSelected = (val) => {
        setRegData({ ...regData, phoneCode: val.left })
        setSelected(true);
    }

    // toggle show password
    const togglePass = (e) => {
        e.preventDefault();
        setShowPass(!showPass);
    }

    return (

        <>
            <SEO pageTitle="Todo - Register" />
            <section className="auth-box">

                <div className="container">

                    <div className="box-wrapper">

                        <div className="row">

                            <div className="col-md-5 mx-auto">

                                <h2 className="fs-24 omineshaft ui-text-center mrgb2">Todo!</h2>

                                <form onSubmit={(e) => e.preventDefault()}>
                                    {
                                        step === 0 &&
                                        
                                        <div className="frm-box">

                                        <h3 className="fs-18 ominshaft ui-text-center mrgb2">Create account!</h3>

                                        <Alert show={alert.show} type={alert.type} message={alert.message} />

                                        <div className="form-group">

                                            <label className="fs-14 omineshaft">Email Address</label>
                                            <input
                                                defaultValue={(e) => setRegData({ ...regData, email: e.target.value })}
                                                onChange={(e) => setRegData({ ...regData, email: e.target.value })}
                                                type="email" className="form-control" placeholder="you@example.com"
                                            />

                                        </div>

                                        <div className="form-group">

                                            <label className="fs-14 omineshaft">Phone Number</label>

                                            <div className="row input-fmt">
                                                <div className="col-md-8">
                                                    <input
                                                        defaultValue={(e) => setRegData({ ...regData, phoneNumber: e.target.value })}
                                                        onChange={(e) => setRegData({ ...regData, phoneNumber: e.target.value })}
                                                        type="number" className="form-control" placeholder="080000000000"
                                                    />
                                                </div>
                                                <div className="col-md-4">
                                                    <CountrySearch
                                                        options={getOptions}
                                                        defaultValue={!countryContext.loading ? countryContext.ipData ? setDefault(countryContext.ipData.loc) : setDefault('NG') : setDefault('NG')}
                                                        selected={getSelected}
                                                        className="ctry-bx"
                                                    />

                                                </div>
                                            </div>

                                        </div>


                                        <div className="form-group">

                                            <label className="fs-14 omineshaft">Password</label>

                                            <div className="input-group">
                                                <input
                                                    defaultValue={(e) => setRegData({ ...regData, password: e.target.value })}
                                                    onChange={(e) => setRegData({ ...regData, password: e.target.value })}
                                                    type={`${showPass ? 'text' : 'password'}`} className="form-control" placeholder="Enter password"
                                                />

                                                <div className="input-group-append">
                                                    <span className="input-group-text" id="basic-addon2">
                                                        <Link onClick={(e) => togglePass(e)} to="" className="omineshaft fs-13">show</Link>
                                                    </span>
                                                </div>
                                            </div>

                                        </div>

                                        <div className="form-group mrgt2">
                                            {
                                                loading &&
                                                <button type="submit" className="btn bg-silver font-weight-bold btn-lg btn-block omineshaft fs-16 disabled">Please wait...</button>
                                            }
                                            {
                                                !loading &&
                                                <button onClick={(e) => register(e)} type="submit" className="btn bg-silver font-weight-bold btn-lg btn-block omineshaft fs-16">Register</button>

                                            }


                                        </div>

                                        <div className="ui-text-center mrgb1 mrgt2">

                                            <Link to="" className="onblue fs-14">Forgot password?</Link> <br />
                                            <Link to="" className="onblue fs-14">New user? Register here</Link>

                                        </div>

                                    </div>

                                    }
                                    {
                                        step === 1 &&
                                        <Message type={msgData.type} action={msgAction} title={msgData.title} message={msgData.message} buttonText={msgData.buttonText}  />
                                    }

                                </form>

                            </div>

                        </div>
                    </div>

                </div>

            </section>

        </>
    )
}

export default Register;