import {useEffect, useState} from "react";
import { useParams,useNavigate, Link } from "react-router-dom"; 
import axios from "axios";
import UndoPayment from "./UndoPayment";
import Print from "../Print";
import Select from "react-select"

const OneLoan =()=>{
    const {id} = useParams()
    const navigate = useNavigate()
    const [user,setUser] = useState({})
    const [loan,setLoan] = useState({})
    const [payments,setPayments] =useState([])
    const [selected, setSelected] = useState();
    const [loanValues,setLoanValues] = useState({})
    const [toPrint,setToPrint] = useState({})
    const [loadToPrint,setLoadToPrint] = useState(false)
    const [ totalPaid,setTotalPaid]= useState({})
    // console.log("this is total;",loan?.total - 4066.8510823902325)

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

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/Loan/${id}`)
        .then(res =>{
            console.log("loan result", res)
            setLoan(res.data.results)
            setPayments(res.data.results.payments)
        }).catch(err=>{ 
            console.log("error",err)
        })
    },[totalPaid])

    const  numberWithCommas  = (x)=>{
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    
    const changeHandler=(e)=>{
        setSelected(e.target.value)
    }


    const submitHandler=(e,payment_id)=>{
        e.preventDefault()
        axios.put(`http://localhost:8000/api/Loan/update/status/${id}/${payment_id}`)//
        .then(res =>{
            axios.put(`http://localhost:8000/api/Loan/update/totalPaid/${id}/${loanValues?.totalPayment}`)
            .then(res =>{
                console.log("this is the result",res)
            }).catch(err=>{
                console.log("there was an error",err)
            })
            console.log(res)
        }).catch(err=>{ 
            console.log("error",err)
        })
    }

    useEffect(()=>{
        let totalPayment = parseFloat(loanValues?.totalPayment)
        let totalPaid = parseFloat(loan?.totalPaid) 
        let sum = totalPaid + totalPayment
        let bonus // for later
        let balance = loan?.total - sum   
        // if(balance <= 0 || balance <= 0.00){
        //     balance = 0
        // }

        console.log("totalPayment here ",totalPayment)
        console.log("totalPaid here ",totalPaid)
        console.log("total paid here ",sum)
            setTotalPaid(
                {
                    balance: numberWithCommas(balance.toFixed(2)),
                    sum
                }
            )
    },[loanValues?.totalPayment,loan?.totalPaid])
    // console.log("total paid here ",loanValues?.totalPayment)
    // console.log("total paid here ", parseFloat(loan?.totalPaid) + parseFloat(loanValues?.totalPayment))
    console.log("total paid here ",totalPaid)

    const calculation =(num)=>{ 
        let totalPayment = 0// principal payment
        let totalCapital = 0// capital payment
        let totalInterest = 0// interest payment
        

        const filteredPayments = payments?.filter(p => p._id <= num && p.isPaid == false);

        filteredPayments?.forEach(item =>{
            totalPayment += parseFloat(item.principalPayment)
            totalCapital += parseFloat(item.capitalPayment)
            totalInterest += parseFloat(item.interestPayment)

        })
        setLoanValues({
            totalPayment:parseFloat(totalPayment),
            totalCapital:parseFloat(totalCapital),
            totalInterest:parseFloat(totalInterest),  
            // balance:parseFloat(balance.toFixed(2)),
        })
        setToPrint({
                loanValues: {
                    totalPayment:numberWithCommas(parseFloat(totalPayment).toFixed(2)),
                    totalCapital:numberWithCommas(parseFloat(totalCapital).toFixed(2)),
                    totalInterest:numberWithCommas(parseFloat(totalInterest).toFixed(2)),
                    // balance:parseFloat(balance.toFixed(2)),

                },
                loan: loan,
            })
            
    }

    console.log("this is to Print",toPrint)


    const handleSelect =()=>{
        return <div>
                <select className="form-control"  onChange={(e) => { changeHandler(e);calculation(e.target.value); }} name="_id" >
                    <option >seleccionar cuota/s</option>
                        {payments?.filter((p) => p.isPaid == false).map((p, idx) => {
                            return (<option value={p._id} key={idx} >{`${p?._id}| ${p?.paymentDate} |${numberWithCommas( p?.principalPayment.toFixed(2))}`}
                    </option>);})}
                </select>
                {
                selected == undefined || selected == null || selected=="seleccionar cuota/s"? null:
                        loanValues === undefined || loanValues === null || loanValues == "{}"?
                        null:
                        <table>
                            <tr>
                                <th>Total:{loanValues?.totalPayment === null ||loanValues?.totalPayment === undefined?null: numberWithCommas(loanValues?.totalPayment.toFixed(2))}</th>
                                <th>capital:{loanValues?.totalCapital === null ||loanValues?.totalCapital === undefined?null: numberWithCommas(loanValues?.totalCapital.toFixed(2))}</th>
                                <th>interés:{loanValues?.totalInterest === null ||loanValues?.totalInterest === undefined? null: numberWithCommas(loanValues?.totalInterest.toFixed(2))}</th>
                                <th>mora : 0.00 by default change it later</th>
                            </tr>
                        </table>
                }

                {
                    selected == undefined || selected == null || selected=="seleccionar cuota/s"? null:
                    loanValues === undefined || loanValues === null || loanValues == "{}"?
                    null:
                    <button className="btn btn-success mt-3" onClick={() => setLoadToPrint(true)}>pagar</button>

                }


    </div>
    }

    


    const renderToPrint=(render)=>{
        if(render == true){
            return <Print info={toPrint} payment_id={selected} totalPaid={totalPaid} />
        }else return null
    }
    
    {/* <div className="d-flex  justify-content-between align-middle " style={{width:"400px",border:"solid 1px black"}}>
    <h5>total a pagar: {loan?.total? numberWithCommas(loan.total.toFixed(2)):null}</h5>
    <h5>total capital: {loan?.totalCapital? numberWithCommas(loan.totalCapital.toFixed(2)):null}</h5>
    </div> */}

    const  ZeroPaddedInput=(number)=> {
        let newNumber = ""
        if (number < 10) {
            newNumber = `00${number}`;
        } else {
            newNumber = `0${number}`;
        }
        return newNumber
        };


    return(
        
        <div>
        {renderToPrint(loadToPrint)}
            <div>
                <Link to="/Dashboard" className="btn btn-success" >todos los clientes</Link>
                <Link to="/Prestamos" className="btn btn-primary" >todos los prestamos</Link>
                <UndoPayment id={id} payments={payments} />

            </div>
            <h1>comprobante fiscal
                and input   represents the number  
                and bellow a select with consumidor final 
                and factura valida para crédito fiscal 
                the value is the number 
            </h1>

            <h1>{loan?.client_id?.fullName}</h1>

            <div>
                <h4> # préstamo: {ZeroPaddedInput(loan?.loanIdNumber)}</h4>


            <form onSubmit={e=>submitHandler(e,selected)}>
                {handleSelect()}
            </form>

            <div>
                        <p className=" text-danger">todo now </p>
                        <p>1 sent client and payment  info and print</p>
                <h1>todo</h1>
                <ul>
                    <li> add a late fee</li>
                    <li>make a function that adds a lateness fee 10 after five days of not paying  the standart is a 10% of the cuota but try to fine a way that that number can be change  </li>
                    <li>use moddals to aplay bonuse by getting the curent payment and rest the number inpute and the number can t be mor thant the couta</li>
                    <li>add a calculator that automatically add the sume of the total that need to be pay( if more than one cuota is selected )  and allows the user to to input a number and  and return the amount of money that the user need to give back </li>
                    <li>make a history with al the payments that have been made </li>
                    <li>add a fully pay field  or a active field to the loans if it is tru then the loan does not show up </li>

                    <li>to make the laste loans pass in todays date  from the moment that that the webe site is accese pass it as a prorp or you can yus get the date in the late loans component(yet to be made ) and compair  it agais the dates of all the loans and  return the loans that are == to todays date or  and also if the loans are over due also show them and add the late nes to the ccouta payment  </li>

                </ul>
                </div>
                </div>
        </div>
    )
                    }
