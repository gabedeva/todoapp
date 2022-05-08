let body = {};

body.changeBackground = (cn) => {

    const elem = document.querySelector('.body');
    if(elem){
        elem.classList.add(cn);
    }
}

body.dismissBackground = (cn) => {
    const elem = document.querySelector('.body');

    if(elem){
        elem.classList.remove(cn)
    }
}
export default body;