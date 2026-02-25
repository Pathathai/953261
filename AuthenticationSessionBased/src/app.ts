import express from 'express';
import session from 'express-session';
import path from 'path';
import { loginRoute, loginPost, profileRoute, logoutPost } from './controllers/loginController';
import { requireLogin } from './middleware/authentication';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(process.cwd(), "public")));
app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "src", "views"));


// Configure session middleware
app.use(session({
  secret: 'your-secret-key', // Change this to a secure random string in production
  resave: false,  // Don't save session if unmodified
  saveUninitialized: false, // Don't create session until something stored
  cookie: {
    httpOnly: true,         // Prevents client-side JS from accessing the cookie
    sameSite: 'lax',        // CSRF protection
    maxAge: 60 * 60 * 1000, // 1 hour
    // secure: true, // Enable in production with HTTPS
  },
}));


// --- Pages ---
app.get("/", (req, res) => res.render("home"));
app.get("/login", loginRoute);
app.post("/login", loginPost);
app.get("/profile", requireLogin, profileRoute);
app.post("/logout", logoutPost);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});