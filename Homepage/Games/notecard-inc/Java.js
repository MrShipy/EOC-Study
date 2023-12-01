//var
var notecards = 0;
var multiplier = 1;
var biggermachines = 1;
var money = 0;
var marketshare = 1;
var savevalue = '11';
var automachines = 0;
var paper = 100;
var automachineactivated = 0;
var goal = 0;
var activated = false;
let reward
var timedelay = 0;
var firedebounce = false;
var fire = false;
var firesamounts = 0;
var firealarms = 1;
var firealarmactivated = 0;
var nps = 0;
//datastore vars
notecardsave = 'notecardsave' + savevalue;
biggermachinesave = 'biggermachinesave' + savevalue;
multipliersave = 'multipliersave' + savevalue;
automachineactivatedsave = 'automachineactivated' + savevalue;
automachinesave = 'automachinesave' + savevalue;
moneysave = 'moneysave' + savevalue;
marketsharesave = 'marketsharesave' + savevalue;
papersave = 'papersave' + savevalue;
questsave = 'questsave' + savevalue;
firealarmsave = 'firealarmsave' + savevalue;
firealarmactivatedsave = 'firealarmactivatedsave' + savevalue;
//equations
machines_equation = ((5 * biggermachines) * 1.6);
automachine_equation = ((automachines + 1) * 30);

Quest(goal);

function startfire() {
  document.body.style.animation="fireIn 2s linear";
  document.getElementById("save").disabled = true;
  document.getElementById("load").disabled = true;
  setTimeout(() => {
    document.body.style.backgroundColor = "red";
  }, 2000);
  document.getElementById("number").style.color = "white";
    document.getElementById("notecardclicker").disabled = true;
    automachineactivated = 0;
    setTimeout(() => {
        notecards = notecards - Math.floor(Math.random() * (notecards/firealarms));
        paper = paper - Math.floor(Math.random() * (paper/(firealarms * 2)));
        Update();
        document.body.style.animation="fireOut 6s linear";
    document.getElementById("number").style.color = "black";
    }, 6000);
    setTimeout(() => {
        document.body.style.backgroundColor = "white";
        document.getElementById("notecardclicker").disabled = false;
        document.getElementById("save").disabled = false;
        document.getElementById("load").disabled = false;
        fire = false;
    }, 11000);
    Update();
}

function createnote() {
    if (paper >= 0) {
        notecards = notecards + multiplier;
        document.getElementById("number").innerHTML = "Notecards: " + notecards;
        paper = paper - 0.10;
        document.getElementById("papertitle").innerHTML = "Paper: " + Math.round(paper) + " sheets";
        if(firedebounce==false && fire==false){
            firedebounce=true;
            timedelay=notecards;
            setTimeout(() => {
                nps = (notecards - timedelay);
                if((notecards - timedelay) >= (25*(firealarms*1.6))){
                    firedebounce=false;
                    fire=true;
                    console.warn("FIRE ALRM GOES OFF!!!");
                    firesamounts=firesamounts+1;
                    Update();
                    startfire();
                }
                firedebounce=false;
            }, 1000);
        }
    }
}

var percentage = 1;
function Quest(goal){
        setTimeout(() => {
            if(goal==0){
                document.getElementById("assignment").innerHTML = "Assignment: Make $4"
                percentage = (money / 4) * 100;
                if(money>=4){
                    document.getElementById("claim").removeAttribute("disabled");
                } else
                 Quest(goal);
                 percentagecount(percentage);
            }
            if(goal==1){
                percentage = (biggermachines / 3) * 100;
                document.getElementById("assignment").innerHTML = "Assignment: Upgrade your machines (3)"
                if(biggermachines>=3){
                    document.getElementById("claim").removeAttribute("disabled");
                } else
                 Quest(goal);
                 percentagecount(percentage);
            }
            if(goal==2){
                percentage = (money / 30) * 100;
                document.getElementById("assignment").innerHTML = "Assignment: Make $30"
                if(money>=30){
                    document.getElementById("claim").removeAttribute("disabled");
                } else
                 Quest(goal);
                 percentagecount(percentage);
            }
            if(goal==3){
                percentage = (automachines / 1) * 100;
                document.getElementById("assignment").innerHTML = "Assignment: Buy (1) Auto Machines"
                if(automachines>=1){
                    document.getElementById("claim").removeAttribute("disabled");
                } else
                 Quest(goal);
                 percentagecount(percentage);
            }
            if(goal==4){
                percentage = (automachines / 1) * 100;
                document.getElementById("assignment").innerHTML = "Assignment: Make $100"
                if(money>=100){
                    document.getElementById("claim").removeAttribute("disabled");
                } else
                 Quest(goal);
                 percentagecount(percentage);
            } if(goal==5){
                percentage = (nps / 30) * 100;
                document.getElementById("assignment").innerHTML = "Assignment: Make 30 notecards per second"
                if(nps>=100){
                    document.getElementById("claim").removeAttribute("disabled");
                } else
                Quest(goal);
                 percentagecount(percentage);
            }
        }, 200);
}

