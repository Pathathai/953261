type Item = {
    id: number;
    name: string;
    description: string;
};
export declare function getAllItems(): Item[];
export declare function addItem(item: Item): void;
export declare function getItem(id: number): Item | undefined;
export declare function getItemsByName(name: string): Item[];
export {};
//# sourceMappingURL=fileDb.d.ts.map