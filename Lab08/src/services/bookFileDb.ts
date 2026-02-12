import fs from "fs";
import path from "path";

const dbFilePath = path.join(process.cwd(), "data", "books.json");

type Book = {
  id: number;
  title: string;
};

export function getAllBooks(): Book[] {
  try {
    const data = fs.readFileSync(dbFilePath, "utf-8");
    const parsedData = JSON.parse(data);
    return parsedData.books;
  } catch (error) {
    console.error("Error reading books file:", error);
    return [];
  }
}

export function getBook(id: number): Book {
  const books = getAllBooks();
  const book = books.find((book) => book.id === id);
  if (!book) {
    throw new Error(`Book with id ${id} not found`);
  }
  return book;
}

export function getBooksByTitle(title: string): Book[] {
  const books = getAllBooks();
  return books.filter((book) => book.title === title);
}

export function addBook(book: Book): void {
  const books = getAllBooks();
  books.push(book);
  const data = { books };
  try {
    fs.writeFileSync(dbFilePath, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.error("Error writing books file:", error);
  }
}
