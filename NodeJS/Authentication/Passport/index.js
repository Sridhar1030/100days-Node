import express from "express";
import mongoose from "mongoose";
import session from "express-session";
import passport from "passport";
import LocalStrategy from "passport-local";
import bcrypt from "bcryptjs";

const app = express();
app.use(express.json()); // Middleware to parse JSON bodies

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/passport-auth", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

// Define User Schema
const UserSchema = new mongoose.Schema({
	username: String,
	password: String,
});

// Compile the User model
const User = mongoose.model("User", UserSchema);

// Middleware for sessions
app.use(
	session({
		secret: "secret",
		resave: false,
		saveUninitialized: false,
	})
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Define Local Strategy
passport.use(
	new LocalStrategy(async (username, password, done) => {
		try {
			const user = await User.findOne({ username });
			if (!user) {
				return done(null, false, { message: "Incorrect username" });
			}
			const isMatch = await bcrypt.compare(password, user.password);
			if (!isMatch) {
				return done(null, false, { message: "Incorrect password" });
			}
			return done(null, user);
		} catch (err) {
			return done(err);
		}
	})
);

// Serialize and deserialize user
passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
	try {
		const user = await User.findById(id);
		done(null, user);
	} catch (err) {
		done(err);
	}
});

// Routes
app.post("/register", async (req, res) => {
	try {
		const hashedPassword = await bcrypt.hash(req.body.password, 10);
		const newUser = new User({
			username: req.body.username,
			password: hashedPassword,
		});
		await newUser.save();
		res.status(201).send("User registered");
	} catch (err) {
		res.status(400).send(err.message);
	}
});

app.post(
	"/login",
	passport.authenticate("local", {
		successRedirect: "/dashboard",
		failureRedirect: "/login",
		failureFlash: false,
	})
);

app.get("/dashboard", (req, res) => {
	if (req.isAuthenticated()) {
		res.send("Welcome to the dashboard!");
	} else {
		res.redirect("/login");
	}
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
