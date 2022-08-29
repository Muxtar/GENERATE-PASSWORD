let generatePassword = document.getElementById('generate');
let resultInput = document.getElementsByClassName('result-input')[0];

let checkboxs = document.querySelectorAll('input[type=checkbox]');

let upperInput = document.querySelectorAll('input[type=checkbox]')[0];
let lowerInput = document.querySelectorAll('input[type=checkbox]')[1];
let numberInput = document.querySelectorAll('input[type=checkbox]')[2];
let symbolInput = document.querySelectorAll('input[type=checkbox]')[3];

let rangeInput = document.getElementsByClassName('range-input')[0];
let characterLen = document.getElementsByClassName('zero')[0];
let clipboard = document.getElementsByClassName('fa-clipboard')[0];

let passwordType = document.getElementsByClassName('password-type')[0];
let blocks = document.getElementsByClassName('block');

let upperLetters = 'QWERTYUIOPASDFGHJKLZXCVBNM';
let lowerLetters = 'qwertyuiopasdfghjklzxcvbnm';
let numbersLetters = '1234567890'
let symbolsLetters = '[!@#$%^&()_\\[\]{};:\\|,.<>\/?]';

for(i of checkboxs){
    i.addEventListener('change', (e)=>{
        let allCheckbox = {
            upper: upperInput.checked,
            lower: lowerInput.checked,
            number: numberInput.checked,
            symbol: symbolInput.checked
        }
        let list = [];
        if(allCheckbox.upper) list.push(upperGenerate)
        if(allCheckbox.lower) list.push(lowerGenerate)
        if(allCheckbox.number) list.push(numberGenerate)
        if(allCheckbox.symbol) list.push(symbolGenerate)
        if(list.length == 1){color = 'rgb(251 205 100)'; passwordType.innerHTML = 'MEDIUM'};
        if(list.length >= 2){color = '#a4ffaf'; passwordType.innerHTML = 'NORMAL'};
        if(list.length == 4){ color = 'green'; passwordType.innerHTML = 'HARD'}
        for(i of blocks){
            i.style.backgroundColor = 'transparent';
            i.style.borderColor = 'rgb(150, 150, 150)';
        }
        for(i in list){
            blocks[i].style.background = color;
            blocks[i].style.borderColor = color;
        }
    })
}

rangeInput.addEventListener('change', (e)=>{
    characterLen.innerHTML = e.target.value;
})

generatePassword.addEventListener('click', (e)=>{       
    let allCheckbox = {
        upper: upperInput.checked,
        lower: lowerInput.checked,
        number: numberInput.checked,
        symbol: symbolInput.checked
    }
    let list = [];
    if(allCheckbox.upper) list.push(upperGenerate)
    if(allCheckbox.lower) list.push(lowerGenerate)
    if(allCheckbox.number) list.push(numberGenerate)
    if(allCheckbox.symbol) list.push(symbolGenerate)
    function generate(param){
        let password = [];
        while(param > 0){
            password.push(list[Math.floor(Math.random()*list.length)]())
            param--;
        }
        return password;
    } 
    while(true){
        let result = generate(rangeInput.value).join('')
        if(test(result, allCheckbox.upper, allCheckbox.lower, allCheckbox.number, allCheckbox.symbol)){
            resultInput.value = result;
            clipboard.style.color = '#a4ffaf';
            clipboard.setAttribute('onclick', 'copyText()')
            console.log(`SUCCESSFUL :))) RESULT ==> ${result}`)
            break;
        }
        else{
            console.log('FAILED :(( ', result);
        }
    }
    
})

function upperGenerate(){
    return upperLetters[Math.floor(Math.random(0)*upperLetters.length)]
}
function lowerGenerate(){
    return lowerLetters[Math.floor(Math.random(0)*lowerLetters.length)]
}
function numberGenerate(){
    return numbersLetters[Math.floor(Math.random(0)*numbersLetters.length)]
}
function symbolGenerate(){
    return symbolsLetters[Math.floor(Math.random(0)*symbolsLetters.length)]
}

function test(param, upperParam, lowerParam, numberParam, symbolParam){
    let upper = false;
    let lower = false;
    let number = false;
    let symbol = false;

    for(i of param){
        if(upperParam){
            if(upperLetters.includes(i)) upper = true
        }
        else{
            upper = true;
        }
        if(lowerParam){
            if(lowerLetters.includes(i)) lower = true
        }
        else{
            lower = true;
        }
        if(numberParam){
            if(numbersLetters.includes(i)) number = true
        }
        else{
            number = true;
        }
        if(symbolParam){
            if(symbolsLetters.includes(i)) symbol = true
        }
        else{
            symbol = true;
        }
    }
    if(upper && lower && number && symbol){
        return true
    }
    return false
}

function copyText(){
    navigator.clipboard.writeText(resultInput.value);
    clipboard.className = 'fa fa-check cp';
    clipboard.setAttribute('title', 'Copied');
    
}