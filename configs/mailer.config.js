const nodemailer = require('nodemailer');

const host = process.env.HOST || 'http://localhost:3000';
const user = process.env.NM_USER;

const transport = nodemailer.createTransport(
	{
		host: "smtp.ionos.es", 
		auth: {
		  user: user,
		  pass: process.env.NM_PASS
		}
		// service: 'Gmail',
		// auth: {
		// 	user: user,
		// 	pass: process.env.NM_PASS
		// }
	}
)

module.exports.sendValidationEmail = (email, activationToken, name) => {
	transport.sendMail({
		to: email,
		from: `Kiui Register <${user}>`,
		subject: 'Verify your email adress',
		html: `
		<div style="margin-left: 9em;">
			<img src="https://res.cloudinary.com/dbldxawid/image/upload/v1598465475/Kiui/Logo_Rosa_cgt1ws.png" alt="Kiui Black" width="100px" heigth="auto" style="margin: 10px 10px;">
			<h2>Verify your email address</h2>
			<p>Hi ${name}</p>
			<p>Thanks for signing up to Kiui App.</p>
			<p>To get access to your account please verify your email address by clicking the link below.</p>
			<br><br>
			<a href="${host}/activate/${activationToken}" style="margin: 30px 30px; padding: 10px 20px; color: white; background-color: lightblue; border-radius: 5px;">Click here</a>
			<br><br>
			<p>Regards,</br>
			The Kiui App Team</p>
		</div>
		`
	}, function(error, info){
		if (error) {
		  console.log(error);
		} else {
		  console.log('Email sent: ' + info.response);
		}
	  })
}