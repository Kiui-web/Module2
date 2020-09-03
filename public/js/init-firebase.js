const signInButton = document.getElementById('sign-in-button')
const confirmCode = document.getElementById('confirm-code')
const phoneNumberInput = document.getElementById('phoneNumber')
const codeInput = document.getElementById('code')
 
 // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBM3T5U6HHsoVRek7JtwxSzlgyof247xgg",
    authDomain: "protean-set-284407.firebaseapp.com",
    databaseURL: "https://protean-set-284407.firebaseio.com",
    projectId: "protean-set-284407",
    storageBucket: "protean-set-284407.appspot.com",
    messagingSenderId: "733522398368",
    appId: "1:733522398368:web:b80cd519491e23501b8dc5",
    measurementId: "G-NZMC55PR6E"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const ui = new firebaseui.auth.AuthUI(firebase.auth());

// window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');

// recaptchaVerifier.render().then(function(widgetId) {
//   window.recaptchaWidgetId = widgetId;
// });

// // This function runs when the 'sign-in-button' is clicked
// // Takes the value from the 'phoneNumber' input and sends SMS to that phone number
// function submitPhoneNumberAuth() {
//   // We are using the test phone numbers we created before
//   // var phoneNumber = document.getElementById("phoneNumber").value;
//   const phoneNumber = phoneNumberInput.value;
//   var appVerifier = window.recaptchaVerifier;
//   firebase
//     .auth()
//     .signInWithPhoneNumber(phoneNumber, appVerifier)
//     .then(function(confirmationResult) {
//         window.confirmationResult = confirmationResult;
//     })
//     .catch(function(error) {
//         console.log(error);
//     });
// }

// // This function runs when the 'confirm-code' button is clicked
// // Takes the value from the 'code' input and submits the code to verify the phone number
// // Return a user object if the authentication was successful, and auth is complete
// function submitPhoneNumberAuthCode() {
//   // We are using the test code we created before
//   // var code = document.getElementById("code").value;
//   var code = codeInput.value;
//   confirmationResult
//     .confirm(code)
//     .then(result => {
//         const user = result.user;
//         //console.log(result.user.phoneNumber);
//         $('#inset_form').html(`<form action="/firebase" name="login" method="post"><input type="hidden" name="number" value="${user.phoneNumber} 
//             " /><input type="submit" value="Enviar" name="send" id="send" style="display:none;"></form>`);
//         document.forms['login'].submit();
//     })
//     .catch(function(error) {
//         console.log(error);
//     });
// }


// //This function runs everytime the auth state changes. Use to verify if the user is logged in
// firebase.auth().onAuthStateChanged(function(user) {
//   if (user) {
//       console.log("USER LOGGED IN")
//   } else {
//       // No user is signed in.
//       console.log("USER NOT LOGGED IN")
//   }
// });


// signInButton.addEventListener('click', submitPhoneNumberAuth)
// confirmCode.addEventListener('click', submitPhoneNumberAuthCode)



const uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function(authResult, redirectUrl) {

      const user = authResult.user;
              //console.log(result.user.phoneNumber);
              $('#inset_form').html(`<form action="/firebase" name="login" method="post"><input type="hidden" name="number" value="${user.phoneNumber} 
                  " /><input type="submit" value="Enviar" name="send" id="send" style="display:none;"></form>`);
              document.forms['login'].submit();

      console.log(user.phoneNumber);
      console.log(redirectUrl);
      // User successfully signed in.
      // Return type determines whether we continue the redirect automatically
      // or whether we leave that to developer to handle.
      return true;
    },
    uiShown: function() {
      // The widget is rendered.
      // Hide the loader.
      document.getElementById('loader').style.display = 'none';
    }
  },
  // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
  signInFlow: 'popup',
  signInSuccessUrl: `/events`,
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    firebase.auth.PhoneAuthProvider.PROVIDER_ID
  ],
  // Terms of service url.
  tosUrl: '<your-tos-url>',
  // Privacy policy url.
  privacyPolicyUrl: '<your-privacy-policy-url>'
};

ui.start('#firebaseui-auth-container', uiConfig);















