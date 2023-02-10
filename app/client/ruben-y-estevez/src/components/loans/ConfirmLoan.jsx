import {useEffect, useState} from "react";
import { useParams,useNavigate, Link } from "react-router-dom";
import axios from "axios";
import {Button,Modal} from 'react-bootstrap';
import moment from 'moment';

const ConfirmLoan = (props) => {
    const {formInfo} = props
    const navigate = useNavigate()
    const [loan,setLoan] = useState({})
    const [client,setClient] = useState({})
    const [show, setShow] = useState(false);
// console.log(formInfo.dateAdded)
  const oneClient=(id)=>{
        axios.get(`http://localhost:8000/api/People/${id}`)
        .then(res =>{
          console.log(res.data.results)
            setClient(res.data.results)
        }).catch(err=>{ 
            console.log("error",err)
        })
      }


// let  dates = [];
// const start = moment("2018-11-10");
// const end = moment("2018-11-24");

// while(!start.isSame(end)) {
//   dates.push(start.format("Do MMM YYYY"));
//   start.add(1, 'day');
// }

// console.log(dates);

// console.log(moment(formInfo.dateAdded).format("DD/MM/Y"))
console.log(moment(formInfo.dateAdded).daysInMonth()) ///to get the duration in the month  //* the length of the month

const weekly = 7
const byWeekly = 15
const monthly = 30
const repeat = 13

const dates =(time,again)=>{
    let allDate=[];
    let day = moment(formInfo.dateAdded).format("DD")
    console.log(day)
    let month = moment(formInfo.dateAdded).format("MM")
    console.log(month)
    let year = moment(formInfo.dateAdded).format("Y")
    console.log(year)
    for(let i = again; i > 0 ; i--){
        if(time == time){
            day += time
            if(day > 31){
                day -= 31
                month += 1
                if( month == 13 ){
                    month = 1
                    year += 1
                    allDate.push(`${day}/${month}/${year}`) //date format dd/mm/year
                }else{
                    allDate.push(`${day}/${month}/${year}`) //date format dd/mm/year
                }}else{
                allDate.push(`${day}/${month}/${year}`) //date format dd/mm/year
                }
            }
        }
    // console.log(allDate)
}

console.log(dates(weekly,repeat))

      // ||formInfo.client_id !== null && 
      // ||formInfo.loanAmount !== null &&
      // ||formInfo.dateAdded !== null &&
      // ||formInfo.interest !== null &&
      // ||formInfo.timeType !== null &&
      // ||formInfo.cuotasNumber !== null

      // fine out the length of the month
    // make a function that takes the the date selectet (the curent day(day only ) ), and if it going to change every (week 7days, 15 days, 30 days, or 365)
    // and make a loop that if it is every week loops 7 times  you kow the other things and picks the next days every so oftesn
    // and gives a select every soo oftedn 

    // for(day give the days ){
    //   and make an array 
    //   with the days and 

    //   add them to a select option later

    // }

    // jsdlkfjslkdjflksdjflksdjlfkjsdlkfjsdlkfjslkdfjlsdkfjklds

    {/* <div className="alert alert-warning alert-dismissible fade show" role="alert">
<strong>Holy guacamole!</strong> You should check in on some of those fields below.
<button type="button" className="close" data-dismiss="alert" aria-label="Close">
<span aria-hidden="true">&times;</span>
</button>
</div> */}


    return (
        <div>
        {
          formInfo.client_id !== undefined &&
          formInfo.loanAmount !== undefined &&
          formInfo.dateAdded !== undefined &&
          formInfo.interest !== undefined &&
          formInfo.timeType !== undefined &&
          formInfo.cuotasNumber !== undefined?<Button className=" mt-3" onClick={() =>{ setShow(true);oneClient(formInfo.client_id) } }>  {/* key={idx} */}
          calcular cuotas
        </Button>: null
        }



      <Modal show={show} fullscreen={true} onHide={() => setShow(false)}>
        <Modal.Header  closeButton>
          <Modal.Title  >Deudor : {client.fullName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Modal body content</Modal.Body>
        <Modal.Footer className="justify-content-center">
         <Button variant="success text-center" > {/*onClick={()=>{deleteHandler(id) */}
            confirmar
        </Button>
        <Button variant="danger text-center" onClick={() => setShow(false)}>
            cancelar
        </Button>
        </Modal.Footer>
      </Modal>

      {/* <h1>{loan?.client_id?.name}</h1> */}
            </div>
    );
};



                    // <p className='text-danger'>interval's  broooooooo</p>
                    
                    // <p className='text-danger'> create a function that takes  2 parameters one the day  and one the amount of time (weekly = +7, 15days = + 15 , monthly = 31(change this one to fit the amount of time on how long the month is edge case ))   then   ether create another function that has the Logic to count the amount of money that they need to  pay add a parameter that says if they haven't pay by the day(date that was set )  time(weekly = +7, 15days = + 15 , monthly = 31) then the amount raises multiply by the interest () also create another function  that allow you to input a different amount that is less or == to the amount that particular payment(cuota) is  then  dubstracted (the current payment -(minus) the amount inputed)    <span className='text-primary' > fine a way to store some of the info in arrays  OR/ make a add new loan  api and this loan needs to be attach to only on particular user (one to many)  and fine out  a way to prevent  one a cliente of having more than 1 loan at the time iF you can (I KNOW YOU CAN BIG DADDY)    </span>  </p>

                    // <div>
                    // <p className='text-danger'>idea came into my head to have a flag(boolean) tha sets the a loan to true(or false when tey are done because the loan wont be true or false because i was never created) when is active but set to false when the las 
                    // payment(cuota) is payed  and while this boolean is true trow a erro message  that does not alow one(OR SAYS THE WHILE THEY HAVE AT LEAST ONE CUOTA UN PAYED IN THEIR LAST(CURRENT LOAN) THEY ARE NOT ALOW TO HAVE MORE LOANS )    ALSO FIGRE OUT THE BLACK LISTING  WITH A BOOLEAN()/ ALSO TALK WITH THE PEOPLE ABOUT A FEATURE THAT IF THEY ARE IN A GREEN LIST( ORE TRUSTED LIST ) THEY ARE ALOW TO HAVE ONE FEATURE (LIKE PAY LEST MONEY  OR SOMETHING LIKE THAT )   </p>
                    // </div>

export default ConfirmLoan;



