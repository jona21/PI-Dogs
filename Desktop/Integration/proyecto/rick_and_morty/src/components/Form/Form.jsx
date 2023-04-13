import style from "./Form.module.css"
import imgLogin from "../Assets/img/about.jpg"
import { useState } from "react"
import validation from "../Validation/Validation"

const Form = ({login}) => {
    const [errors, setErrors] = useState({});
    const [userData, setUserData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (event) =>{
        setUserData({
            ...userData,
            [event.target.name]: event.target.value
        })

        setErrors(validation({
            ...userData,
            [event.target.name]: event.target.value
        }))
    }

    const handleSubmit = (event) =>{
        event.preventDefault();
        login(userData);
        
    }

    return(
        <form className={style.container} onSubmit={handleSubmit}>
            <img src={imgLogin} alt="" className={style.imgLogin} />
            <div className={style.boxInputs}>
                <div className={style.containerEmail}>
                    <label htmlFor="email">Email: </label>
                    <input type="email" name="email" value={userData.email} className={style.box} onChange={handleChange}/>
                    {errors.email && <p className={style.inputError}>{errors.email}</p>}
                </div>
                <div>
                    <label htmlFor="password">Password: </label>
                    <input type="password" name="password" value={userData.password} className={style.box} onChange={handleChange}/>
                    {errors.password && <p className={style.inputError}>{errors.password}</p>}
                </div>
            </div>
            <button className={style.buttonSubmit}>Submit</button>
        </form>
    )
}
export default Form;