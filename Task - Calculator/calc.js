const input = document.querySelector("#input-box");
const buttons = document.querySelectorAll("button");
const operators = ["%", "/", "*", "-", "+", "="];
let output = "";
let lastBtnEquals = false;


const calculate = (btnVal) => {
    if (btnVal === "=" && output !== "") {
        output = eval(output);
        lastBtnEquals = true;
    } else if (btnVal === "AC") {
        output = "";
        lastWasEqual = false;

    } else if (btnVal === "DEL") {
        output = output.slice(0, -1);
        lastBtnEquals = false;
    
    } else if (btnVal === "%") {
        output = (parseFloat(output) / 100).toString();
         
    } else {
        if (lastBtnEquals) {     // if the last button entered is "=" then :
            if (operators.includes(btnVal)) {     // if the last button entered is any operator then :
                lastBtnEquals = false;     // it implies that last button was not "=" and we will continue using the obtained result for next operation
            } else {
                output = "";
                lastBtnEquals = false;     // else starting a fresh operation
            }
        }
        if (output === "" && operators.includes(btnVal)) {     // if there is nothing on screen and the first button pressed is an operator
            return; // no change displayed on screen
        }
        output += btnVal;
        
    }
    input.value = output;
};



//adding event listener to buttons
buttons.forEach(button => {
    button.addEventListener("click", (e) => {
        let btnVal = e.target.dataset.value;
        if (btnVal) {
            calculate(btnVal);
        }
    });
});


// Function to add hover effect when keys are pressed
const addHoverEffect = (key) => {
    buttons.forEach(button => {
        if (button.dataset.value === key) {
            button.classList.add("button-hover");
            setTimeout(() => {
                button.classList.remove("button-hover");
            }, 200); // Adjust the timeout as needed
        }
    });
};


// Adding keyboard support
document.addEventListener("keydown", (e) => {
    const key = e.key;
    if (key >= 0 && key <= 9 || key ===".") {     // Numbers
        calculate(key);
        addHoverEffect(key);
    } else if (operators.includes(key)) {     // Operators 
        calculate(key);
        addHoverEffect(key);
    } else if (key === "Enter") {     // Enter key for "="
        calculate("=");
        addHoverEffect("=");
    } else if (key === "Backspace") {    // Backspace for DEL
        calculate("DEL");
        addHoverEffect("DEL");
    } else if (key === "Escape") {     // Escape for AC
        calculate("AC");
        addHoverEffect("AC");
    }

});

