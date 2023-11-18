// db.ts
import { Transaction } from "@/types";
import Dexie, { Table } from "dexie";

export class CustomDexie extends Dexie {
  transactions!: Table<Transaction>;

  constructor() {
    super("Transactions");
    this.version(1).stores({
      transactions: "id, orderId",
    });
  }
}

export const db = new CustomDexie();
