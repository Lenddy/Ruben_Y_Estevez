import {useState ,useEffect} from 'react';
import { Link, useNavigate ,useParams} from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import ConfirmDelete from './ConfirmDelete';

const ClientUpdate = () => {
    const navigate = useNavigate()
    const {id} = useParams()
    const [info,setInfo] = useState({})
    const [formInfoErr,setFormInfoErr] = useState({})
    const [notFound, setNotFound] = useState(false)

    
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
    
        useEffect(()=>{
            axios.get(`http://localhost:8000/api/People/${id}`)
            .then( res =>{
                console.log(res)
                setInfo(res.data.results)
            }).catch(
                err => console.log("there is an error",err)
            )
        },[])

    const changeHandler = (e)=>{
        setInfo({
            ...info,
            [e.target.name]: e.target.value
        })
    }

    const submitHandler = (e)=>{
        e.preventDefault()
        axios.put(`http://localhost:8000/api/People/update/${id}`,info  , {withCredentials:true})
        .then(res =>{
            if(res.data.err?.errors){
                setFormInfoErr(res.data.err.errors)
            }else{
                // setFormInfoErr()
                navigate("/DashBoard") //change this to 
            } 
        }).catch(
            err =>{console.log("there was an error", err)}
        )
    }


    return (
        <div>
            <Link to="/Dashboard"><button className=' btn btn-secondary text-white'>todos los clientes</button> </Link>
            <ConfirmDelete id={info._id}/> 
    {notFound? <h1 className='text-danger'>hubo un error encontrando a este cliente o el cliente no existe regrese hacia la pagina donde están todos los clientes y inténtelo de nuevo</h1>:
<form className='from-group' onSubmit={submitHandler} > 
    <div>
        <label >Nombre</label>
        <input type="text" name="name"  className='form-control' onChange={changeHandler} value={info.name} />
        {info.name?.length > 0 && info.name?.length < 2?
        <p style={{color:"red"}}  >nombre debe de ser por lo menos 2 letras</p>:
        formInfoErr.name? <p style={{color:"red"}} > {formInfoErr.name.message} </p>:
        null
    }
    </div>
    <div>
        <label >Apellido</label>
        <input type="text" name="Lname"  className='form-control' onChange={changeHandler} value={info.Lname}/>
        {info.Lname?.length > 0 && info.Lname?.length < 2?
        <p style={{color:"red"}}  >apellido debe de tener por lo menos 2 letras</p>:
        formInfoErr.Lname? <p style={{color:"red"}} > {formInfoErr.Lname.message} </p>:
        null
    }
    </div>
    <div>
        <label >Apodo</label>
        <input type="text" name="nickname"  className='form-control' onChange={changeHandler} value={info.nickname} />
        {info.nickname?.length > 0 && info.nickname?.length < 2?
        <p style={{color:"red"}}  >Apodo debe de tener por lo menos 2 letras</p>:
        formInfoErr.nickname? <p style={{color:"red"}} > {formInfoErr.nickname.message} </p>:
        null
    }
    </div>
    <div>
        <label >Fecha De Nacimiento</label>
        <input type="date" name="dob"  className='form-control' onChange={changeHandler} value={moment(info.dob).format("YYYY-MM-DD")} />
        {/* info.dob?.length > 0 && info.dob?.length < 2?
        <p style={{color:"red"}}  >fecha de nacimiento no puede quedar en blanco</p>: */}
        {
        formInfoErr.dob? <p style={{color:"red"}} > {formInfoErr.dob.message} </p>:
        null
    }
    </div>
    <div>
        <label >tipo de identificación</label>
        <select name="idType" className='form-control'  onChange={changeHandler} value={info.idType}>
            <option  selected={true} disabled="disabled">selecciona una opción</option>
            <option value="cédula">cédula</option>
            <option value="RNC">RNC</option>
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
        <input type="text" name="idNum"  className='form-control' onChange={changeHandler} value={info.idNum}/>
        {info.idNum?.length > 0 && info.idNum?.length < 6?
        <p style={{color:"red"}}  >numero de identificación debe de tener 6 o mas letras o números</p>:
        formInfoErr.idNum? <p style={{color:"red"}} > {formInfoErr.idNum.message} </p>:
        null
    }
    </div>
    <div>
        <label >Numero telefónico personal</label>
        <input type="text" name="pNumber"  className='form-control' onChange={changeHandler} value={info.p}/>
        {info.pNumber?.length > 0 && info.pNumber?.length < 10?
        <p style={{color:"red"}}  >numero de teléfono debe de tener al menos 10 números</p>:
        formInfoErr.pNumber? <p style={{color:"red"}} > {formInfoErr.pNumber.message} </p>:
        null
    }
    </div>
    <div>
        <label >Dirección Personal</label>
        <input type="text" name="address"  className='form-control' onChange={changeHandler} value={info.address}/>
        {info.address?.length > 0 && info.address?.length < 5?
        <p style={{color:"red"}}  >dirección Personal debe de tener por lo menos 5 letras o números</p>:
        formInfoErr.address? <p style={{color:"red"}} > {formInfoErr.address.message} </p>:
        null
    }
    </div>
    <div>
        <label >lugar de trabajo</label>
        <input type="text" name="workPlace"  className='form-control' onChange={changeHandler} value={info.workPlace}/>
        {info.workPlace?.length > 0 && info.workPlace?.length < 2?
        <p style={{color:"red"}}  >lugar de trabajo debe de tener por lo menos 2 letras o números</p>:
        formInfoErr.workPlace? <p style={{color:"red"}} > {formInfoErr.workPlace.message} </p>:
        null
    }
    </div>
    <div>
        <label >ocupación</label>
        <input type="text" name="occupation"  className='form-control' onChange={changeHandler} value={info.occupation}/>
        {info.occupation?.length > 0 && info.occupation?.length < 2?
        <p style={{color:"red"}}  >ocupación de tener por lo menos 2 letras </p>:
        formInfoErr.occupation? <p style={{color:"red"}} > {formInfoErr.occupation.message} </p>:
        null
    }
    </div>
    <div>
        <label >Ingresos</label>
        <input type="text" name="income"  className='form-control' onChange={changeHandler} value={info.income}/>
        {
        formInfoErr.income? <p style={{color:"red"}} > {formInfoErr.income.message} </p>:
        null
    }
    </div>
    <div>
        <label >Otros Ingresos</label>
        <input type="text" name="otherIncome"  className='form-control' onChange={changeHandler}value={info.otherIncome} />
        {
        formInfoErr.otherIncome? <p style={{color:"red"}} > {formInfoErr.otherIncome.message} </p>:
        null
    }
    </div>
    <div>
        <label >Tiempo Laborando</label>
        <input type="text" name="workingYears"  className='form-control' onChange={changeHandler} value={info.workingYears}/>
        {info.workingYears?.length > 0 && info.workingYears?.length < 2?
        <p style={{color:"red"}}  > tiempo laborando debe de tener por lo menos 2 letras o números</p>:
        formInfoErr.workingYears? <p style={{color:"red"}} > {formInfoErr.workingYears.message} </p>:
        null
    }
    </div>
    <div>
        <label >Dirección de Trabajo</label>
        <input type="text" name="workAddress"  className='form-control' onChange={changeHandler} value={info.workAddress}/>
        {info.workAddress?.length > 0 && info.workAddress?.length < 2?
        <p style={{color:"red"}}  > Direction de trabajo debe de tener por lo menos 2 letras o números</p>:
        formInfoErr.workAddress? <p style={{color:"red"}} > {formInfoErr.workAddress.message} </p>:
        null}
    </div>
    <button className='btn btn-success' > agregar cliente </button>
    </form>
    }

        </div>
    );
    };


export default ClientUpdate;







