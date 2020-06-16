let screen = document.querySelector('.calculator_screen');  // Target the screen
let allButtons = document.querySelectorAll('.calculator_buttons'); // Target the buttons 
let result;
let currentText = "";
let prevOperator;
let foundDecimal = false;


function addAllListeners(param) { 
    for (let i = 0; i < param.length; i++) {
        param[i].addEventListener('click', change);
    }
}
addAllListeners(allButtons);
function reset() {
    result = 0;
    currentText = "";
}
function change(param) {
    
    if ( param.target.className.match(/operator/)) {
        //fixes multiple decimal points in the same number
        foundDecimal = false;
    }else if (prevOperator == "equals") {
        //fixes issue where number gets  pressed and 
        // appended to the currentText after equals is pressed
    
        reset();
    }
    if (param === undefined || param.target.id == "AC") {
        //AC was pressed 
        console.log("action AC");
        screen.innerHTML = 0;
        reset();
    } else if (param.target.id == "equals") {
        //target id is "equals" - compute result
        console.log("action EQUALS");
        if (currentText == "") {
            currentText = 0;
        }
        result = eval(currentText);

        screen.innerHTML = numberWithCommas(result);
        currentText = result.toString()
        console.log("current text " + currentText);

    } else if (param.target.id == "negate") {
        //Replace negate +/ symbol with -
        val = param.target.innerHTML.replace("\+\/-", " -");
        currentText = currentText + val;
        screen.innerHTML = currentText;
    } else if (param.target.className.match(/decimal/)) {
        //detect that the decimal was pressed and set flag to prevent it in future
        if (foundDecimal) {
            screen.innerHTML = currentText;
        } else {
            foundDecimal = true;
            currentText = currentText + param.target.innerHTML;
            screen.innerHTML = currentText;
        }

    } else {
        //Update the screen 
        console.log("updating equation ");
        currentText = currentText + param.target.innerHTML;
        screen.innerHTML = currentText;
    }
    prevOperator = param.target.id;
    return;
}
function numberWithCommas(x) { // Created a function to add commas 
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}

