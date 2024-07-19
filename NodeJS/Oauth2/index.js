const express = require('express');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const app = express();

// Configure session middleware
app.use(session({
    secret: 'your_session_secret',
    resave: false,
    saveUninitialized: true
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Configure Google OAuth2 strategy
passport.use(new GoogleStrategy({
    clientID: 'your_client_id',
    clientSecret: 'your_client_secret',
    callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
    // Optional: Save user profile in your database
    return done(null, profile);
}));

// Serialize user into session
passport.serializeUser((user, done) => {
    done(null, user);
});

// Deserialize user from session
passport.deserializeUser((user, done) => {
    done(null, user);
});

// Routes
app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
        // Successful authentication, redirect to success page
        res.redirect('/dashboard');
    });

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

app.get('/dashboard', (req, res) => {
    if (req.isAuthenticated()) {
        res.send(`Welcome, ${req.user.displayName}`);
    } else {
        res.redirect('/auth/google');
    }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
