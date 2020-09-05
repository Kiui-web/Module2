const firebase = require('firebase')
const firebaseui = require('firebaseui')

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

const uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function(authResult, redirectUrl) {

      const user = authResult.user;
              //console.log(result.user.phoneNumber);
            //   $('#inset_form').html(`<form action="/firebase" name="login" method="post"><input type="hidden" name="number" value="${user.phoneNumber} 
            //       " /><input type="submit" value="Enviar" name="send" id="send" style="display:none;"></form>`);
            //   document.forms['login'].submit();

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
