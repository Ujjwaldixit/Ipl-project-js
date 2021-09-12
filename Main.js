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

getMatchesData();
setTimeout(function(){
   //console.log(matches[1]);
   findTotalMatchesPlayedPerCity(matches);
},1000);


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


