import {useEffect, useState} from "react";
import { useParams,useNavigate, Link } from "react-router-dom";
import axios from "axios";

const OneLoan =()=>{
    const {id} = useParams()
    const navigate = useNavigate()
    const [loan,setLond] = useState({})
    const [client,setClient] = useState({})
    useEffect(()=>{
        axios.get(`http://localhost:8000/api/Loan/${id}`)
        .then(res =>{
            setLond(res.data.results)
        }).catch(err=>{ 
            console.log("error",err)
        })
    },[])



    return(
        <div>
            <div>
                <Link to="/Dashboard" className="btn btn-primary" >todos los prestamos</Link>
                <Link to="/Prestamos" className="btn btn-primary" >todos los prestamos</Link>
            </div>
            <h1>{loan?.client_id?.name}</h1>

        </div>
    )
}

export default OneLoan;



