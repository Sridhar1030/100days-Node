import nodemailer from "nodemailer";

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: "sridharpillai75@gmail.com", // Replace with your email
		pass: "gvwu uduh nexu dkeg", // Replace with your password
	},
});

// Setup email data
const mailOptions = {
	from: "sridharpillai75@gmail.com", // Sender address
	to: "sridhar.223584101@vcet.edu.in", // List of recipients
	subject: "Hello from Node.js", // Subject line
	text: "Hello, this is a test email from Node.js.", // Plain text body
};

// Send email
transporter
	.sendMail(mailOptions)
	.then((info) => {
		console.log("Email sent:", info.response);
	})
	.catch((error) => {
		console.log("Error occurred:", error);
	});
