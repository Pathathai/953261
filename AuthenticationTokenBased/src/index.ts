import express from 'express';
import path from 'path';
import cookieParser from "cookie-parser";
import { showProduct, showLogin, login, logout } from './controllers/loginController';
import { authenticateToken } from './middleware/authentication';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(process.cwd(), "public")));
app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "src", "views"));


app.use(cookieParser());


// --- Pages ---
app.get("/", (req, res) => res.render("home"));
app.get("/login", showLogin);
app.post("/login", login);
app.get("/product", authenticateToken, showProduct);
app.post("/logout", logout);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});