import {useEffect,useState , } from 'react';
import { Link,useNavigate} from 'react-router-dom';
import axios from 'axios';


const DashBoard = () => {
    const [user,setUser] = useState({})
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



    return (
        <div>
            {/* <Link to="/"><button className=' btn btn-secondary text-white'>volver a iniciar sesión</button> </Link> */}
            <h1>hola {user.nombre} ya iniciaste sesión</h1>
            <button className='btn btn-warning' onClick={logout}  > salir </button>

        </div>
    );
};



export default DashBoard;