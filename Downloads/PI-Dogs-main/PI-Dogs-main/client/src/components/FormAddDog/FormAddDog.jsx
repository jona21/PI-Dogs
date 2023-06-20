import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTemperaments, postDog } from "../../redux/actions";

import style from "../FormAddDog/FormAddDog.module.css";

const validate = (form) => {
    let errors = {}
    if(!form.name) {
        errors.name = "*El nombre es obligatorio y no puede contener números"
    }
    if(!form.min_height || !form.max_height) {
        errors.height = "*La altura es obligatoria"
    }
    if(!form.min_weight || !form.max_weight) {
        errors.weight = "*El peso es obligatorio"
    }
    if(!form.life_span) {
        errors.life_span = "*La esperanza de vida es obligatoria, usa la “ - ” para separar los valores"
    }
    return errors
}

export default function FormAddDog() {
    
    const dispatch = useDispatch();
    const temperaments = useSelector((state) => state.temperaments);

    const [button, setButton] = useState(true);
    const [errors, setErrors] = useState({
        name: "",
        min_height: "",
        max_height: "",
        min_weight: "",
        max_weight: "",
        life_span:  "",
        image: "",
    });

    const [form, setForm] = useState({
        name: "",
        min_height: "",
        max_height: "",
        min_weight: "",
        max_weight: "",
        life_span:  "",
        image: "",
        temperaments: [],
    })

    useEffect(() => {
        dispatch(getTemperaments());
    }, [dispatch]);

    useEffect(()=>{
        if (form.name.length > 0 && form.min_height.length > 0  && form.max_height.length > 0 && form.min_weight.length > 0 && form.max_weight.length > 0) setButton(false)
        else setButton(true)
    }, [form, setButton]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(postDog(form));
        alert("The new dog was added successfully");
        setForm({
            name: "",
            min_height: "",
            max_height: "",
            min_weight: "",
            max_weight: "",
            life_span: "",
            image: "",
            temperaments: []
        });
    }
    
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value //el valor del atributo modificado del estado en el form se actualizara con lo escrito en dicho campo
        });
        setErrors(validate({
            ...form,
            [e.target.name] : e.target.value
        }))
    }
    
    const handleSelect = (e) => {
        setForm({
            ...form,
            temperaments: [...form.temperaments, e.target.value]
        })
    }

    const handleDelete = (el) => {
        setForm({
            ...form,
            temperaments: form.temperaments.filter(temp => temp !== el)
        })
    }

    return(
        <div className={style.main_wrapper}>
            <div className={style.container}>
                <Link to="/home">
                    <button className={style.button_to_home}>Volver a atras</button>
                </Link>
                <form action="" id="form" onSubmit={handleSubmit} className={`${style.form}`}>
                    <div className={style.name_container}>
                        <input className={style.input_name} type="text" value={form.name} name="name" onChange={(e) => handleChange(e)} placeholder="Nombre"/>
                    </div>
                    <div className={style.error_form}>{errors.name && <p>{errors.name}</p>}</div>

                    <div className={style.height_container}>
                        <div className={style.min_height}>
                            <input type="text" value={form.min_height} name="min_height" placeholder="Altura mínima" onChange={(e) => handleChange(e)}/>
                        </div>
                        
                        <div className={style.max_height}>
                            <input type="text" value={form.max_height} name="max_height" placeholder="Altura máxima" onChange={(e) => handleChange(e)}/>
                        </div>
                    </div>
                    <div className={style.error_form}>{errors.height && <p>{errors.height}</p>}</div>

                    <div className={style.weight_container}>
                        <div className={style.min_weight}>
                            <input type="text" value={form.min_weight} name="min_weight" placeholder="Peso mínimo" onChange={(e) => handleChange(e)}/>
                        </div>

                        <div className={style.max_weight}>
                            <input type="text" value={form.max_weight} name="max_weight" placeholder="Peso máximo" onChange={(e) => handleChange(e)}/>
                        </div>
                    </div>
                    <div className={style.error_form}>{errors.weight && <p>{errors.weight}</p>}</div>

                    <div className="life-span-container">
                        <input type="text" autoComplete="off" name="life_span" value={form.life_span} placeholder="Esperanza de vida: 10 - 12" onChange={(e) => handleChange(e)}/>
                    </div>
                    <div className={style.error_form}>{errors.life_span && <p>{errors.life_span}</p>}</div>{/* espacio para agregar error */}

                    <div className="image-container">
                        <input type="text" autoComplete="off" value={form.image} name="image" placeholder="URL de la imagen" onChange={(e) => handleChange(e)}/>
                    </div>

                    <div className={style.selectTemp}>
                        <h3>Seleccionar temperamento</h3>
                    </div>

                    <div className={""}>
                        <select className={style.select_temperaments} onChange={handleSelect}>
                            <option disabled selected>Temperamentos</option>
                            {temperaments.map(d => (                    
                                <option value={d.name} key={d.name+Math.random()} className={style.option_temperament}>{d.name}</option> //key de elementos de temperamentos, eliminar el repetido reserved
                            ))}
                        </select>
                    </div>

                    <div className={style.container_button_add_dog}>
                        <button className={style.button_add_dog} disabled={button} type="submit" form="form">Crear mascota</button>
                    </div>
                </form>

            

                <div className="">
                    <div className={style.h2temp}>
                        <h2>Temperamentos</h2>
                    </div>

                    <div className={style.container_temperaments}>
                        {form.temperaments.map(el => 
                        <div className={style.element_temperament} key={el} onClick={() => handleDelete(el)}>
                            <p>{`${el}`}</p>
                        </div>    
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}