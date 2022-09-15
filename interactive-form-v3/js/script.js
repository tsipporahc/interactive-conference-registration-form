
/* 
*
* "Name" Text feild 
*
* when  page first loads, the first text field is focused by defaul
*
*/

document.getElementById('name').focus();

/* 
*
* "Job Role" section 
*
* when user selects other,  then focus on 'other' text input
* hide "other" text input field (default state)
*
*/

document.getElementById('other-job-role').style.display = "none";


/* 
*
* EVENT LISTENER for "Job Role" Dropdown menu
*
* select element listens for changes to its state
* job role - drop down selection menu 
*
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

    function isValidName(name) {
        const nameInputValue = name.value;
        const nameREGEX = /[^\s][a-z|\s]*$/i;
        nameResult = nameREGEX.test(nameInputValue);
        console.log(nameResult);
    }



    /* 
    2. Email Validation Test function
    */

    let emailResult = '';

    function isValidEmail(email) {
        const emailInputValue = email.value;
        const emailREGEX = /^[^@\s]+@[^@\s]+\.(com)$/i; 
        emailResult = emailREGEX.test(emailInputValue);
    }


    /*
    3. Activities Validation test
    */


    let checkedItems = 0; // *** move to global scope

    function isValidActivities() { // *** i can call an anony function
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

    function isValidCardNum(creditcard) {
        const cardNumInputValue = creditcard.value;
        const cardNumREGEX = /^\d{13,16}$/;
        cardNumResult = cardNumREGEX.test(cardNumInputValue);
        return cardNumResult;
    }

    /*
    5. Zip Code Validation
    */

    let zipcodeResult = '';

    function isValidZipcode(zip) {
        const zipcodeInputValue = zip.value;
        const zipcodeREGEX = /^\d{5}$/;
        zipcodeResult = zipcodeREGEX.test(zipcodeInputValue);
        return zipcodeResult;
    }

    
    /*
    5. CVV Validation Test
    */

    let cvvResult = '';

    function isValidCvv(cvv) {
        const cvvInputValue = cvv.value;
        const cvvREGEX = /^\d{3}$/;
        cvvResult = cvvREGEX.test(cvvInputValue);
        return cvvResult;
    }





/**
* 
* SUBMIT EVENT LISTENER for the form
* 
**/



form.addEventListener('submit', e =>  { //attaches event handler
    
    /****
    0000. Prevent default submittion delete when finished with project
    *****/
    e.preventDefault();
    


    /*
    1. Calling Name Validation Function & Conditional
    */

    isValidName(nameInput);
    console.log(nameResult);
    if (nameResult === false) {
    e.preventDefault();
    alert('name is not valid. but your code is working.');
    }



    /*
    2. Calling Email Validation Function & Conditional
    */

    isValidEmail(emailInput);
    console.log(emailResult);
    if (emailResult === false) {
        e.preventDefault();
        alert('email is not valid. but your code is working.');
    }


    /*
    3. Activties Section Checking Items with Conditional
    */

    isValidActivities();
    console.log(checkedItems);
    if (checkedItems == false) {
        e.preventDefault();
        alert('check more activites, but your code is working.');
    }



    /* 4. Calling Card Number Validation Function & Conditional */

    /*
    if credit card section is visible
    */

    const creditcardVisible = creditcard.hidden;
    if (creditcardVisible === false) {


        isValidCardNum(cardNumInput);
        console.log(cardNumResult);
        if (cardNumResult === false) {
            e.preventDefault();
            alert('card invalid, but your code is working. keep going.');
        }


    /* 5. Calling ZipCode Validation Function & Conditional */

    
        isValidZipcode(zipcodeInput);
        console.log(zipcodeResult);
        if (zipcodeResult == false) {
            e.preventDefault();
            alert('zipcode invalid, but your code is working.');
        }
    
    /* 6. Calling CVV Validation Function & Conditional */

        isValidCvv(cvvInput);
        console.log(cvvResult);
        if (cvvResult == false) {
            e.preventDefault();
            alert('cvv invalid, but your code is working beautifully.');
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
    console.log(checkbox[i]);    

    checkbox[i].addEventListener('focus', e => {
        const label = e.target.parentNode;
        label.className = ''; // dont forget
        if (checkbox[i].checked === false) {
            label.classList.add('focus');
            label.classList.remove('blur');

        } 
        
    })

     checkbox[i].addEventListener('blur', e => {
        const label = e.target.parentNode;
        label.className = '';
        if (checkbox[i].checked === true) {
            label.classList.remove('focus');
        } 
    
    })  

}





