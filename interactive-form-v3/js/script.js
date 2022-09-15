
/* 
* "Name" Text field 
*
* when  page first loads, the first text field is focused by defaul
*/

document.getElementById('name').focus();

/* 
* "Job Role" section 
* when user selects other,  then focus on 'other' text input
* hide "other" text input field (default state)
*/

document.getElementById('other-job-role').style.display = "none";


/* 
* EVENT LISTENER for "Job Role" Dropdown menu
*
* select element listens for changes to its state
* job role - drop down selection menu 
*/

const jobRole = document.querySelector('select[id="title"]'); 

jobRole.addEventListener('change', e => {
    if (e.target.value === 'other') {
        document.getElementById('other-job-role').style.display = 'block';
    } else {
        document.getElementById('other-job-role').style.display = "none";
    }
});


/* 
*
* "T-shirt Info" section 
*
* user choose design first then color option
* disable the color select element 
*
*/

const color = document.querySelector('select[id="color"]'); // references the color <select> element - returns the whole node list
color.disabled = true; // disables the color element from being selected


/* 
*
* EVENT LISTENER for "Design" Dropdown Menu
*
* select element listens for changes to its state
* job role - drop down selection menu 
*
*/

const design = document.querySelector('select[id="design"]'); 

const colorOptions = color.children; // dom transversal, returns an html collection

design.addEventListener('change', e => {
    color.disabled = false; // enables color dropdown

    // About the loop - colorOptions html collection

    for (let i = 1; i < colorOptions.length; i++ ) {
        
        const dataTheme = colorOptions[i].getAttribute('data-theme');
        const designValue = e.target.value;

        // About the Conditional - if the designValue is equal to one of the data theme (found in color options), then show that color option. 

        if (designValue === dataTheme) { // show data theme options
            colorOptions[i].hidden = false; // hidden is a property
            colorOptions[i].selected = true; // ?? What does this mean? Add a selected attribute to true. 
        } 
        else {
            colorOptions[i].hidden = true; 
            colorOptions[i].selected = false; // you can also remove attribute
            
        }
    }
});

/* About hidden and selected attributes
** 'Selected' attribute can determine which option element is displayed in the select field.
** 'Hidden' attribute can prevent option elements from being displayed in the drop down menu.
*/



/* 
*
* "Register for Activities" Section
*
* when users select or deselect activities, the total cost correctly updates
*
* when user select activities, it strikes out other activities that have a time conflict 
*
*/


const activities =  document.getElementById('activities'); // register  for activities field set
let displayPrice = document.getElementById('activities-cost'); // total p element
let totalCost = 0; // number, we will add to



activities.addEventListener('change', e => {

    let dataCost = e.target.getAttribute('data-cost');
    dataCost = parseInt(dataCost); // price of activity

        if (e.target.checked) {
            totalCost += dataCost;

        } else {
            totalCost -= dataCost;
        }
    let html = `Total $${totalCost}`; // display price on page, dynamically inserts total cost into string
    displayPrice.innerHTML = html;

});


/* 
*
* "Payment Info" Section
*
* set up default payment method to credit card and display credit card inputs, hide paypal, bitcoin options
*
* when user clicks paypal, display paypal info
*
* when user clicks bitcoin, display bitcoin info
*/


const payment = document.getElementById('payment'); // select id=payment
const paymentOptions = payment.children; // dom transversal, options(4)
const paypal = document.getElementById('paypal'); //div#paypal info box
const bitcoin = document.getElementById('bitcoin'); // div#bitcoin info box


paypal.hidden = true;
bitcoin.hidden = true;
paymentOptions[1].selected = true; // or you can use paymentOptions[1].setAttribute('selected', 'true')

const creditcard = document.querySelector('div[id="credit-card"]');

