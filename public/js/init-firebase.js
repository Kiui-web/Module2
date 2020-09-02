const signInButton = document.getElementById('sign-in-button')
const confirmCode = document.getElementById('confirm-code')
const phoneNumberInput = document.getElementById('phoneNumber')
const codeInput = document.getElementById('code')
 
 // Your web app's Firebase configuration
  var firebaseConfig = {
    //AQUI PONER CLAVES FIREBASE
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');

// This function runs when the 'sign-in-button' is clicked
// Takes the value from the 'phoneNumber' input and sends SMS to that phone number
function submitPhoneNumberAuth() {
  // We are using the test phone numbers we created before
  // var phoneNumber = document.getElementById("phoneNumber").value;
  const phoneNumber = phoneNumberInput.value;
  var appVerifier = window.recaptchaVerifier;
  firebase
    .auth()
    .signInWithPhoneNumber(phoneNumber, appVerifier)
    .then(function(confirmationResult) {
        window.confirmationResult = confirmationResult;
    })
    .catch(function(error) {
        console.log(error);
    });
}

// This function runs when the 'confirm-code' button is clicked
// Takes the value from the 'code' input and submits the code to verify the phone number
// Return a user object if the authentication was successful, and auth is complete
function submitPhoneNumberAuthCode() {
  // We are using the test code we created before
  // var code = document.getElementById("code").value;
  var code = codeInput.value;
  confirmationResult
    .confirm(code)
    .then(result => {
        var user = result.user;
        console.log(result);
        //window.location.replace("http://localhost:3000/events");
    })
    .catch(function(error) {
        console.log(error);
    });
}


//This function runs everytime the auth state changes. Use to verify if the user is logged in
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
      console.log("USER LOGGED IN")
  } else {
      // No user is signed in.
      console.log("USER NOT LOGGED IN")
  }
});


signInButton.addEventListener('click', submitPhoneNumberAuth)
confirmCode.addEventListener('click', submitPhoneNumberAuthCode)
















