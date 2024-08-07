import passport from "passport";
import { Strategy as CustomStrategy } from "passport-custom";

passport.use(
	"custom",
	new CustomStrategy((req, done) => {
		// Implement your custom authentication logic here
		const user = { id: 1, username: "testuser" }; // Replace with actual user fetching logic
		done(null, user);
	})
);

export default passport;
