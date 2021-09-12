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

//getMatchesData();
getDeliveriesData();
setTimeout(function(){
   console.log(deliveries);
  // findTotalMatchesPlayedPerCity(matches);
},3000);


function findTotalMatchesPlayedPerCity(matches)
{
    var totalMatchesPlayedPerCity={};
    console.log(matches.length);   
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


// function findEconomicalBowlersPerRunGivenIn2015()
// {

// }

