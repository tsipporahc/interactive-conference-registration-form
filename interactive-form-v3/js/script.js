
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

const colorOptions = color.children; // returns an html collection

design.addEventListener('change', e => {
    color.disabled = false; // enables color dropdown


    for (let i = 1; i < colorOptions.length; i++ ) {
        
        const dataTheme = colorOptions[i].getAttribute('data-theme');
        const designValue = e.target.value;

        console.log(designValue);
        console.log(dataTheme);

        if (designValue === dataTheme) { // show data theme options
            colorOptions[i].hidden = false; // hidden is a property
            colorOptions[i].selected = true; // ?? What does this mean? Add a selected attribute to true. 
        } 
        else {
            colorOptions[i].hidden = true;
            colorOptions[i].selected = false;
            
        }
    }
});


/* 
*
* "Register for Activities" Section
*
* select element listens for changes to its state
* job role - drop down selection menu 
*
*/