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

  findMatchesPlayedPerYear(matches);
  findMatchesWonPerTeam(matches);
  findExtraRunsPerTeamsIn2016(matches,deliveries);
  findEconomicalBowlersPerRunGivenIn2015(matches,deliveries);
  findTotalMatchesPlayedPerCity(matches);
},3000);


function findTotalMatchesPlayedPerCity(match)
{
    var totalMatchesPlayedPerCity={}; 
    for(var i=0;i<match.length;i++)
    {
        let city=match[i].city;
        if(totalMatchesPlayedPerCity.hasOwnProperty(city))
        {
            totalMatchesPlayedPerCity[city]=totalMatchesPlayedPerCity[city]+1;
        }
        else{
            totalMatchesPlayedPerCity[city]=1;
        }
    }
    delete totalMatchesPlayedPerCity[''];
    console.log(totalMatchesPlayedPerCity);
}


function findEconomicalBowlersPerRunGivenIn2015(match,delivery){
    var  bowlerPerRunGiven={};
    const matchID=new Set();
    for(let i=0;i<match.length;i++)
    {
        var season=match[i].season;
        if(season==2015)
        {  
            matchID.add(match[i].id);
        }
    }
   
    for(let i=0;i<delivery.length;i++)
    {
        let deliveryId=delivery[i].match_id;
        if(matchID.has(deliveryId))
        {
            let bowler=delivery[i].bowler;
            if(!bowlerPerRunGiven.hasOwnProperty(bowler))
            {
                bowlerPerRunGiven[bowler]=delivery[i].total_runs;
            }
            else{
                bowlerPerRunGiven[bowler]= parseInt(bowlerPerRunGiven[bowler])+parseInt(delivery[i].total_runs);
            }
        }
    }
    bowlerPerRunGiven = Object.entries(bowlerPerRunGiven)
    .sort(([,a],[,b]) => a-b)
    .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});

    delete bowlerPerRunGiven[''];
    console.log(bowlerPerRunGiven);
}

function findExtraRunsPerTeamsIn2016(match,delivery)
{
    var teamPerExtraRuns={};
    const matchId=new Set();
    for(let i=0; i<match.length; i++)
    {
        let season=match[i].season;
        if(season==2016)
        {
            matchId.add(match[i].id);
        }
    }

    for(let i=0;i<delivery.length;i++)
    {

        if(matchId.has(delivery[i].match_id))
        {
            let battingTeam=delivery[i].batting_team;
            if(!teamPerExtraRuns.hasOwnProperty(battingTeam))
            {
                teamPerExtraRuns[battingTeam]=delivery[i].extra_runs;
            
            }
            else{
                teamPerExtraRuns[battingTeam]=parseInt(teamPerExtraRuns[battingTeam])
                                                          +parseInt(delivery[i].extra_runs);
            }
        }
    }
    delete teamPerExtraRuns[''];
    console.log(teamPerExtraRuns);
}

function findMatchesWonPerTeam(match){
 var matchesWonPerTeam={};
 for(var i=0;i<match.length;i++)
 {
     let team1=match[i].team1;
     let winner=match[i].winner;

     if(!matchesWonPerTeam.hasOwnProperty(team1))
     {
         matchesWonPerTeam[team1]=0;
     }
     if(!matchesWonPerTeam.hasOwnProperty(winner))
     {
         matchesWonPerTeam[winner]=0;
     }
     else{
         matchesWonPerTeam[winner]=1+matchesWonPerTeam[winner];;
     }
 }

  delete matchesWonPerTeam[''];
  console.log(matchesWonPerTeam);
}



function findMatchesPlayedPerYear(match)
{
    var matchesPlayedPerYear={};
    for(var i=0;i<match.length;i++)
    {
        let season=match[i].season;
        if(matchesPlayedPerYear.hasOwnProperty(season))
        {
            matchesPlayedPerYear[season]=1+matchesPlayedPerYear[season];
        }
        else{
            matchesPlayedPerYear[season]=1;
        }
    }
    delete matchesPlayedPerYear[''];
    console.log(matchesPlayedPerYear);
}