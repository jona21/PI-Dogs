const validation = (userData) =>{
    const errors = {};

    if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(userData.email)){
        errors.email = 'El email ingresado no es valido';
    }
    if(!userData.email){
        errors.email = 'Su email no puede estar vacío';
    }
    if(userData.email.length > 35){
        errors.email = 'El email no debe superar los 35 caracteres';
    }
    if (!/.*\d+.*/.test(userData.password)) {
        errors.password = 'Su contraseña debe tener almenos un número';
    }
    // if(!userData.password){
    //     errors.password = 'Su contraseña no puede estar vacia';
    // }
    if (userData.password.length < 6 || userData.password.length > 10){
        errors.password = 'Su contraseña no puede ser inferior a 6 caracteres ni superior a 10 cararteres y almenos debe contener un número';
    }
    
    return errors;
}
export default validation;