import express, { Request, Response } from "express";

const app = express();
const port = 3000;

app.get("/", (req: Request, res: Response) => {
  // res.status(200).json({message: 'Hello, World!'});
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
