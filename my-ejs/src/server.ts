import express from "express";
import path from "path";

const app = express();
const PORT = 8000;

// Tell Express to use EJS
app.set("view engine", "ejs");

// Important: make views folder work after compiling to /dist
app.set("views", path.join(__dirname, "..", "views"));

app.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.get("/fruits", function (req, res) {
  const fruits = [
    { name: "Apple", color: "red" },
    { name: "Banana", color: "yellow" },
    { name: "Cherries", color: "red" },
    { name: "Durian", color: "yellow" },
  ];

  res.render("index", {
    title: "Home",
    fruits: fruits,
  });
});

app.get("/fruits/:id", function (req, res) {
  const fruitId = parseInt(req.params.id);
  const fruits = [
    { id: 1, name: "Apple", color: "red", description: "An apple a day keeps the doctor away." },
    { id: 2, name: "Banana", color: "yellow", description: "Bananas are high in potassium." },
    { id: 3, name: "Cherries", color: "red", description: "Cherries are delicious and rich in antioxidants." },
    { id: 4, name: "Durian", color: "yellow", description: "Durian is known as the king of fruits." },
  ];

  if (fruitId >= 1 && fruitId < fruits.length) {
    res.render("fruitDetail", {
      fruit: fruits[fruitId],
    });
  } else {
    res.status(404).send("Fruit not found");
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
