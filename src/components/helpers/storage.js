let storage = {};

storage.checkToken = () => {
    return localStorage.getItem('token') ? true : false;
}

storage.getToken = () => {
    return localStorage.getItem('token');
}

storage.checkUserID = () => {
    return localStorage.getItem('userId') ? true : false;
}

storage.getUserID = () => {
    return localStorage.getItem('userId');
}

storage.getConfig = () => {

    const config = {
        headers: {
            ContentType: 'application/json'
        }
    }

    

    return config;  
}   

storage.getConfigWithBearer = () => {

    const config = {
        headers: {
            ContentType: 'application/json',
            Authorization: `Bearer ${storage.getToken()}`
        }
    }

    console.log(config);

    return config;
}
    
storage.saveCredentials = (token, id) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userId', id);
}

storage.clearAuth = () => {
    if(storage.checkToken() && storage.checkUserID()){
        localStorage.clear();
    }
}

export default storage;