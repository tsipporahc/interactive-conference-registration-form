
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
console.log(creditcard);

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







