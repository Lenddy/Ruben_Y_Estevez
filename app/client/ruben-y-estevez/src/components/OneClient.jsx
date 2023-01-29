import {useState, useEffect} from 'react';
import { useParams,useNavigate, Link } from 'react-router-dom';
import moment from "moment"
import axios from 'axios';
import ConfirmDelete from './ConfirmDelete';


const OneClient = () => {
    const {id} = useParams()
    const [client,setClient] = useState({})
    const [notFound,setNotFound] = useState(false)
    const navigate = useNavigate()
    const [deleted,setDeleted] = useState(false)



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
        axios.get(`http://localhost:8000/api/People/${id}`, { withCredentials:true })
        .then( res =>{
            console.log("this is the response",res)
            if(res.data.results){
                setClient(res.data.results)
                }else{
                    setNotFound(true)
                }
        }).catch(
            err => console.log("there is an error",err)
        )
    },[])


    const deleteHandler = (id)=>{
        axios.delete(`http://localhost:8000/api/People/delete/${id}`)
        .then(res =>{
            console.log(res)
            setDeleted(!deleted)
            navigate("/DashBoard")
        }).catch(err=>console.log(err))
    }

    return (
        <div>
            <p>make a dropdown menu or find a way to better display the redirects</p>
            <div>
            <Link to={`/DashBoard`} ><button>todos los clientes</button></Link> 
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
                <ConfirmDelete id={client._id}  /> 
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
            </div>
        }
        </div>
    );
};



export default OneClient;