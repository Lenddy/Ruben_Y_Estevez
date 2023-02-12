import {useEffect, useState} from "react";
import { useParams,useNavigate, Link } from "react-router-dom";
import axios from "axios";
import {Button,Modal, Table} from 'react-bootstrap';
import AddLoan from "./AddLoan";
import LoanInformation from './LoanInformation';

const ConfirmLoan = (props) => {
    const {formInfo,id,date,Amount,int,cuotas,type} = props
    const navigate = useNavigate()
    // const [loan,setLoan] = useState({})
    const [client,setClient] = useState({})
    const [show, setShow] = useState(false);
	const [allCuotas,setAllCuotas] = useState({})
    const [formInfoErr,setFormInfoErr] = useState({})
    const [info,setInfo] = useState({})

    // console.log("is here",info)
    // formInfo.loanAmount,formInfo.interest,formInfo.cuotasNumber,formInfo.cuotasNumber,formInfo.dateAdded,formInfo.timeType)
    useEffect(() => {
        setInfo({...formInfo, ...calculateLoanAndDates(Amount, int, cuotas, cuotas, date, type),...allCuotas})
        oneClient(id)
        console.log("this is the info inside of the use effect ",info)
    }, [Amount, int, cuotas, cuotas, date, type,])

    const oneClient=(id)=>{
        axios.get(`http://localhost:8000/api/People/${id}`)
        .then(res =>{
        console.log(res.data.results)
            setClient(res.data.results)
        }).catch(err=>{ 
            console.log("error",err)
        })
    }
    


    const submitHandler = ()=>{
        axios.post("http://localhost:8000/api/loan/new", info )
        .then(res =>{
            console.log(res)
            if(res.data.err?.errors){
                setFormInfoErr(res.data.err.errors)
            }else{
                setFormInfoErr()
                navigate("/Prestamos") //change this to 
            }
        }).catch(
            err =>{console.log("there was an error", err)}
        )
    }



//! modify this function so that  it give you a 60% pay to interest and a 40% payment and that the payments are a combination of  payment and interest
// const calculateLoanAndDates = (principal, interestRate, term, repetition, startDate, unit) => {
//     let payments = [];
//     let totalInterest = 0;
//     let totalPrincipal = 0;
//     let balance = principal;
//     let interestPayment = 0;
//     let principalPayment = 0;
//     let dates = [];
//     let newDate = new Date(startDate);
//     const constantPayment = principal / term;
  
//     for (let i = 0; i < repetition; i++) {
//       interestPayment = balance * (interestRate / 100 / 12);
//       totalInterest += interestPayment;
//       principalPayment = constantPayment - interestPayment;
//       totalPrincipal += constantPayment;
//       balance = balance - constantPayment;
  
//       payments.push({
//         paymentNumber: i + 1,
//         interestPayment: interestPayment,
//         principalPayment: constantPayment,
//         balance: balance,
//         isPaid: false
//       });
  
//       if (i > 0) {
//         newDate = new Date(dates[i - 1]);
//       }
  
//       if (unit === "week" || unit === "semanal" || unit === "Semanal" || unit === "SEMANAL" || unit === 7) {
//         newDate.setDate(newDate.getDate() + 7);
//       } else if (unit === "15 days" || unit === "quincenal" || unit === "Quincenal" || unit === "QUINCENAL" || unit === 15) {
//         newDate.setDate(newDate.getDate() + 15);
//       } else if (unit === "month" || unit === "mensual" || unit === "Mensual" || unit === "MENSUAL" || unit === 30 || unit === 31) {
//         newDate.setMonth(newDate.getMonth() + 1);
//       }
  
//       let year = newDate.getFullYear();
//       let month = newDate.getMonth() + 1;
//       let day = newDate.getDate();
  
//       dates.push(
//         year + "/" + (month < 10 ? "0" + month : month) + "/" + (day < 10 ? "0" + day : day)
//       );
//     }
//     setAllCuotas({
//       payments: payments,
//       totalInterest: totalInterest,
//       totalPrincipal: totalPrincipal,
//       dates: dates
//     });
//     console.log({
//       payments: payments,
//       totalInterest: totalInterest,
//       totalPrincipal: totalPrincipal,
//       dates: dates
//     });
//   };
  


  //! gives a stedy  of payment rate but low 
const calculateLoanAndDates = (principal, interestRate, term, repetition, startDate, unit) => {
    let payments = [];
    let totalInterest = 0;
    let totalPrincipal = 0;
    let totalPrincipalPayment = 0
    let balance = principal;
    let interestPayment = 0;
    let principalPayment = 0;
    let dates = [];
    
    let newDate = new Date(startDate);
    const constantPayment = principal / term;
  
    for (let i = 0; i < repetition; i++) {

        if (unit === "week" || unit === "semanal" || unit === "Semanal" || unit === "SEMANAL" || unit === 7) {
            interestPayment = balance * (interestRate / 100 / 5.5);
          } else if (unit === "15 days" || unit === "quincenal" || unit === "Quincenal" || unit === "QUINCENAL" || unit === 15) {
            interestPayment = balance * (interestRate / 100 / 5.5);
          } else if (unit === "month" || unit === "mensual" || unit === "Mensual" || unit === "MENSUAL" || unit === 30 || unit === 31) {
            interestPayment = balance * (interestRate / 100 / 2.75);
          }
      // interestPayment = balance * (interestRate / 100 )*(repetition/12);
      totalInterest += interestPayment;
      principalPayment = constantPayment - interestPayment;  
      console.log("1 this is the constant payment  ",constantPayment)
      console.log("2 this is the INTEREST payment  ",interestPayment)
      console.log("3 in line 142 my guy ",principalPayment);
    totalPrincipalPayment += principalPayment
      totalPrincipal += constantPayment;
      balance = balance - constantPayment;  
      payments.push({
        paymentNumber: i + 1,
        interestPayment: interestPayment,
        capitalPayment:principalPayment,
        principalPayment: constantPayment,
        balance: balance,
        isPaid: false
      });
  
      if (i > 0) {
        newDate = new Date(dates[i - 1]);
      }
  
      if (unit === "week" || unit === "semanal" || unit === "Semanal" || unit === "SEMANAL" || unit === 7) {
        newDate.setDate(newDate.getDate() + 7);
      } else if (unit === "15 days" || unit === "quincenal" || unit === "Quincenal" || unit === "QUINCENAL" || unit === 15) {
        newDate.setDate(newDate.getDate() + 15);
      } else if (unit === "month" || unit === "mensual" || unit === "Mensual" || unit === "MENSUAL" || unit === 30 || unit === 31) {
        newDate.setMonth(newDate.getMonth() + 1);
      }
  
      let year = newDate.getFullYear();
      let month = newDate.getMonth() + 1;
      let day = newDate.getDate();
  
      dates.push(
        year + "/" + (month < 10 ? "0" + month : month) + "/" + (day < 10 ? "0" + day : day)
      );
    }
    console.log('this is the full total',totalInterest + totalPrincipal)
    let fullTotal =totalInterest + totalPrincipal
    setAllCuotas({
      payments: payments,
      totalInterest: totalInterest,
      totalPrincipal: totalPrincipal,
      total:fullTotal,
      dates: dates
    });
    console.log({
      payments: payments,
      totalInterest: totalInterest,
      totalPrincipal: totalPrincipal,
      total:fullTotal,
      dates: dates
    });
  };
  

    return (
        <div>
        {
          formInfo.client_id !== undefined &&
          formInfo.loanAmount !== undefined &&
          formInfo.dateAdded !== undefined &&
          formInfo.interest !== undefined &&
          formInfo.timeType !== undefined &&
          formInfo.cuotasNumber !== undefined?
          <Button className=" mt-3" onClick={() =>{ setShow(true);oneClient(formInfo.client_id);calculateLoanAndDates(formInfo.loanAmount,formInfo.interest,formInfo.cuotasNumber,formInfo.cuotasNumber,formInfo.dateAdded,formInfo.timeType) ; console.log("this is info when clickig the buton  ",info) } }> {/* */}
          calcular cuotas
        </Button>: null
        }

      <Modal show={show} fullscreen={true} onHide={() => setShow(false)}>
        <Modal.Header  closeButton>
          <Modal.Title  >Deudor/ra : {client.fullName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
    <div>
        {/* Input fields for Principal, Interest Rate, etc */}
      {allCuotas && (
        <LoanInformation
          payments={allCuotas.payments}
          totalInterest={allCuotas.totalInterest}
          totalPrincipal={allCuotas.totalPrincipal}
          dates={allCuotas.dates}
          total={allCuotas.total}
        />
      )}
    </div>
		</Modal.Body>

        <Modal.Footer className="justify-content-center">
         <Button variant="success text-center"  onClick={submitHandler}> 
            confirmar
        </Button>
        <Button variant="danger text-center" onClick={() => setShow(false)}>
            cancelar
        </Button>
        </Modal.Footer>
      </Modal>
            </div>
      )}


export default ConfirmLoan;


      {/* 


    // jsdlkfjslkdjflksdjflksdjlfkjsdlkfjsdlkfjslkdfjlsdkfjklds

    {/* <div className="alert alert-warning alert-dismissible fade show" role="alert">
<strong>Holy guacamole!</strong> You should check in on some of those fields below.
<button type="button" className="close" data-dismiss="alert" aria-label="Close">
<span aria-hidden="true">&times;</span>
</button>
</div> 
                  also create another function  that allow you to input a different amount that is less or == to the amount that particular payment(cuota) is  then  dubstracted (the current payment -(minus) the amount inputed)    <span className='text-primary' > fine a way to store some of the info in arrays  OR/ make a add new loan  api and this loan needs to be attach to only on particular user (one to many)  and fine out  a way to prevent  one a cliente of having more than 1 loan at the time iF you can (I KNOW YOU CAN BIG DADDY)    </span>  </p>

*/}







                          // <p className='text-danger'>interval's  broooooooo</p>
                    


                    // <div>
                    // <p className='text-danger'>idea came into my head to have a flag(boolean) tha sets the a loan to true(or false when tey are done because the loan wont be true or false because i was never created) when is active but set to false when the las 
                    // payment(cuota) is payed  and while this boolean is true trow a erro message  that does not alow one(OR SAYS THE WHILE THEY HAVE AT LEAST ONE CUOTA UN PAYED IN THEIR LAST(CURRENT LOAN) THEY ARE NOT ALOW TO HAVE MORE LOANS )    ALSO FIGRE OUT THE BLACK LISTING  WITH A BOOLEAN()/ ALSO TALK WITH THE PEOPLE ABOUT A FEATURE THAT IF THEY ARE IN A GREEN LIST( ORE TRUSTED LIST ) THEY ARE ALOW TO HAVE ONE FEATURE (LIKE PAY LEST MONEY  OR SOMETHING LIKE THAT )   </p>
                    // </div>
                  