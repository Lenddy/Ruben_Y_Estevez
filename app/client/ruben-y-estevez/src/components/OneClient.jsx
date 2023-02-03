import {useState, useEffect} from 'react';
import { useParams,useNavigate, Link } from 'react-router-dom';
import moment from "moment"
import axios from 'axios';
import ConfirmDelete from './ConfirmDelete';


const OneClient = () => {
    const {id} = useParams()
    const [client,setClient] = useState({})
    const [notFound,setNotFound] = useState(false)
    const [loan,setLoan] = useState([])
    const navigate = useNavigate()


    useEffect(()=>{
        axios.get("http://localhost:8000/api/User/loggedUser",{withCredentials:true})
        .then(res=>{
        }).catch(
            err=>{
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
            if(res.data.results){
                setClient(res.data.results)
                }else{
                    setNotFound(true)
                }
        }).catch(
            err => console.log("there is an error",err)
        )
    },[])


    useEffect(()=>{
        axios.get(`http://localhost:8000/api/Loan/People/${id}`)
        .then(res =>{
            console.log("this is the result for then all the loans in one client",res.data)
            setLoan(res.data.results)
        }).catch(
            err=>{console.log("there is an error in th all loans than belong to a user",err)}
        )
    },[])

    return (
        <div>
            <p>make a dropdown menu or find a way to better display the redirects</p>
            <div>
            <Link to={`/DashBoard`} ><button>todos los clientes</button></Link> 
            <button className='btn btn-warning' onClick={logout}> salir </button>
            <Link to={``} ><button>todos los prestamos vacio</button></Link> 
            <Link to={``} ><button>todo los alquileres vacio</button></Link> 
            <Link to={``} ><button>crear un nuevo cliente vacio</button></Link> 
            <Link to={``} ><button>crear una solicitud o alquileres vacio</button></Link> 
            <Link to={``} ><button>crear una solicitud o alquileres vacio</button></Link> 
            <Link to={``} ><button>chat  vacio </button></Link> 
            </div>
            
            <div>
            </div>
            <Link to={`/editar/cliente/${id}`} ><button>editar</button></Link>
            {notFound? <h1 className='text-danger'>hubo un error encontrando a este cliente o el cliente no existe regrese hacia la pagina donde están todos los clientes y inténtelo denuedo</h1>:
            <div>
                <ConfirmDelete id={client._id}  name={client.name}/> 
                <h1>dia creado {moment(client.createAt).format("YYYY/MM/DD")}</h1>
            <h1>Información de {client.name} {client.Lname}</h1>
            <h3>nombre {client.name} </h3>
            <h3>apellido {client.Lname} </h3>
            <h3>dia de nacimiento {moment(client.dob).format("YYYY/MM/DD")}</h3>
            <h3>tipo de identificación {client.idType}</h3>
            <h3>numero de identificación {client.idNum}</h3>
            <h3>numero telefónico personal {client.pNUmber}</h3>
            <h3>dirección personal {client.address}</h3>
            <h3>lugar de trabajo {client.workPlace}</h3>
            <h3>ocupación {client.occupation}</h3>
            <h3>Ingresos {client.income}</h3>
            <h3>Otros Ingresos {client.otherIncome}</h3>
            <h3>Numero Telefónico del Trabajo {client.workPNumber}</h3>
            <h3>Tiempo Trabajando En esta compañía {client.workingYears}</h3>
            <h3>Dirección trabajo {client.workAddress}</h3>
            <h4>prestamos#.{loan.length}</h4>
            {
                loan.map((l,idx)=>{
                    return(
                        <div key={l._id} >
                            <h4>monto préstamo {idx +1}  # {l.loanAmount}</h4>
                        </div>
                    )
                })
            }
            </div>
        }
        </div>
    );
};



export default OneClient;