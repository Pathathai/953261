import express, { Request, Response } from "express";

const app = express();
app.use(express.urlencoded({ extended: true })); // parse form data

app.get("/", (req: Request, res: Response) => {
  const html = `
  <h1>Joke Generator</h1>
  <form action="/" method="POST">
    <label for="category">Select Joke Category:</label>
    <select name="category" id="category">
      <option value="Programming">Programming</option>
      <option value="Miscellaneous">Miscellaneous</option>
      <option value="Dark">Dark</option>
      <option value="Pun">Pun</option>
      <option value="Spooky">Spooky</option>
      <option value="Christmas">Christmas</option>
    </select>
    <br/><br/>
    <label for="flag">Select Blacklist Flag:</label>
    <select name="flag" id="flag">
      <option value="nsfw">NSFW</option>
      <option value="religious">Religious</option>
      <option value="political">Political</option>
      <option value="racist">Racist</option>
      <option value="sexist">Sexist</option>
      <option value="explicit">Explicit</option>
    </select>
    <br/><br/>
    <button type="submit">Get Joke</button>
  </form>`;
  res.send(html);
});

app.post("/", async (req: Request, res: Response) => {
  const { category, flag } = req.body as { category: string; flag: string };
  const url = `https://v2.jokeapi.dev/joke/${category}?blacklistFlags=${flag}&type=twopart`;

  const apiRes = await fetch(url);
  const joke = await apiRes.json();

  res.send(`<h1>Here is a joke for you.</h1>` +
           `<p>Setup: ${joke.setup}</p>` +
           `<p>Delivery: ${joke.delivery}</p>`);
});

app.listen(3030, () => console.log("http://localhost:3030"));
