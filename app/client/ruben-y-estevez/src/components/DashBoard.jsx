import {useEffect,useState , } from 'react';
import { Link,useNavigate} from 'react-router-dom';
import ConfirmDelete from './ConfirmDelete';
import axios from 'axios';



const DashBoard = () => {
    const [user,setUser] = useState({})
    const [person,setPerson] = useState([])
    const navigate = useNavigate()

    
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
    },[])//when i put the state person it keep re rendering 

    return (
        <div>
            <h1>make all this information into tabs when you learn material ui</h1>
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
                                        |<Link to={`/editar/cliente/${p._id}`} ><button className='btn btn-primary' >Editar Cliente</button></Link>
                                        |<ConfirmDelete id={p._id} />
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

    // const deleteHandler = (id)=>{
    //     axios.delete(`http://localhost:8000/api/People/delete/${id}`)
    //     .then(res =>{
    //         console.log(res)
    //         setDeleted(!deleted)
    //     }).catch(err=>console.log(err))
    //     handleClose()
    // }



// {handleShow && <ConfirmDelete/>}


{/* <Button variant="danger" onClick={handleShow}>Borrar Cliente</Button>
<Modal show={show} onHide={handleClose}>
<Modal.Header closeButton>
<Modal.Title>Modal heading</Modal.Title>
</Modal.Header>
<Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
<Modal.Footer>
<Button variant="success" onClick={handleClose}>
    cancelar
</Button>
<Button variant="danger" onClick={()=>deleteHandler(p._id)}>
    confirmar
</Button>
</Modal.Footer>
</Modal> */}