payment.addEventListener('change', e =>{
    if (e.target.value === paypal.id) {
        creditcard.hidden = true;
        paypal.hidden = false;
        bitcoin.hidden = true;

    } else if (e.target.value === bitcoin.id) {
        creditcard.hidden = true;
        paypal.hidden = true;
        bitcoin.hidden = false;
    } else {
        creditcard.hidden = false;
        paypal.hidden = true;
        bitcoin.hidden = true;

    }

});





/* 
*
* "Form Validation"
*
* check for user requirements & valid inputs
*
*/

const form = document.querySelector('form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const cardNumInput = document.getElementById('cc-num');
const zipcodeInput = document.getElementById('zip');
const cvvInput = document.getElementById('cvv');



    /* 
    1. Name Validation Test function
    */

    let nameResult = '';

    function nameValidation(name) {
        const nameInputValue = name.value;
        const nameREGEX = /[^\s][a-z|\s]*$/i;
        nameResult = nameREGEX.test(nameInputValue);
    }



    /* 
    2. Email Validation Test function
    */

    let emailResult = '';

    function emailValidation(email) {
        const emailInputValue = email.value;
        const emailREGEX = /^[^@\s]+@[^@\s]+\.(com)$/i; 
        emailResult = emailREGEX.test(emailInputValue);
    }


    /*
    3. Activities Validation test
    */


    let checkedItems = 0; // *** move to global scope

    function activitiesValidation() { // *** i can call an anony function
        activities.addEventListener('change', e => {
            let checkbox = e.target.checked;
            if (checkbox === true) {
            checkedItems += 1;
            } else if (checkbox === false) {
            checkedItems -= 1;
            }
    })
    }
    /*
    4. Credit Card Number Validation
    */

    
    let cardNumResult = '';

    function cardNumValidation(creditcard) {
        const cardNumInputValue = creditcard.value;
        const cardNumREGEX = /^\d{13,16}$/;
        cardNumResult = cardNumREGEX.test(cardNumInputValue);
        return cardNumResult;
    }

    /*
    5. Zip Code Validation
    */

    let zipcodeResult = '';

    function zipcodeValidation(zip) {
        const zipcodeInputValue = zip.value;
        const zipcodeREGEX = /^\d{5}$/;
        zipcodeResult = zipcodeREGEX.test(zipcodeInputValue);
        return zipcodeResult;
    }

    
    /*
    5. CVV Validation Test
    */

    let cvvResult = '';

    function cvvValidation(cvv) {
        const cvvInputValue = cvv.value;
        const cvvREGEX = /^\d{3}$/;
        cvvResult = cvvREGEX.test(cvvInputValue);
        return cvvResult;
    }




/**
* 
* ERROR Indication Functions
* the function enables user to see if their inputs are valid
* 
**/

    /*
    1. Name Error Indication 
    */

    const nameLabel = nameInput.parentElement;
    const nameHint = nameLabel.lastElementChild;
    
    function notValidName() {
        nameLabel.classList.add('not-valid');
        nameLabel.classList.remove('valid');
        nameHint.style.display = 'block';
    }
    
    
    function isValidName() {
        nameLabel.classList.add('valid');
        nameLabel.classList.remove('not-valid');
        nameHint.style.display = 'none';
    }

    /*
    2. Email Error Indication 
    */

    const emailLabel = emailInput.parentElement;
    const emailHint = emailLabel.lastElementChild;
    
    function notValidEmail() {
        emailLabel.classList.add('not-valid');
        emailLabel.classList.remove('valid');
        emailHint.style.display = 'block';
    }
    
    
    function isValidEmail() {
        emailLabel.classList.add('valid');
        emailLabel.classList.remove('not-valid');
        emailHint.style.display = 'none';
    }


    /*
    3. Activities Error Indication 
    */

    //const activitiesLabel = emailInput.parentElement;
    const activitiesHint = activities.lastElementChild;

    
    function notValidActivities() {
        activities.classList.add('not-valid');
        activities.classList.remove('valid');
        activitiesHint.style.display = 'block';
    }
    
    
    function isValidActivties() {
        activities.classList.add('valid');
        activities.classList.remove('not-valid');
        activitiesHint.style.display = 'none';
    }





    /*
    4. Card Number Error Indication 
    */

    const cardNumLabel = cardNumInput.parentElement;
    const cardNumHint = cardNumLabel.lastElementChild;
    
    function notValidCardNum() {
        cardNumLabel.classList.add('not-valid');
        cardNumLabel.classList.remove('valid');
        cardNumHint.style.display = 'block';
    }
    
    
    function isValidCardNum() {
        cardNumLabel.classList.add('valid');
        cardNumLabel.classList.remove('not-valid');
        cardNumHint.style.display = 'none';
    }
    




    /*
    5. Zipcode Error Indication 
    */

    const zipcodeLabel = zipcodeInput.parentElement;
    const zipcodeHint = zipcodeLabel.lastElementChild;
    
    function notValidZipcode() {
        zipcodeLabel.classList.add('not-valid');
        zipcodeLabel.classList.remove('valid');
        zipcodeHint.style.display = 'block';
    }
    
    
    function isValidZipcode() {
        zipcodeLabel.classList.add('valid');
        zipcodeLabel.classList.remove('not-valid');
        zipcodeHint.style.display = 'none';
    }


    /*
    6. CVV Error Indication 
    */

    const cvvLabel = cvvInput.parentElement;
    const cvvHint = cvvLabel.lastElementChild;
    
    function notValidCvv() {
        cvvLabel.classList.add('not-valid');
        cvvLabel.classList.remove('valid');
        cvvHint.style.display = 'block';
    }
    
    
    function isValidCvv() {
        cvvLabel.classList.add('valid');
        cvvLabel.classList.remove('not-valid');
        cvvHint.style.display = 'none';
    }





/**
* 
* SUBMIT EVENT LISTENER for the form
* 
**/

form.addEventListener('submit', e =>  {   


    /*
    1. Calling Name Validation Function & Conditional
    */

    nameValidation(nameInput);
    if (nameResult === false) {
        e.preventDefault();
        notValidName();
    } else {
        isValidName();    
    }



    /*
    2. Calling Email Validation Function & Conditional
    */

    emailValidation(emailInput);
    if (emailResult === false) {
        e.preventDefault();
        notValidEmail();
    } else {
        isValidEmail();
    }


    /*
    3. Activties Section Checking Items with Conditional
    */

    activitiesValidation();
    if (checkedItems == false) {
        e.preventDefault();
        notValidActivities();
    } else {
        isValidActivties();
    }





    
    // if credit card section is visible run the following: //

    const creditcardVisible = creditcard.hidden;
    if (creditcardVisible === false) { 

    /* 4. Calling Card Number Validation Function & Conditional */

        cardNumValidation(cardNumInput);
        if (cardNumResult === false) {
            e.preventDefault();
            notValidCardNum();
        } else {
            isValidCardNum();
        }


    /* 5. Calling ZipCode Validation Function & Conditional */

        zipcodeValidation(zipcodeInput);
        if (zipcodeResult == false) {
            e.preventDefault();
            notValidZipcode();
            
        } else {
            isValidZipcode();
        }
    
    /* 6. Calling CVV Validation Function & Conditional */

        cvvValidation(cvvInput);
        if (cvvResult == false) {
            e.preventDefault();
            notValidCvv();
        } else {
            isValidCvv();
        }
    }    
});


/* 
*
* "Accessibilty" section 
*
* Focus and Blur effects
* Users can use the tab and tab-shift to navigate the activites section
*/

const checkbox = document.querySelectorAll('input[type="checkbox"]');


for (let i = 0; i < checkbox.length; i++) {   

    checkbox[i].addEventListener('focus', e => {
        const label = e.target.parentNode;
        label.classList.add('focus'); 
    })

     checkbox[i].addEventListener('blur', e => {
        const label = e.target.parentNode;
        label.classList.remove('focus');    
    })  

}


/*
Treehouse Techdegree:
FSJS Project 3 - Interactive Form

Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/interactive-form#instructions
*/