function percentagecount(percentage){
    document.getElementById("progressbar").style.width=percentage+'%';
    if(percentage>=0 && percentage<=49){
      document.getElementById("progressbar").style.backgroundColor="Red";
    } else if(percentage>=50 && percentage<=74){
        document.getElementById("progressbar").style.backgroundColor="Yellow";
      } else if(percentage>=75 && percentage<=99){
        document.getElementById("progressbar").style.backgroundColor="Orange";
      } else if(percentage>=100){
        if(percentage>100){
            percentage = 100;
        }
        document.getElementById("progressbar").style.backgroundColor="Green";
      }
}

function claimreward(){
    document.getElementById("claim").setAttribute('disabled', 'disabled');
    document.getElementById("progressbar").style.width='1%';
    document.getElementById("progressbar").style.backgroundColor="Red";
    if(goal==0){
        document.getElementById("biggermachines").disabled = false;
        goal = goal + 1;
        reward = '"Bigger Machines" unlocked';
    } else if(goal==1){
        paper = paper + 36;
        goal = goal + 1;
        reward = '+36 paper';
    } else if(goal==2){
        document.getElementById("automachine").disabled = false;
        goal = goal + 1;
        reward = '+auto machines unlocked';
    } else if(goal==3){
        biggermachines = biggermachines + 2;
        goal = goal + 1;
        reward = '+2 Bigger Machines';
    } else if(goal==4){
        document.getElementById("firediv").style.display="block";
        goal = goal + 1;
        reward = '"Fire alarm" unlocked';
        firealarmactivated = 1;
    } else if(goal==5){
       // goal = goal + 1;
        document.getElementById("marketshare").disabled = false;
        reward = '"Market Share" unlocked';
    }
    document.getElementById("reward").innerHTML = "Reward: " + reward;
    document.getElementById("reward").style.animation="fadeIn 5s ease-out";
    Update();
    console.log(goal);
    Quest(goal);
    setTimeout(() => {
        document.getElementById("reward").style.animation="idle 10s linear";
    }, 5000);
    setTimeout(() => {
        document.getElementById("reward").style.animation="fadeOut 5s ease-out";
    }, 15000);
}

function upgrademachines() {
    if (money >= machines_equation) {
        money = money - machines_equation;
        multiplier = multiplier + 1;
        biggermachines = biggermachines + 1;
        machines_equation = ((5 * biggermachines) * 1.6);
        Update();
    }
}

function sellnotecard(amount) {
    if (notecards >= (amount * 52)) {
        notecards = notecards - (amount * 52);
        money = money + ((2 * (marketshare * 2)) * amount);
        Update();
    }
}

function buymarketshare() {
    if (money >= (400 * marketshare)) {
        money = money - (400 * marketshare);
        marketshare = marketshare + 1;
        Update();
    }
}

function buypaper(amount) {
    if (money >= (amount * .8)) {
        money = money - (amount * .8);
        paper = paper + amount;
        Update();
    }
}

function Update(){
    document.getElementById("number").innerHTML = "Notecards: " + notecards;
    document.getElementById("machinestitle").innerHTML = "Bigger Machines: $" + machines_equation + " (" + biggermachines + ")";
    document.getElementById("automachinestitle").innerHTML = "Auto Machines: $" + automachine_equation + " (" + automachines + ")";
    document.getElementById("moneytitle").innerHTML = "Money: $" + money;
    document.getElementById("marketsharetitle").innerHTML = "Market Share: $" + (marketshare * 100) + " (" + marketshare + ")";
    document.getElementById("amount").innerHTML = "Pack: 52 cards (+$" + (2 * (marketshare * 2)) + ")";
    document.getElementById("paper").innerHTML = "1 Sheet of paper: ($" + (1 * .8) + ")";
    document.getElementById("papertitle").innerHTML = "Paper: " + Math.round(paper) + " sheets";
    document.getElementById("fire").innerHTML = "Fires: " + firesamounts;
    document.getElementById("firesafety").innerHTML = "Fire alarms (" + firealarms + ")"
}
let timeout;
let timeout2;
const automachinesdelay_equation = (4000 - (automachines * 600)) + 600
function AutoMachine() {
    if(automachineactivated==1){
        createnote();
        timeout = setTimeout(AutoMachine2, (4000 - (automachines * 600)) + 600);
    }
    
}
function AutoMachine2() {
    if(automachineactivated==1){
        createnote();
         timeout2 = setTimeout(AutoMachine, (4000 - (automachines * 600)) + 600);
    }
    
}
                  //  start the loop
