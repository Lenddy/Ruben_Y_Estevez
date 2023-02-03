import {useEffect,useState , } from 'react';
import { Link,useNavigate} from 'react-router-dom';
import ConfirmDelete from './ConfirmDelete';
import axios from 'axios';



const DashBoard = (props) => {
    const [user,setUser] = useState({})
    const [person,setPerson] = useState([])
    const navigate = useNavigate()

    const onload =()=>{
        axios.get("http://localhost:8000/api/People",{withCredentials:true}) //
        .then(res =>{
            console.log("this is the result",res)
            setPerson(res.data.results)
        }).catch(err =>{
            console.log(err)
        })
    }
    
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
    },[props.refresh])//when i put the state person it keep re rendering 


    return (
        <div>
            <h1>make all this information into tabs when you learn material ui</h1>
            <p className='text-primary' > add a field or sub field with then loan request form </p>
            <Link to="/nuevo/cliente"><button className=' btn btn-secondary text-white'>agregar cliente</button> </Link>
            <Link to="/Prestamos"><button className=' btn btn-secondary text-white'>Prestamos</button> </Link>
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
                            <div className="d-inline-flex p-2 bd-highlight " key={p._id}>
                            <div className="card  " style={{width: "18rem"}}>
                                <img className="card-img-top " src="https://media.istockphoto.com/id/1209654046/vector/user-avatar-profile-icon-black-vector-illustration.jpg?s=612x612&w=0&k=20&c=EOYXACjtZmZQ5IsZ0UUp1iNmZ9q2xl1BD1VvN6tZ2UI=" alt="client picture"/>
                                <div className="card-body">
                                <h5 className="card-title">{p.name} {p.Lname}  </h5>
                                <p>{p.idType}: {p.idNum}</p>
                                <p>Teléfono: {p.pNumber}</p>  
                            <div>
                            <hr/>
                            <Link to={`/${p._id}`} className='btn btn-success card-text'>ver</Link> 
                            |<Link to={`/editar/cliente/${p._id}`} className='btn btn-primary'>Editar Cliente</Link>
                            |<ConfirmDelete id={p._id} reload={onload} name={p.name} /> 
                            </div>

                                </div>
                            </div>
                        </div>

                        )
                    })
                }
            </div>
        </div>
    );
};



export default DashBoard;

