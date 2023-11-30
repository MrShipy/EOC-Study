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
//datastore vars
notecardsave = 'notecardsave' + savevalue;
biggermachinesave = 'biggermachinesave' + savevalue;
multipliersave = 'multipliersave' + savevalue;
automachineactivatedsave = 'automachineactivated' + savevalue;
automachinesave = 'automachinesave' + savevalue;
moneysave = 'moneysave' + savevalue;
marketsharesave = 'marketsharesave' + savevalue;
papersave = 'papersave' + savevalue;
//equations
machines_equation = ((5 * biggermachines) * 1.6);
automachine_equation = ((automachines + 1) * 30);

Quest(0);

function createnote() {
    if (paper >= 0) {
        notecards = notecards + multiplier;
        document.getElementById("number").innerHTML = "Notecards: " + notecards;
        paper = paper - 0.10;
        document.getElementById("papertitle").innerHTML = "Paper: " + Math.round(paper) + " sheets"; 
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
                 Quest(0);
                 percentagecount(percentage);
            }
            if(goal==1){
                percentage = (notecards / 4) * 100;
                document.getElementById("assignment").innerHTML = "Assignment: Upgrade your machines (1)"
                if(biggermachines>=2){
                    document.getElementById("claim").removeAttribute("disabled");
                } else
                 Quest(0);
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
      } else if(percentage==100){
        document.getElementById("progressbar").style.backgroundColor="Green";
      }
}

function claimreward(){
    document.getElementById("claim").setAttribute('disabled', 'disabled');
    document.getElementById("progressbar").style.width='1%';
    document.getElementById("progressbar").style.backgroundColor="Red";
    if(goal==0){
        document.getElementById("biggermachines").removeAttribute("disabled");
        goal++;
    Quest(goal);
    }
    if(goal==1){
        paper = paper + 36;
        goal++;
    Quest(goal);
    }
    
}

function upgrademachines() {
    if (money >= machines_equation) {
        money = money - machines_equation;
        multiplier = multiplier + 1;
        biggermachines = biggermachines + 1;
        machines_equation = ((5 * biggermachines) * 1.6);
        document.getElementById("machinestitle").innerHTML = "Bigger Machines: $" + machines_equation + " (" + biggermachines + ")";
        document.getElementById("moneytitle").innerHTML = "Money: $" + money;
    }
}

function sellnotecard(amount) {
    if (notecards >= (amount * 52)) {
        notecards = notecards - (amount * 52);
        money = money + ((2 * (marketshare * 2)) * amount);
        document.getElementById("number").innerHTML = "Notecards: " + notecards;
        document.getElementById("moneytitle").innerHTML = "Money: $" + money;
        document.getElementById("amount").innerHTML = "Pack: 52 cards (+$" + (2 * (marketshare * 2)) + ")";
    }
}

function buymarketshare() {
    if (money >= (100 * marketshare)) {
        money = money - (100 * marketshare);
        marketshare = marketshare + 1;
        document.getElementById("moneytitle").innerHTML = "Money: $" + money;
        document.getElementById("marketsharetitle").innerHTML = "Market Share: $" + (100 * marketshare) + " (" + marketshare + ")"
        document.getElementById("amount").innerHTML = "Pack: 52 cards (+$" + (2 * (marketshare * 2)) + ")";
    }
}

function buypaper(amount) {
    if (money >= (amount * .8)) {
        money = money - (amount * .8);
        paper = paper + amount;
        document.getElementById("papertitle").innerHTML = "Paper: " + Math.round(paper) + " sheets";
        document.getElementById("moneytitle").innerHTML = "Money: $" + money;
    }
}
let timeout;
let timeout2;
const automachinesdelay_equation = (4000 - (automachines * 600)) + 600
function AutoMachine() {
    //alert((4000 - (2 * 300)) + 600);
    console.log((4000 - (automachines * 600)) + 600);
    createnote();
    timeout = setTimeout(AutoMachine2, (4000 - (automachines * 600)) + 600);
}
function AutoMachine2() {
    console.log((4000 - (automachines * 600)) + 600);
   createnote();
    timeout2 = setTimeout(AutoMachine, (4000 - (automachines * 600)) + 600);
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
            document.getElementById("automachinestitle").innerHTML = "Auto Machines: $" + automachine_equation + " (" + automachines + ")";
            document.getElementById("moneytitle").innerHTML = "Money: " + money;
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
                document.getElementById("automachinestitle").innerHTML = "Auto Machines: $" + automachine_equation + " (" + automachines + ")";
                document.getElementById("moneytitle").innerHTML = "Money: " + money;  
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