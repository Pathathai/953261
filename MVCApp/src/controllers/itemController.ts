import { Request, Response } from 'express';
import { getAllItems, addItem, getItem, getItemsByName } from '../services/fileDb';

export const listItems = (req: Request, res: Response) => {
  const items = getAllItems();
  res.json(items);
};

export const searchItems = (req: Request, res: Response) => {
  const name = req.query.name as string;
  const items = getItemsByName(name);
  //res.json(items);
  res.render('itemsList', { items, title: `Search results for "${name}"` });
};

export const getItemById = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const item = getItem(id);
  if (!item) return res.status(404).json({ message: 'Item not found' });
  res.json(item);
};

export const createItem = (req: Request, res: Response) => {
  const newItem = req.body;
  addItem(newItem);
  res.status(201).json({ message: 'Item added successfully' });
};
