import React, { useState, useEffect, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Axios from 'axios';

import Alert from '../../layouts/partials/Alert';
import storage from '../../helpers/storage';

import Message from '../../layouts/partials/Message';

import Timer from '../../helpers/timer';

import SEO from '../../layouts/partials/SEO';


const Login = (props) => {

    const history = useHistory();

    const [showPass, setShowPass] = useState(false);
    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
        code: ''
    })
    
    const [loading, setLoading] =  useState(false);
    const [timerLoading, setTimerLoading] = useState(false);
    const [step, setStep] = useState(0);
    const [timer, setTimer] = useState(false);

    const [msgData, setMsgData] = useState({
        title: '',
        type: 'success',
        message: '',
        buttonText: 'Ok'
    })

    const [aData, setAdata] = useState({
        show: false,
        type: '',
        message: ''
    })

    useEffect(() => {

     

    }, []);

    const togglePass = (e) => {
        e.preventDefault();
        setShowPass(!showPass);
    }

    const msgAction = () => {
        history.push('/register');
    }

    const sendCode = async (e) => {
        e.preventDefault();
        setTimerLoading(true);

        await Axios.post(`${process.env.REACT_APP_IDENTITY_URL}/emails/send-email-verification`, {email: loginData.email})
        .then((resp) => {
            if(resp.data.error === false){

                setTimerLoading(false);
                setAdata({...aData, show: true, type: 'success', message: 'Code sent successfully'});
                setTimeout(() => {
                    setAdata({...aData, show: false});
                   
                }, 5000)
                setTimer(true);
                setTimeout(() => {
                    setTimer(false);
                }, 60000);
            }
        }).catch((err) => {
            setAdata({...aData, show: true, type: 'danger', message: err.response.data.message});
            setTimeout(() => {
                setAdata({...aData, show: false});
                setTimerLoading(false);
            }, 5000)
        })
    }

    const login = async(e) => {

        e.preventDefault();

        if(!loginData.email && !loginData.password){
            setAdata({...aData, show: true, type: 'danger', message: 'All fields are required'});
            setTimeout(() => {
                setAdata({...aData, show: false});
            }, 5000)
        }else if(!loginData.email){
            setAdata({...aData, show: true, type: 'danger', message: 'Enter your email'});
            setTimeout(() => {
                setAdata({...aData, show: false});
            }, 5000)
        }else if(!loginData.password){
            setAdata({...aData, show: true, type: 'danger', message: 'Enter your password'});
            setTimeout(() => {
                setAdata({...aData, show: false});
            }, 5000)
        }else if(step === 1 && !loginData.code){
            setAdata({...aData, show: true, type: 'danger', message: 'Enter Verification code'});
            setTimeout(() => {
                setAdata({...aData, show: false});
            }, 5000)
        }else if(step === 1 && (loginData.code.length < 6 || loginData.code.length > 6)){
            setAdata({...aData, show: true, type: 'danger', message: 'Verification code cannot be less than or greater than 6 digits'});
            setTimeout(() => {
                setAdata({...aData, show: false});
            }, 5000)
        }else{
            setLoading(true);
          

            try {
                await Axios.post(`${process.env.REACT_APP_IDENTITY_URL}/auth/login`, {...loginData})
                .then((resp) => {

                    if(resp.data.error === true && resp.data.status === 206){
                        setStep(1);
                        setLoading(false);

                        setTimer(true);
                        setTimeout(() => {
                            setTimer(false);
                        }, 60000);
                    }

                    if(resp.data.error === false){
                          
                            storage.saveCredentials(resp.data.token, resp.data.data._id)

                            // setMsgData({...msgData, type: 'success', title: 'Login Succesful!', message: 'You have successfully logged in', buttonText: 'Ok'})
                            // setStep(2);

                            props.history.push('/dashboard');
                    }
                }).catch((err) => {
                    setAdata({...aData, show: true, type: 'danger', message: err.response.data.message});
                    setTimeout(() => {
                        setAdata({...aData, show: false});
                        setLoading(false);
                    }, 5000)

                }) 
            } catch (err) {
                  setAdata({...aData, show: true, type: 'danger', message: err.response.data.message});
                    setTimeout(() => {
                        setAdata({...aData, show: false});
                        setLoading(false);
                }, 5000) 
            }
    
        }

    }
    return(

        <>
        <SEO pageTitle="Todo - Login" />
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

                                    <h3 className="fs-18 ominshaft ui-text-center mrgb2">Welcome back!</h3>

                                    <Alert show={aData.show} type={aData.type} message={aData.message} />

                                    
                                    <div className="form-group">

                                        <label className="fs-14 omineshaft">Email Address</label>
                                        <input
                                        defaultValue={(e) => setLoginData({...loginData, email: e.target.value })} 
                                        onChange={(e) => setLoginData({...loginData, email: e.target.value })}   
                                        type="email" className="form-control" placeholder="you@example.com" />

                                    </div>

                                    <div className="form-group">

                                        <label className="fs-14 omineshaft">Password</label>

                                        <div className="input-group">
                                            <input
                                            defaultValue={(e) => setLoginData({...loginData, password: e.target.value })} 
                                            onChange={(e) => setLoginData({...loginData, password: e.target.value })} 
                                            type={showPass ? 'text' : 'password'} className="form-control" placeholder="Enter password" />
                                            <div className="input-group-append">
                                            <span className="input-group-text" id="basic-addon2">
                                                <Link onClick={(e) => togglePass(e)} to="" className="omineshaft fs-13">show</Link>
                                            </span>
                                            </div>
                                        </div>

                                    </div>

                                    <div className="form-group mrgt2">

                                        {
                                            loading ? (
                                                <button type="submit" className="btn bg-silver font-weight-bold btn-lg btn-block omineshaft fs-16 disabled">Logging you in...</button>
                                            ) : (
                                                <button onClick={(e) => login(e)} type="submit" className="btn bg-silver font-weight-bold btn-lg btn-block omineshaft fs-16">Login</button>
                                            )
                                        }


                                    </div>

                                    <div className="ui-text-center mrgb1 mrgt2">
                                        
                                        <Link to="" className="onblue fs-14">Forgot password?</Link> <br />
                                        <Link to="" className="onblue fs-14">New user? Register here</Link>

                                    </div>

                                </div>

                                }

                                { // verification
                                    step === 1 &&
                                    <>
                                        <div className="frm-box">
                                            <h3 className="fs-18 omineshaft ui-text-center mrgb2">Verification</h3>

                                            <Alert show={aData.show} type={aData.type} message={aData.message} />

                                            <p className="fs-14 omineshaft ui-text-center">A 6-digit code has been sent to your email. Please enter the code below</p>

                                            <div className="form-group">
                                                <label className="fs-14 omineshaft">Enter Verification Code</label>
                                                <input 
                                                defaultValue={(e) => setLoginData({...loginData, code: e.target.value })} 
                                                onChange={(e) => setLoginData({...loginData, code: e.target.value })} 
                                                type="number" className="form-control" placeholder="Enter Code" />

                                            </div>

                                            <div className="form-group ui-text-center">
                                                
                                                {
                                                    timer ? (
                                                        <div className="fs-14">Resend code in <Timer duration={60 * 1} /></div>
                                                    ) : (

                                                        <>
                                                            {
                                                                timerLoading ? (
                                                                    <Link className="onblue fs-15 disabled">Sending Code...</Link>

                                                                ) : (
                                                                    <Link onClick={(e) => sendCode(e)} className="onblue fs-15">Resend Verification Code</Link>

                                                                )
                                                            }
                                                        </>
                                                    )
                                                }

                                            </div>

                                            <div className="form-group mrgt2">

                                                {
                                                    loading ? (
                                                        <button type="submit" className="btn bg-silver font-weight-bold btn-lg btn-block omineshaft fs-16 disabled">Verifying account...</button>
                                                    ) : (
                                                        <button onClick={(e) => login(e)} type="submit" className="btn bg-silver font-weight-bold btn-lg btn-block omineshaft fs-16">Verify</button>
                                                    )
                                                }


                                            </div>

                                            
                                        </div>
                                    </>
                                }

                                { // msgAction is to redirect to register 
                                    step === 2 &&
                                    <Message type={msgData.type} action={msgAction} title={msgData.title} message={msgData.message} buttonText={msgData.buttonText} />
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

export default Login;