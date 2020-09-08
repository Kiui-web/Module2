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

const uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function(authResult, redirectUrl) {

      const user = authResult.user;
      redirectUrl = `/users?number=${user.phoneNumber}`


      window.location.href = redirectUrl
      return false;
    },
    uiShown: function() {
      // The widget is rendered.
      // Hide the loader.
      document.getElementById('loader').style.display = 'none';
    }
  },
  // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
  signInFlow: 'popup',
  queryParameterForWidgetMode: 'mode',
        // Query parameter name for sign in success url.
  //queryParameterForSignInSuccessUrl: '/events?mode=select&signInSuccessUrl=/events?number=',
  signInSuccessUrl: `/users`,
  signInOptions: [{
    provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
    // The default selected country.
    defaultCountry: 'ES'
    }
    
  ],
  
  // Terms of service url.
  tosUrl: '<your-tos-url>',
  // Privacy policy url.
  privacyPolicyUrl: '<your-privacy-policy-url>'
};

ui.start('#firebaseui-auth-container', uiConfig);















