let screen = document.querySelector('.calculator_screen');  // Target the screen
let allButtons = document.querySelectorAll('.calculator_buttons'); // Target the buttons 
let result;    // Declared a variable called result but haven't assigned to anything yet
let currentText = "";  // Declared a variable called currentText assigned to to an empty string
let prevOperator; // Declared a variable called prevOperator but haven't assigned to anything yet
let foundDecimal = false; // Declared a variable called foundDecimal thats equal to false 


function addAllListeners(param) {   // Created a function thats takes in a param
    for (let i = 0; i < param.length; i++) { // iterate through the param length one value at a time
        param[i].addEventListener('click', change); // Add event listener so when we click on a button we get a change 
    }
}
addAllListeners(allButtons); 
function reset() { // created function called reset 
    result = 0;     //  result is equal to 0
    currentText = "";  // current text equal to empty string 
}
function change(param) { // created a function called change which takes in a parameter this function is responsible for a majority of the calculator operations 
    
    if ( param.target.className.match(/operator/)) {
        //fixes multiple decimal points in the same number
        foundDecimal = false;
    }else if (prevOperator == "equals") {
        //fixes issue where number gets  pressed and 
        // appended to the currentText after equals is pressed
    
        reset();
    }
    if (param === undefined || param.target.id == "AC") { // Resets the screen when AC is pressed 
        //AC was pressed 
        console.log("action AC");
        screen.innerHTML = 0;
        reset();
    } else if (param.target.id == "equals") {
        //target id is "equals" - when we press the equals button it computes the result
        console.log("action EQUALS");
        if (currentText == "") {
            currentText = 0;
        }
        result = eval(currentText); // The eval() function evaluates JavaScript code represented as a string. "NEVER USE EVAL"  but for the sake of this project and simplicity I went ahead and used it anyway as a one off.. 

        screen.innerHTML = numberWithCommas(result); // screen.innerhtml equals numbersWithCommas 
        currentText = result.toString()
        console.log("current text " + currentText);

    } else if (param.target.id == "negate") {
        //Replace negate +/ symbol with -
        val = param.target.innerHTML.replace("\+\/-", " -"); // Regular expression
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
    let parts = x.toString().split("."); // tostring() Converts a number to a string, split() turns a string into an array on the given character
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ","); // replace() replaces the first occurence of a character with another character used a Regular Expression
    return parts.join("."); // join() converts array into string by concatenating all elements together on a given character
}



