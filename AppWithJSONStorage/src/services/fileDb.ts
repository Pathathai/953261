import fs from 'fs';
import path from 'path';

const DATA_DIR = process.env.DATA_DIR || path.join(process.cwd(), "data");
fs.mkdirSync(DATA_DIR, { recursive: true });

const dbFilePath = path.join(DATA_DIR, "items.json");

type Item = {
  id: number;
  name: string;
  description: string;
};

export function getAllItems(): Item[] {
   try {
      const data = fs.readFileSync(dbFilePath, "utf-8");
      const parsedData = JSON.parse(data);
      return parsedData.items;
   } catch (error) {
       console.error("Error reading items file:", error);
   return [];
   }
}


export function addItem(item: Item): void {
    const items = getAllItems();
    items.push(item);
    const data = { items };
    try {
       fs.writeFileSync(dbFilePath, JSON.stringify(data, null, 2), "utf-8");
    } catch (error) {
      console.error("Error writing items file:", error);
   }
}

export function getItem(id: number) {
  const items = getAllItems();
  return items.find(item => item.id === id);
}

export function getItemsByName(name: string): Item[] {
  const items = getAllItems();
  return items.filter(item => item.name === name);
}


