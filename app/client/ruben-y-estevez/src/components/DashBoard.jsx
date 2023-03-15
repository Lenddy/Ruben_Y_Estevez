import {useEffect,useState , } from 'react';
import { Link,useNavigate} from 'react-router-dom';
import ConfirmDelete from './ConfirmDelete';
import axios from 'axios';
import moment from 'moment';



const DashBoard = (props) => {
    const [user,setUser] = useState({})
    const [person,setPerson] = useState([])
    const [loan,setLoan] = useState([])
    const navigate = useNavigate()
    
    let interest = (15000 * (14 * 0.01))/13;
    let total = ((15000 /13) + interest);


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
    },[])//when i put the state person it keep re rendering 



/*
things to fix
1. the lateness interest is not being calculated correctly
2. the lateness to pay is not going up every time the function is called ( it stays the same and it should be increasing by the lateness interest every day after 5 days)
3. the day keeps increasint every time the function is call you  to fine a way  to put todays date and keep track of  todays date an previous dates so that the days late in the payment is not updated all the time 
4. dont know if it works but fine out if the number late neness is being updated correctly
5 if the loan is active  the function should run for that loan 
6 fine ount what the fuck is happenin with the dates in the add dates 

! you can use  1.1 to ad a 10 persent lateness interest to the loan
! how bout you use the lateness interest and  use it her for example if the lateness interest is 20 persent then you can use 20/100 to get 0.2 and then you can use 0.2 to multiply the principal payment to get the lateness payment
 */

    const lateness = async (item) => {
        if (!item) {
          return;
        }
      
        const today = moment();
        let paymentDate;
        let paymentId;
        let loanId;
        let latenessPayment;
        let daysLate;
        let totalLatenessPayment;
        let numberLateness;
      
        for (let i = 0; i < item.length; i++) {
          loanId = item[i]._id;
          latenessPayment = 0;
          daysLate = 0;
          totalLatenessPayment = 0;
          numberLateness = 0;
      
          for (let n = 0; n < item[i].payments.length; n++) {
            paymentDate = moment(item[i].payments[n].paymentDate, "YYYY/MM/DD");
      
            if (paymentDate.isBefore(today)) {
              const duration = moment.duration(today.diff(paymentDate));
              const daysDifference = Math.abs(duration.asDays());
      
              if (daysDifference < 5) {
                daysLate += item[i].payments[n].daysLate + 1;
              } else {
                daysLate += item[i].payments[n].daysLate + 1;
                paymentId = item[i].payments[n]._id;
                latenessPayment += item[i].payments[n].principalPayment * (item[i].latenessInterest / 100);
                totalLatenessPayment += latenessPayment;
                numberLateness++;
              }
            }
          }
      
          if (numberLateness > 0) {
            console.log(
              `Updating lateness payment for loan ${loanId} with payment ID ${paymentId}: lateness payment is ${latenessPayment}, days late is ${daysLate}, total lateness payment is ${totalLatenessPayment}, number of lateness is ${numberLateness}`
            );
      
            try {
              const response = await axios.put(
                `http://localhost:8000/api/Loan/update/Lateness/${loanId}/${paymentId}/${latenessPayment}/${daysLate}/${totalLatenessPayment}/${numberLateness}`
              );
              console.log(response.data);
            } catch (error) {
              console.log(error.response.data);
            }
          }
        }
      
        console.log("Finished updating lateness payments");
        return item;
      };
      
  

    useEffect(()=>{
        axios.get("http://localhost:8000/api/Loan")
        .then(
            res=>{
                console.log("this is the result of the loas",res)
                setLoan(res.data.results)
            }
            ).catch(err=>{
                console.log("error:",err)
            });
        },[])
        
        
        



    // console.log(lateness(loan))
    
        console.log("this is the lateness function ",lateness(loan))
    
    
    
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
                                <img className="card-img-top " src="https://media.istockphoto.com/id/1209654046/vector/user-avatar-profile-icon-black-vector-illustration.jpg?s=612x612&w=0&k=20&c=EOYXACjtZmZQ5IsZ0UUp1iNmZ9q2xl1BD1VvN6tZ2UI=" alt="client"/>
                                <div className="card-body">
                                <h5 className="card-title">{p.name} {p.Lname}</h5>
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

