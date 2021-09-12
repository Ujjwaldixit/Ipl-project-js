const csv=require('csvtojson');
const matches=[];

function getMatchesData(){
    let count = 0;

    csv({delimiter:','})
    .fromFile('matches.csv')
    .then((json)=>{
        json.forEach((row)=>
        {   
            count++;
            matches.push(row);
        });
    });
    return matches;
}

const deliveries=[];
function getDeliveriesData(){
    let count = 0;

    csv({delimiter:','})
    .fromFile('deliveries.csv')
    .then((json)=>{
        json.forEach((row)=>
        {   
            count++;
            deliveries.push(row);
        });
        //console.log(deliveries);
    });
    return deliveries;
}

getMatchesData();
getDeliveriesData();
setTimeout(function(){
   console.log(deliveries.length);
  // findTotalMatchesPlayedPerCity(matches);
  findEconomicalBowlersPerRunGivenIn2015(matches,deliveries);
},3000);


function findTotalMatchesPlayedPerCity(matches)
{
    var totalMatchesPlayedPerCity={}; 
    for(var i=0;i<matches.length;i++)
    {
        let city=matches[i].city;
        if(totalMatchesPlayedPerCity.hasOwnProperty(city))
        {
           // console.log("inside if");
            totalMatchesPlayedPerCity[city]=totalMatchesPlayedPerCity[city]+1;
        }
        else{
           // console.log("inside else");
            totalMatchesPlayedPerCity[city]=1;
        }
    }
    console.log(totalMatchesPlayedPerCity);
}


function findEconomicalBowlersPerRunGivenIn2015(matches,deliveries){
    var  bowlerPerRunGiven={};
    const matchID=new Set();
    for(let i=0;i<matches.length;i++)
    {
        var season=matches[i].season;
        if(season==2015)
        {  
            matchID.add(matches[i].id);
        }
    }
    console.log(matchID.size);
    for(let i=0;i<deliveries.length;i++)
    {
        let deliveryId=deliveries[i].match_id;
        if(matchID.has(deliveryId))
        {
            let bowler=deliveries[i].bowler;
            //console.log("b="+bowler);
            if(!bowlerPerRunGiven.hasOwnProperty(bowler))
            {
                bowlerPerRunGiven[bowler]=deliveries[i].total_runs;
            }
            else{
                bowlerPerRunGiven[bowler]= parseInt(bowlerPerRunGiven[bowler])+parseInt(deliveries[i].total_runs);
            }
        }
    }
    console.log(bowlerPerRunGiven);
}



