import { useState , useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import moment from 'moment';


const AllLoans = () => {
    const [loans,setAllLoans] = useState([])



    useEffect(()=>{
        axios.get("http://localhost:8000/api/Loan")
        .then(
            res =>{
                console.log("this is the all loans result",res)
                setAllLoans(res.data.results)
            }
        ).catch(err=>{
            console.log("there can an error on the all loans", err)
        })
    },[])

    return (
        <div>
            <Link to={`/Nuevo/Prestamos`} className='btn btn-success card-text'>Agregar préstamo</Link> 
            <h1>make a feed(carousel) that show the clients than need to pay this day and have other feature  </h1>
            <h1>you might also want to learn the bootstrap alert and colapsa  and drop downs and the nav bar</h1>
                {
                    loans.map((l,idx)=>{
                        return(
                            <div className="d-inline-flex p-2 bd-highlight " key={l._id}>
                                <div className="card  " style={{width: "18rem"}}>
                                    <img className="card-img-top" src="https://media.istockphoto.com/id/1209654046/vector/user-avatar-profile-icon-black-vector-illustration.jpg?s=612x612&w=0&k=20&c=EOYXACjtZmZQ5IsZ0UUp1iNmZ9q2xl1BD1VvN6tZ2UI=" alt="client picture"/>
                                    <div className="card-body">
                                    <h5 className="card-title">{l.clientName}</h5>
                                    <p className="card-text">total prestado: {l.loanAmount}</p>
                                    <p className="card-text">total cuotas:{l.cuotasNumber}</p>
                                    <p className="card-text">dia Agradado: {moment(l.dateAdded).format("d/m/yyyy")}</p>
                                    <Link to={""} className="btn btn-primary">Go somewhere</Link>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }

        </div>
    );
};


export default AllLoans;