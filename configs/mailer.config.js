const nodemailer = require('nodemailer');

const host = process.env.HOST || 'http://localhost:3000';
const user = process.env.NM_USER;

const transport = nodemailer.createTransport(
	{
		service: 'Gmail',
		auth: {
			user: user,
			pass: process.env.NM_PASS
		}
	}
)

module.exports.sendValidationEmail = (email, activationToken, name) => {
	transport.sendMail({
		to: email,
		from: `Kiui Register <${user}>`,
		subject: 'Verify your email adress',
		html: `
		<div style="margin-left: 5em;">
			<h2>Verify your email address</h2>
			<p>Hi ${name}</p>
			<p>Thanks for signing up to Kiui App.</p>
			<p>To get access to your account please verify your email address by clicking the link below.</p>

			
			<p>Click on the button below to activate your account ❤️</.>
			<a href="${host}/activate/${activationToken}" style="padding: 10px 20px; color: white; background-color: lightblue; border-radius: 5px;">Click here</a>
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