function addautomachine() {
    if (money >= automachine_equation) {
       // alert("enough money");
        if (automachineactivated == 0) {
           // alert("value check");
            money = money - automachine_equation;
            automachines = automachines + 1
            automachine_equation = ((automachines + 1) * 30);
            automachineactivated = 1;
            Update();
           // alert("checkpoint1");
            if (automachineactivated == 1) {
               // alert("checkpoint2");
                if (activated == false) {
                    alert("Success! Automachines activated.");
                    activated = true;
                    AutoMachine();
                }
            }
        } else {
            if (money >= automachine_equation) {
                //alert("checkpoint1");
                money = money - automachine_equation;
                automachines = automachines + 1
                automachine_equation = ((automachines + 1) * 100);
                Update();
            }
        }
    }
}

function save() {
    if (marketshare == 0) {
        marketshare = 1;
    }
    localStorage.setItem(notecardsave, Number(notecards));
    localStorage.setItem(biggermachinesave, Number(biggermachines));
    localStorage.setItem(automachineactivatedsave, Number(automachineactivated));
    localStorage.setItem(multipliersave, Number(multiplier));
    localStorage.setItem(automachinesave, Number(automachines));
    localStorage.setItem(moneysave, Number(money));
    localStorage.setItem(marketsharesave, Number(marketshare));
    localStorage.setItem(papersave, Number(paper));
    localStorage.setItem(questsave, Number(goal));
    localStorage.setItem(firealarmsave, Number(firealarms));
    localStorage.setItem(firealarmactivatedsave, Number(firealarmactivated));
}

function load() {
    if (localStorage.getItem(notecardsave)) {


        notecards = localStorage.getItem(notecardsave);
        notecards = Number(notecards);

        biggermachines = localStorage.getItem(biggermachinesave);
        biggermachines = Number(biggermachines);

        multiplier = localStorage.getItem(multipliersave);
        multiplier = Number(multiplier);

        automachineactivated = localStorage.getItem(automachineactivatedsave);
        automachineactivated = Number(automachineactivated);

        automachines = localStorage.getItem(automachinesave);
        automachines = Number(automachines);

        money = localStorage.getItem(moneysave);
        money = Number(money);

        paper = localStorage.getItem(papersave);
        paper = Number(paper);

        marketshare = localStorage.getItem(marketsharesave);
        marketshare = Number(marketshare);

        goal = localStorage.getItem(questsave);
        goal = Number(goal);

        firealarms = localStorage.getItem(firealarmsave);
        firealarms = Number(firealarms);

        firealarmactivated = localStorage.getItem(firealarmactivatedsave);
        firealarmactivated = Number(firealarmactivated);

        //datastore settext
        machines_equation = ((5 * biggermachines) * 1.6);
        automachine_equation = ((automachines + 1) * 30);
        document.getElementById("number").innerHTML = "Notecards: " + notecards;
        document.getElementById("machinestitle").innerHTML = "Bigger Machines: $" + machines_equation + " (" + biggermachines + ")";
        document.getElementById("automachinestitle").innerHTML = "Auto Machines: $" + automachine_equation + " (" + automachines + ")";
        document.getElementById("moneytitle").innerHTML = "Money: $" + money;
        document.getElementById("marketsharetitle").innerHTML = "Market Share: $" + (marketshare * 100) + " (" + marketshare + ")";
        document.getElementById("amount").innerHTML = "Pack: 52 cards (+$" + (2 * (marketshare * 2)) + ")";
        document.getElementById("paper").innerHTML = "1 Sheet of paper: ($" + (1 * .8) + ")";
        document.getElementById("papertitle").innerHTML = "Paper: " + Math.round(paper) + " sheets";
        document.getElementById("firesafety").innerHTML = "Fire alarms (" + firealarms + ")"

        if(firealarmactivated==1){
            document.getElementById("firediv").style.display="block";
        }

        if (multiplier == 0) {
            multiplier = 1;
        }
        if (biggermachines == 0) {
            biggermachines = 1;
        }
        if (marketshare == 0) {
            marketshare = 1;
        }
        if (automachineactivated == 1) {
                AutoMachine();
        }
    }
    else {
        alert("You cant load if you have no save");
    }
}


window.addEventListener('beforeunload', (event) => {
   // event.returnValue = 'Are you sure you want to leave?';
});