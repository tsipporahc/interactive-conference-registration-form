
// "Name" feild - When the page first loads, the first text field should have the focus state by default to prompt the user.

document.getElementById('name').focus();

// "Job Role" section

//when user selects other,  then focus on 'other' text
// hide/ grey out 'other' text (default state)

document.getElementById('other-job-role').style.display = "none";


// select element listens for changes to its state

const jobRole = document.querySelector('select[id="title"]');

