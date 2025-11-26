import express, { Request, Response } from "express";

const app = express();
const port = 3000;

app.get("/", (req: Request, res: Response) => {
  // res.status(200).json({message: 'Hello, World!'});
  res.writeHead(200, { "Content-Type": "text/html" });
  res.write("<meta charset='UTF-8'>");
  res.write("<title>Express with TypeScript</title>");
  res.write("<style> h1 { color: #3498db; } h2 { color: #2ecc71; } </style>");
  res.end("<h1>Hello World!.</h1> <h2>Welcome to Express with TypeScript.</h2>");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