export default OneLoan;












                           {/* <div className="alert alert-warning alert-dismissible fade show" role="alert">
                 <strong>Holy guacamole!</strong> You should check in on some of those fields below.
                 <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                 <span  aria-hidden="true">&times;</span>
                 </button>
             </div>\ */}
             {/* <button type="button" class="close" data-dismiss="alert" aria-label="Close">
  <span aria-hidden="true">&times;</span>
</button> */}















{/* <div className='"row justify-content-center"' >
<div className='col-auto'>
<table className='table table-responsive ' style={{width:"75%"}}>
<thead className='text-center'>
<tr >
<th >fecha de pago</th>
<th >#cuota</th>
<th >Pago a interés</th>
<th >Pago a capital</th>
<th>cuota</th>
<th  >Balance</th>
</tr>
</thead>
<tbody className='text-center'>
{payments.map((payment, index) => (
<tr key={index}>
<td>{payment.paymentDates}</td>
<td>{payment.paymentNumber}</td>
<td>{numberWithCommas(payment.interestPayment.toFixed(2))}</td>
<td>{numberWithCommas(payment.capitalPayment.toFixed(2))}</td> 
<td>{numberWithCommas(payment.principalPayment.toFixed(2))}</td>
<td>{numberWithCommas(payment.balance.toFixed(2))}</td> 
</tr>
))}
</tbody>
<tfoot className='text-center' >
<tr>
<td>Total</td>

<td>{numberWithCommas(total.toFixed(2))}</td>
<td>{numberWithCommas(totalInterest.toFixed(2))}</td>
<td></td>
<td>{numberWithCommas(totalPrincipal.toFixed(2))}</td>
<td></td>
</tr>
</tfoot>
</table> */}


