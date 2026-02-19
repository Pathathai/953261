import fs from 'fs';
import path from 'path';
import { Item } from '../models/Item';

const dbFilePath = path.join(process.cwd(),"data", "items.json");


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


