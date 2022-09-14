
// "Name" feild - When the page first loads, the first text field should have the focus state by default to prompt the user.

document.getElementById('name').focus();

// "Job Role" section

//when user selects other,  then focus on 'other' text input
// hide/ grey out 'other' text (default state)

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

// "T-shirt Info" section 

//user choose design first then color option

// disable the color select element

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

/* const activities = document.getElementById('activities-box');
const label = activities.children;

console.log(label); */

const activities =  document.getElementById('activities'); // register  for activities field set
let displayPrice = document.getElementById('activities-cost'); // total p element
let totalCost = 0; // number, we will add to

//console.log(activities); 
//console.log(initialCost); 
//console.log(totalCost); // 0


activities.addEventListener('change', e => {

    let dataCost = e.target.getAttribute('data-cost');
    dataCost = parseInt(dataCost); // price of activity
    
/*     console.log(totalCost);
    console.log(dataCost);
    console.log(totalCost += dataCost); */

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

/* console.log(payment); 
console.log(paymentOptions); 
console.log(paymentOptions[1]);// [0] is select payment, [1] credit card, [2] paypal , [3] bitcoin
console.log(paypal);
console.log(bitcoin);   */

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
* check for user requirements
* check for valid inputs
*
*/

const form = document.querySelector('form');
const nameInput = document.getElementById('name');
//const nameInputValue = nameInput.value;
const emailInput = document.getElementById('email');
const cardNumInput = document.getElementById('cc-num');
const zipcodeInput = document.getElementById('zip');
const cvvInput = document.getElementById('cvv');




form.addEventListener('submit', e =>  { //attaches event handler
    //e.preventDefault();

    isValidName(nameInput);

    function isValidName(name) { // checks the name
        const nameInputValue = name.value;
        console.log(nameInputValue);
        const nameREGEX = /[^\s][a-z|\s]*$/i;
        console.log(nameREGEX);
        let nameResult = nameREGEX.test(nameInputValue);
        console.log(nameResult);
        if (nameResult === true) {
            console.log(true);
            console.log('form has been submitted');
            return true;
            //return console.log(validName); 
        } else {
            console.log(false);
            console.log('name invalid. try again');
            e.preventDefault();
            //validName === false;
            //console.log(validName);
            return false;
        }
    }



/*     if (validName === false) {
        e.preventDefault(); 
    } */


    //isValidEmail(emailInput.value);



    //activities





/*     if (creditcard.hidden = false) {   //if credit cards is selected, then do...
    isValidCardNum(cardNumInput.value);
    isValidZipcode(zipcodeInput.value);
    isValidCvv(cvvInput.value);
    } */


    
   
    // if invalid call  e.preventDefault(); // stop default submittion

    //console.log('form has been submitted');
    
});


/* function isValidName(name) { // checks the name
        
    if (/^[^\s][a-z|\s]+$/i.test(name)) {
        return true;
        //return console.log(validName); 
    } else {
        return console.log(false);
        //e.preventDefault();
    }
   //return validName;
} */


function isValidEmail(email) { // checks the email

    if (/^[^@\s]+@[^@\s]+\.(com)$/i.test(email)) {
        return console.log(true); 
    } else {
        return console.log(false);
        //e.preventDefault();
    }
}

//const activityCheckbox = activities.children[1];

//function isValidActivities(activities) { // checks the actitivy is selected
    let checkedItems = 0; // *** move to global scope
    activities.addEventListener('change', e => {
        const checkbox = e.target.checked;
        if (checkbox === true) {
            // add attribute??
            checkedItems = checkedItems + 1;
            console.log(checkedItems);
            //return console.log(false); // 
        } else if (checkbox === false) {
            checkedItems -= 1;
            console.log(checkedItems);
        }

        if (checkedItems > 0) { // logs t/f for checked Items
            console.log(true);
        } else {
            console.log(false);
            e.preventDefault();
        }
    })
    //return checkedItems;
//}


    // if checked item <1 then return true, if checkedItems = 0 then return false

//}



/* function isValidActivities(activitesCheckbox) { // checks the cvv

    // LOOP THROUGH THE ACTIVITES HTML COLLECTION
    for (let i = 0; i < activitesCheckbox.length; i++) {
        if (activitesCheckbox[i].checked === false) {
            return console.log(true); 
        } else {
            //return false
            return console.log(false);
            //e.preventDefault();
        }

    }

} */

function isValidCardNum(cardNum) { // checks the card number

    if (/^\d{13,16}$/.test(cardNum)) {
        return console.log(true); 
    } else {
        return console.log(false);
        //e.preventDefault();
    }
}

function isValidZipcode(zipcode) { // checks the zipcode

    if (/^\d{5}$/.test(zipcode)) {
        return console.log(true); 
    } else {
        return console.log(false);
        //e.preventDefault();
    }
}

function isValidCvv(cvv) { // checks the cvv

    if (/^\d{3}$/.test(cvv)) {
        return console.log(true); 
    } else {
        return console.log(false);
        //e.preventDefault();
    }
}


/* 

regular expressions 

name - cannot be blank
/^[a-z|\s]+$/i

email address - dave@teamtreehouse.com
    resource - https://huddle.zendesk.com/hc/en-us/articles/360001092034-Special-characters-not-supported-in-email-addresses-

/^[^@\s]+@[^@\s]+\.(com)$/i - all characters except @ sign or space

Register for Activities - at least one select
activites.selected = true;

if creditcard 
if paymentOptions[1].selected = true;
then - 

credit card field - 13 to 16 number {13,16}, ^ dashes, ^ spaces
/^\d{13,16}[^\-]+[^\s]+$/
/^\d{13,16}$/

zipcode
/^\d{5}$/

cvv 
/^\d{3}$/


*/


