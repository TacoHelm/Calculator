/*


Extra credit

    Users can get floating point numbers if they do the math required to get one, but they can’t type them in yet. Add a . button and let users input decimals! Make sure you don’t let them type more than one though: 12.3.56.5. It is hard to do math on these numbers. (disable the decimal button if there’s already one in the display)
    Make it look nice! This is a great project to practice your CSS skills. At least make the operations a different color from the keypad buttons.
    Add keyboard support! You might run into an issue where keys such as (/) might cause you some trouble. Read the MDN documentation for event.preventDefault to help solve this problem.

*/


// globale variabelen
let numScherm = 0;
let nummerArr = [];
let symboolArr = [];
let resultaat = 0;
let laatsteKnop = 'num';
let kommaKnop = 'nee';
const knopNum = document.querySelectorAll('.knop.num');
const knopSymb = document.querySelectorAll('.knop.symb');
const knopWissen = document.querySelector('.wissen');
const knopBereken = document.querySelector('.is');
const knopKomma = document.querySelector('.komma');
const knopBackspace = document.querySelector('.backspace');
const knopNegatief = document.querySelector('.min');
const beeldscherm = document.querySelector('.scherm');


// functies

function nummerGedrukt(evt){
    if (kommaKnop == 'ja') numScherm = Number(numScherm + '.' + evt.target.innerText);
    if (kommaKnop == 'nee') numScherm = Number(numScherm + evt.target.innerText);
    kommaKnop = 'nee';
    beeldscherm.textContent = `${numScherm}`;
    laatsteKnop = 'num';
    return;
}

function symboolGedrukt(evt){
    if (laatsteKnop == 'num') nummerArr.push(numScherm);
    if (laatsteKnop == 'symb') symboolArr.pop();    
    symboolArr.push(evt.target.innerText);
    numScherm = 0;
    laatsteKnop = 'symb';
    return;
}

function wissenGedrukt() {
    nummerArr.length = 0;
    symboolArr.length = 0;
    resultaat = 0;
    numScherm = 0;
    beeldscherm.textContent = `${numScherm}`;
    return;
}

function isGedrukt() {
    if (laatsteKnop == 'symb') return;
    nummerArr.push(numScherm);
    for (i = 0; i < nummerArr.length; i++){
        if (symboolArr[i] == "**") {
            bereken(nummerArr[i], nummerArr[i+1], symboolArr[i], i); 
            i--;
        }
    }
    for (i = 0; i < nummerArr.length; i++){
        if (symboolArr[i] == "*") {
            bereken(nummerArr[i], nummerArr[i+1], symboolArr[i], i); 
            i--;
        }
    }
    for (i = 0; i < nummerArr.length; i++){
        if (symboolArr[i] == "/") {
            if (nummerArr[i+1] == 0){
                delenDoorNul();
                return;
            }
            bereken(nummerArr[i], nummerArr[i+1], symboolArr[i], i); 
            i--;
        }
    }
    for (i = 0; i < nummerArr.length; i++){
        if (symboolArr[i] == "+") {
            bereken(nummerArr[i], nummerArr[i+1], symboolArr[i], i); 
            i--;
        }
    }
    for (i = 0; i < nummerArr.length; i++){
        if (symboolArr[i] == "-") {
            bereken(nummerArr[i], nummerArr[i+1], symboolArr[i], i); 
            i--;
        }
    }
    beeldscherm.textContent = `${nummerArr[0]}`;
return;
}

    function delenDoorNul() {
        beeldscherm.textContent = 'Kan niet delen door 0!';
        nummerArr.length = 0;
        symboolArr.length = 0;
        resultaat = 0;
        numScherm = 0;
    }

    function bereken(numEen, numTwee, symb, positie){
        let resultaat = 0;
        if (symb == '+') resultaat = numEen + numTwee;
        if (symb == '-') resultaat = numEen - numTwee;
        if (symb == '*') resultaat = numEen * numTwee;
        if (symb == '/') resultaat = numEen / numTwee;
        if (symb == '**') resultaat = numEen ** numTwee;
        resultaat = Math.round(resultaat * 100)/100;
        nummerArr.splice(positie, 2, resultaat);
        symboolArr.splice(positie, 1);
        return;
    }

function kommaGedrukt(){
    kommaKnop = 'ja';
}

function backspaceGedrukt(){
    if (laatsteKnop == 'num') {
        numScherm = Math.floor(numScherm/10);
    }
    return;
}

function negatiefGedrukt(){
    numScherm = 0 - numScherm;
    beeldscherm.textContent = `${numScherm}`;
}


// koppelingen
knopNum.forEach((knop) => knop.addEventListener('click', nummerGedrukt));
knopSymb.forEach((knop) => knop.addEventListener('click', symboolGedrukt));
knopWissen.addEventListener('click', wissenGedrukt);
knopBereken.addEventListener('click', isGedrukt);
knopKomma.addEventListener('click', kommaGedrukt);
knopBackspace.addEventListener('click', backspaceGedrukt);
knopNegatief.addEventListener('click', negatiefGedrukt);




