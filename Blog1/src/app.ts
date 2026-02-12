import express from "express";
import lodash from "lodash";
import path from "path";

const homeStartingContent =
  "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent =
  "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent =
  "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();
const PORT = 8000;
let posts: { id: string; title: string; body: string; likes: number }[] = [];

// Tell Express to use EJS
app.set("view engine", "ejs");

// Important: make views folder work after compiling to /dist
app.set("views", path.join(__dirname, "..", "views"));

// Parse HTML form submissions (Content-Type: application/x-www-form-urlencoded)
// e.g., <form method="POST"> from EJS pages -> data available in req.body
app.use(express.urlencoded({ extended: true }));

// Serve static files from the "public" folder
// e.g., /styles.css, /like.js, /images/...  -> accessible via /styles.css, /like.js, etc.
app.use(express.static("public"));

// Parse JSON request bodies (Content-Type: application/json)
// Needed for fetch() POST/PUT requests that send JSON -> data available in req.body
app.use(express.json());

app.get("/", (req, res) => {
  res.render("home", { startingContent: homeStartingContent, posts: posts });
});

app.get("/about", (req, res) => {
  res.render("about", { aboutContent: aboutContent });
});

app.get("/contact", (req, res) => {
  res.render("contact", { contactContent: contactContent });
});

app.get("/compose", (req, res) => {
  res.render("compose");
});
app.get("/posts/:postName", (req, res) => {
  const requestedTitle = lodash.lowerCase(req.params.postName);

  posts.forEach((post) => {
    const storedTitle = lodash.lowerCase(post.title);

    if (storedTitle === requestedTitle) {
      res.render("post", { title: post.title, body: post.body });
    }
  });
});

app.post("/compose", (req, res) => {
  const postTitle = req.body.postTitle;
  const postBody = req.body.postBody;

  console.log("Title: " + postTitle);
  console.log("Body: " + postBody);
  console.log("id: " + Date.now().toString());
  posts.push({ id: Date.now().toString(), title: postTitle, body: postBody, likes: 0 });

  res.redirect("/");
});

app.post("/posts/:postId/like", (req, res) => {
  const postId = req.params.postId;
  console.log("Like request for post ID:", postId);
  const post = posts.find((p) => p.id === postId);
  if (post) {
    post.likes += 1;
    res.status(200).json({ likes: post.likes });
  } else {
    res.status(404).json({ error: "Post not found" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
