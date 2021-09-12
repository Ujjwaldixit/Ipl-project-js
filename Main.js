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


