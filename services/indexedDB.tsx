import { openDB, IDBPDatabase } from 'idb';
import { Product } from '@/types';

let dbPromise: Promise<IDBPDatabase<any>> | null = null;

// Only initialize IndexedDB in the browser
if (typeof window !== 'undefined') {
  dbPromise = openDB('products-store', 1, {
    upgrade(db) {
      db.createObjectStore('products', { keyPath: 'id' });
    },
  });
}

export async function saveProductsToDB(products: Product[]) {
  if (!dbPromise) return; 
  const db = await dbPromise;
  const tx = db.transaction('products', 'readwrite');
  for (let product of products) {
    await tx.store.put(product);
  }
  await tx.done;
}

export async function getCachedProducts(): Promise<Product[]> {
  if (!dbPromise) return [];
  const db = await dbPromise;
  return await db.getAll('products');
}
