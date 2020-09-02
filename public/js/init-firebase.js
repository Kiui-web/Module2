const firebase = require("firebase/app");
const firebaseConfig = {
      apiKey: process.env.FIREBASE_KEY ,
      authDomain: process.env.FIREBASE_AUTHDOMAIN ,
      databaseURL: process.env.FIREBASE_DATABASEURL ,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: process.env.FIREBASE_STORE_BUCKET ,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID ,
      appId: process.env.FIREBASE_APP_ID ,
      measurementId: process.env.FIREBASE_MEASUREMENT_ID 
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();

//     require("firebase/auth");
// require("firebase/firestore");  
const auth = firebase.auth();

window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');

recaptchaVerifier.render().then(widgetId => {
  window.recaptchaWidgetId = widgetId;
})

const sendVerificationCode = () => {
  const phoneNumber = phoneNumberField.value;
  const appVerifier = window.recaptchaVerifier;

  auth.signInWithPhoneNumber(phoneNumber, appVerifier)
  .then(confirmationResult => {
    const sentCodeId = confirmationResult.verificationId;
    signInWithPhoneButton.addEventListener('click', () => signInWithPhone(sentCodeId));
  })
}


const signInWithPhone = sentCodeId => {
  const code = codeField.value;
  const credential = firebase.auth.PhoneAuthProvider.credential(sentCodeId, code);
  auth.signInWithCredential(credential)
  .then(() => {
    window.location.assign('./profile');
  })
  .catch(error => {
    console.error(error);
  })
}

getCodeButton.addEventListener('click', sendVerificationCode);