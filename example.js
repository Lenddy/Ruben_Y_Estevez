const weekly = 7
const byWeekly = 15
const monthly = 30
const repeat = 13

const dates =(time,again)=>{
    let allDate=[];
    let day = 30
    let month = 7
    let year = 2023
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
    return allDate
}

console.log(dates(weekly,repeat))