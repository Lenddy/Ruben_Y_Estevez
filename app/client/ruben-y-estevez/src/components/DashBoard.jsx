import {useEffect,useState , } from 'react';
import { Link,useNavigate} from 'react-router-dom';
import ConfirmDelete from './ConfirmDelete';
import axios from 'axios';



const DashBoard = (props) => {
    const [user,setUser] = useState({})
    const [person,setPerson] = useState([])
    const navigate = useNavigate()
    const {component} = props


    useEffect(()=>{
        axios.get("http://localhost:8000/api/User/loggedUser",{withCredentials:true})
        .then(res=>{
            if(res.data.result){
                setUser(res.data.result)
            }
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
        axios.get("http://localhost:8000/api/People",{withCredentials:true}) //
        .then(res =>{
            console.log("this is the result",res)
            setPerson(res.data.results)
        }).catch(err =>{
            console.log(err)
        })
    },[])




    return (
        <div>
            <h1>make all this information into tabs when you learn material ui</h1>

            {/* <Link to="/"><button className=' btn btn-secondary text-white'>volver a iniciar sesión</button> </Link> */}
            <Link to="/nuevo/cliente"><button className=' btn btn-secondary text-white'>agregar cliente</button> </Link>
            <h1>hola {user.nombre} ya iniciaste sesión</h1>
            <button className='btn btn-warning' onClick={logout}> salir </button>
            <div>
                <h1>todas los clientes</h1>
                {
                    person.length === 0?
                    <div> <p className='text-danger' > no hay clientes todavía agrega uno nuevo</p>
                    <Link to="/nuevo/cliente"><button className=' btn btn-secondary text-white'>agregar nuevo cliente</button> </Link>
                    </div>:
                    person.map((p,idx)=>{
                        return (
                                    <div key={p._id}>
                                        <p>Nombre/Apellido: {p.name} {p.Lname}  </p>
                                        <p>tipo/identificación : {p.idType}</p>
                                        <p>No./identificación : {p.idNum}</p> 
                                        <p>Teléfono: {p.pNumber}</p> 
                                        <p>Acciones :  some action </p> 
                                        <div>
                                        <Link to={`/${p._id}`} ><button className='btn btn-success' >ver</button></Link> 
                                        | <Link to={`/editar/cliente/${p._id}`} ><button className='btn btn-primary' >Editar Cliente</button></Link>
                                        |{ <ConfirmDelete id={p._id}/>}
                                        </div>
                                        <hr/>
                                        
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};



export default DashBoard;