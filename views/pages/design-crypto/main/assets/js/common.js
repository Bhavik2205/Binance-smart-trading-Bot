window.addEventListener('scroll', () => {
  document.querySelector('.sticky-stick').classList.toggle('activate-scroll', scrollY > 20);
});


var tb1 = document.getElementById('account-name-f').value;
var tb2 = document.getElementById('API-key-f').value.trim();
var tb3 = document.getElementById('API-secret-f').value;
document.getElementById('connect-account-submit').addEventListener('click', () =>{
  // validation
  if (tb1 == "" || tb2 == "" || tb3 == "") {
    document.querySelector('.check-fields').style.backgroundColor = "#de1b00";
    document.querySelector('.check-fields').style.color = "#fff";
    document.querySelector('.check-fields p').innerHTML = "Please fill all the required fields";
  }

  // for api check custom this
  if (tb2 == "123123") {
    document.querySelector('#v-API-key-check i').classList.remove('fa-circle');
    document.querySelector('#v-API-key-check i').classList.add('fa-check');

    document.querySelector('#futures-trading-check i').classList.remove('fa-circle');
    document.querySelector('#futures-trading-check i').classList.add('fa-check');

    document.querySelector('#hedging-mode-check i').classList.remove('fa-circle');
    document.querySelector('#hedging-mode-check i').classList.add('fa-check');

    document.querySelector('#cross-margin-check i').classList.remove('fa-circle');
    document.querySelector('#cross-margin-check i').classList.add('fa-check');
  }
});


// buttons toggle
function leftClickedToggle1(){
  document.querySelector('.toggle-button1').style.left = '0';
  document.querySelector('.toggler-button-left1').classList.add('active');
  document.querySelector('.toggler-button-right1').classList.remove('active');

  if (document.querySelector('.toggler-button-right1').classList.contains('active')) {
    document.querySelector('.loop-settings').classList.add('active');
  }
  else {
    document.querySelector('.loop-settings').classList.remove('active');
  }
}

function rightClickedToggle1(){
  document.querySelector('.toggle-button1').style.left = '50%';
  document.querySelector('.toggler-button-right1').classList.add('active');
  document.querySelector('.toggler-button-left1').classList.remove('active');

  if (document.querySelector('.toggler-button-right1').classList.contains('active')) {
    document.querySelector('.loop-settings').classList.add('active');
  }
  else {
    document.querySelector('.loop-settings').classList.remove('active');
  }
}
// buttons toggle
function leftClickedToggle2(){
  document.querySelector('.toggle-button2').style.left = '0';
  document.querySelector('.toggler-button-left2').classList.add('active');
  document.querySelector('.toggler-button-right2').classList.remove('active');
}

function rightClickedToggle2(){
  document.querySelector('.toggle-button2').style.left = '50%';
  document.querySelector('.toggler-button-right2').classList.add('active');
  document.querySelector('.toggler-button-left2').classList.remove('active');
}


// grid buttons toggle
function gridLeftClickedToggle(){
  document.querySelector('.grid-toggle-button').style.left = '0';
  document.querySelector('.grid-toggler-button-left').classList.add('active');
  document.querySelector('.grid-toggler-button-center').classList.remove('active');
  document.querySelector('.grid-toggler-button-right').classList.remove('active');
}

function gridCenterClickedToggle(){
  document.querySelector('.grid-toggle-button').style.left = '33%';
  document.querySelector('.grid-toggler-button-left').classList.remove('active');
  document.querySelector('.grid-toggler-button-center').classList.add('active');
  document.querySelector('.grid-toggler-button-right').classList.remove('active');
}

function gridRightClickedToggle(){
  document.querySelector('.grid-toggle-button').style.left = '67%';
  document.querySelector('.grid-toggler-button-left').classList.remove('active');
  document.querySelector('.grid-toggler-button-center').classList.remove('active');
  document.querySelector('.grid-toggler-button-right').classList.add('active');
}

// loop-settings
// document.querySelector('.toggler-button-right1').addEventListener('click', () =>{
//   if (document.querySelector('.toggle-button1').style.left === '0') {
//     document.querySelector('#loop-settings').style.display = 'none';
//   }
//   else {
//     document.querySelector('#loop-settings').style.display = 'block';
//   }
// });

// document.getElementById('take-profit-list-add-btn').addEventListener('click', () =>{
//
// });
