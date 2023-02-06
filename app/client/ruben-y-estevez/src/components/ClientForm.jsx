import {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ClientForm = () => {
    const navigate = useNavigate()
    const [info,setInfo] = useState({})
    const [formInfoErr,setFormInfoErr] = useState({})

    useEffect(()=>{
        axios.get("http://localhost:8000/api/User/loggedUser",{withCredentials:true})
        .then(res=>{
        }).catch(
            err=>{console.log("error",err) 
        navigate("/")
            }
        )
    },[])

    const logout =()=>{
        axios.get("http://localhost:8000/api/User/logout",{withCredentials:true})
        .then(res=>{
            navigate("/")
        }).catch(
            err=>{console.log("error",err) 
            }
        )
    }



    const submitHandler = (e)=>{
        e.preventDefault()
        axios.post("http://localhost:8000/api/People/new" , info )
        .then(res =>{
            console.log(res)
            if(res.data.err?.errors){
                setFormInfoErr(res.data.err.errors)
            }else{
                setFormInfoErr()
                navigate("/DashBoard") //change this to 
            }
        }).catch(
            err =>{console.log("there was an error", err)}
        )
    }

    const changeHandler = (e)=>{
        setInfo({
            ...info,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div>
            <Link to="/Dashboard"><button className=' btn btn-secondary text-white'>todos los clientes</button> </Link>
            
             <form className='from-group' onSubmit={submitHandler} >
                <div>
                    <label >primer Nombre</label>
                    <input type="text" name="name"  className='form-control' onChange={changeHandler}/>
                    {info.name?.length > 0 && info.name?.length < 2?
                    <p style={{color:"red"}}  >nombre debe de ser por lo menos 2 letras</p>:
                    formInfoErr.name? <p style={{color:"red"}} > {formInfoErr.name.message} </p>:
                    null
                }
                </div>
                <div>
                    <label >Segundo Nombre</label>
                    <input type="text" name="midName"  className='form-control' onChange={changeHandler}/>
                    {info.midName?.length > 0 && info.midName?.length < 2?
                    <p style={{color:"red"}}  >nombre debe de ser por lo menos 2 letras</p>:
                    formInfoErr.midName? <p style={{color:"red"}} > {formInfoErr.midName.message} </p>:
                    null
                }
                </div>

                <div>
                    <label >Apellido</label>
                    <input type="text" name="Lname"  className='form-control' onChange={changeHandler}/>
                    {info.Lname?.length > 0 && info.Lname?.length < 2?
                    <p style={{color:"red"}}  >apellido debe de tener por lo menos 2 letras</p>:
                    formInfoErr.Lname? <p style={{color:"red"}} > {formInfoErr.Lname.message} </p>:
                    null
                }
                </div>

                <div>
                    <label >segundo Apellido (opcional)</label>
                    <input type="text" name="secondLname"  className='form-control' onChange={changeHandler}/>
                    {info.secondLname?.length > 0 && info.secondLname?.length < 2?
                    <p style={{color:"red"}}  >apellido debe de tener por lo menos 2 letras</p>:
                    formInfoErr.secondLname? <p style={{color:"red"}} > {formInfoErr.secondLname.message} </p>:
                    null
                }
                </div>
                <div>
                    <label >Apodo (opcional)</label>
                    <input type="text" name="nickname"  className='form-control' onChange={changeHandler}/>
                    {info.nickname?.length > 0 && info.nickname?.length < 2?
                    <p style={{color:"red"}}  >Apodo debe de tener por lo menos 2 letras</p>:
                    formInfoErr.nickname? <p style={{color:"red"}} > {formInfoErr.nickname.message} </p>:
                    null
                }
                </div>
                <div>
                    <label >Fecha De Nacimiento</label>
                    <input type="date" name="dob"  className='form-control' onChange={changeHandler} />
                    {/* info.dob?.length > 0 && info.dob?.length < 2?
                    <p style={{color:"red"}}  >fecha de nacimiento no puede quedar en blanco</p>: */}
                    {
                    formInfoErr.dob? <p style={{color:"red"}} > {formInfoErr.dob.message} </p>:
                    null
                }
                </div>
                <div>
                    <label >tipo de identificación</label>
                    <select name="idType" className='form-control'  onChange={changeHandler} >
                        <option  selected={true} disabled="disabled">selecciona una opción</option>
                        <option value="Cédula">cédula</option>
                        <option value="Pasaporte">Pasaporte</option>
                    </select>
                    {/* info.idType?.length > 0 && info.idType?.length < 2?
                    <p style={{color:"red"}}  > </p>: */}
                    {
                    formInfoErr.idType? <p style={{color:"red"}} > {formInfoErr.idType.message} </p>:
                    null
                }
                </div>

                <div>
                    <label >No.Identificación</label>
                    <input type="text" name="idNum"  className='form-control' onChange={changeHandler} />
                    {info.idNum?.length > 0 && info.idNum?.length < 6?
                    <p style={{color:"red"}}  >numero de identificación debe de tener 6 o mas letras o números</p>:
                    formInfoErr.idNum? <p style={{color:"red"}} > {formInfoErr.idNum.message} </p>:
                    null
                }
                </div>

                <div>
                    <label htmlFor="">RNC(opcional)</label>
                    <input type="text" name="rnc" className='form-control' onChange={changeHandler}/>
                    {info.rnc?.length > 0 && info.rnc?.length < 9?
                    <p style={{color:"red"}}  >RNC debe de tener por lo menos 9 letras o numeros</p>:
                    formInfoErr.rnc? <p style={{color:"red"}} > {formInfoErr.rnc.message} </p>:
                    null
                }
                </div>

                <div>
                    <label >Numero telefónico personal</label>
                    <input type="text" name="pNumber"  className='form-control' onChange={changeHandler} />
                    {info.pNumber?.length > 0 && info.pNumber?.length < 10?
                    <p style={{color:"red"}}  >numero de teléfono debe de tener al menos 10 números</p>:
                    formInfoErr.pNumber? <p style={{color:"red"}} > {formInfoErr.pNumber.message} </p>:
                    null
                }
                </div>
                <div>
                    <label >Dirección Personal</label>
                    <input type="text" name="address"  className='form-control' onChange={changeHandler} />
                    {info.address?.length > 0 && info.address?.length < 5?
                    <p style={{color:"red"}}  >dirección Personal debe de tener por lo menos 5 letras o números</p>:
                    formInfoErr.address? <p style={{color:"red"}} > {formInfoErr.address.message} </p>:
                    null
                }
                </div>
                <div>
                    <label >lugar de trabajo</label>
                    <input type="text" name="workPlace"  className='form-control' onChange={changeHandler} />
                    {info.workPlace?.length > 0 && info.workPlace?.length < 2?
                    <p style={{color:"red"}}  >lugar de trabajo debe de tener por lo menos 2 letras o números</p>:
                    formInfoErr.workPlace? <p style={{color:"red"}} > {formInfoErr.workPlace.message} </p>:
                    null
                }
                </div>
                <div>
                    <label >ocupación</label>
                    <input type="text" name="occupation"  className='form-control' onChange={changeHandler} />
                    {info.occupation?.length > 0 && info.occupation?.length < 2?
                    <p style={{color:"red"}}  >ocupación de tener por lo menos 2 letras </p>:
                    formInfoErr.occupation? <p style={{color:"red"}} > {formInfoErr.occupation.message} </p>:
                    null
                }
                </div>
                <div>
                    <label >Ingresos</label>
                    <input type="number" name="income" step={0.01} className='form-control' onChange={changeHandler} />
                    {
                    formInfoErr.income? <p style={{color:"red"}} > {formInfoErr.income.message} </p>:
                    null
                }
                </div>
                <div>
                    <label >Otros Ingresos</label>
                    <input type="number" name="otherIncome" step={0.01} className='form-control' onChange={changeHandler} />
                    {
                    formInfoErr.otherIncome? <p style={{color:"red"}} > {formInfoErr.otherIncome.message} </p>:
                    null
                }
                </div>
                <div>
                    <label >Numero telefónico De Trabajo</label>
                    <input type="text" name="workPNumber"  className='form-control' onChange={changeHandler} />{info.workPNumber?.length > 0 && info.workPNumber?.length < 10?
                    <p style={{color:"red"}}  > tiempo laborando debe de tener por lo menos 10 números</p>:
                    formInfoErr.workPNumber? <p style={{color:"red"}} > {formInfoErr.workPNumber.message} </p>:
                    null
                }
                </div>
                <div>
                    <label >Tiempo Laborando</label>
                    <input type="text" name="workingYears"  className='form-control' onChange={changeHandler} />{info.workingYears?.length > 0 && info.workingYears?.length < 2?
                    <p style={{color:"red"}}  > tiempo laborando debe de tener por lo menos 2 letras o números</p>:
                    formInfoErr.workingYears? <p style={{color:"red"}} > {formInfoErr.workingYears.message} </p>:
                    null
                }
                </div>
                <div>
                    <label >Dirección de Trabajo</label>
                    <input type="text" name="workAddress"  className='form-control' onChange={changeHandler} />{info.workAddress?.length > 0 && info.workAddress?.length < 2?
                    <p style={{color:"red"}}  > Direction de trabajo debe de tener por lo menos 2 letras o números</p>:
                    formInfoErr.workAddress? <p style={{color:"red"}} > {formInfoErr.workAddress.message} </p>:
                    null
                }
                </div>
                <button className='btn btn-success' > agregar cliente </button>
                </form>
        </div>
    );
    };


export default ClientForm;