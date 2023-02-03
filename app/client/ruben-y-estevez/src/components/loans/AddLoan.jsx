import {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddLoan = (props) => {
    const navigate = useNavigate()
    const [info,setInfo] = useState({})
    const [formInfoErr,setFormInfoErr] = useState({})
    const [user,setUser] = useState({})
    const [person,setPerson] = useState([])
    const [clientName,setName] =useState()
    const [clientLName,setClientLName] =useState()
    const [clientId,setClientId] = useState()

//     axios.get(`http://localhost:8000/api/People/${info.name}/}`)
//     .then(res =>{
//         console.log("this is the result",res)
//         setPerson(res.data.results)
//     }).catch(err =>{
//     console.log(err)
// })

    useEffect(()=>{
        axios.get("http://localhost:8000/api/User/loggedUser",{withCredentials:true})
            .then(res=>{
                axios.get("http://localhost:8000/api/People")
                    .then(res =>{
                        console.log("this is the result",res)
                        setPerson(res.data.results)
                    }).catch(err =>{
                    console.log(err)
                })
            if(res.data.result){
                setUser(res.data.result)
            }
            }).catch(
                err=>{console.log("error",err) 
            navigate("/")
                })
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
        axios.post("http://localhost:8000/api/loan/new", info )
        .then(res =>{
            console.log(res)
            if(res.data.err?.errors){
                setFormInfoErr(res.data.err.errors)
            }else{
                setFormInfoErr()
                navigate("/Prestamos") //change this to 
            }
        }).catch(
            err =>{console.log("there was an error", err)}
        )
    }


    const changeHandler = (e)=>{
        if(e.target.name == "client_id"){
            setInfo({
                ...info,
                client_id: clientId
            })
        }
        setInfo(
            {
            ...info,
            [e.target.name]: e.target.value,
            // client_id: 
            
        })
        return info
    }
    const getByName=(name)=>{
        let split = name.split(" ")
        console.log(split)
        person.filter(p=> p.name == clientName && p.Lname == clientLName).map((a,idx) =>{
            setClientId(a._id)
            return <h1>{a._id}</h1>
        })
    }

    return (
        <div>
            <Link to="/Dashboard"><button className=' btn btn-secondary text-white'>todos los clientes</button> </Link>

            <form className='from-group' onSubmit={submitHandler} >
            <div>
            </div>
                <div>
                    <label >Cliente</label>
                    <select className='form-control' name="clientName"  onChange={e=>{changeHandler(e) ;getByName(e.target.value)}}>
                        <option disabled selected >seleccionar cliente</option>
                        {
                            person.map((p,idx)=>{
                                // <input  type="text" name="client_id" value={p._id} onChange={changeHandler}/>
                                    return <option key={p._id} value={`${p.name} ${p.Lname}`}>{p.name} {p.Lname}</option>
                            })
                        }
                    </select>
                    {info.clientName?.length > 0 && info.clientName?.length < 2?
                    <p style={{color:"red"}}  >nombre debe de ser por lo menos 2 letras</p>:
                    formInfoErr.clientName? <p style={{color:"red"}} > {formInfoErr.clientName.message} </p>:
                    null
                }
                </div>

                <div>
                    <label >fecha</label>
                    <input type="date" name="dateAdded"  className='form-control' onChange={changeHandler}/>
                    {info.dateAdded?.length > 0 && info.dateAdded?.length < 2?
                    <p style={{color:"red"}} >debes de agregar el dia que el préstamo fue echo</p>:
                    formInfoErr.dateAdded? <p style={{color:"red"}} > {formInfoErr.dateAdded.message} </p>:
                    null
                }
                </div>

                <div>
                    <label>Monto prestado</label>
                    <input type="number" name="loanAmount"  className='form-control' onChange={changeHandler}/>
                    {/* {info.loanAmount?.length > 0 && info?.loanAmount >= 100.00?
                    <p style={{color:"red"}}  >Monto debe de ser de por lo menos 100.00 pesos</p>: */}
                    {formInfoErr.loanAmount? <p style={{color:"red"}} > {formInfoErr.loanAmount.message} </p>:
                    null
                }
                </div>

                <div>
                    <label>Tasa/Interés</label>
                    <input type="number" name="interest"  className='form-control' onChange={changeHandler} />
                    { info.interest?.length > 0 && info?.interest < 0?
                    <p style={{color:"red"}}  >debes de poner la tasa de interés</p>:
                    formInfoErr.interest? <p style={{color:"red"}} > {formInfoErr.interest.message} </p>:
                    null
                }
                </div>

                <div>
                    <label >cuotas</label>
                    <input type="number" name="cuotasNumber" className='form-control'  onChange={changeHandler} />
                    {
                    formInfoErr.cuotasNumber? <p style={{color:"red"}} > {formInfoErr.cuotasNumber.message} </p>:
                    null
                }
                </div>

                <div>
                    <label >Tipo</label>
                    <select type="text" name="timeType"  className='form-control' onChange={changeHandler}>
                        <option selected disabled value="">seleccionara tipo</option>
                        <option  value="Semanal">Semanal</option>
                        <option  value="Quincenal">Quincenal</option>
                        <option  value="Mensual">Mensual</option>
                        <option  value="Anual">Anual</option>
                    </select>
                    {info.idNum?.length > 0 && info.idNum?.length < 6?
                    <p style={{color:"red"}}  >numero de identificación debe de tener 6 o mas letras o números</p>:
                    formInfoErr.idNum? <p style={{color:"red"}} > {formInfoErr.idNum.message} </p>:
                    null
                }
                </div>
                <button className='btn btn-success' > agregar cliente </button>
                </form>
        </div>
    );
    };


export default AddLoan;