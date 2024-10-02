import { openDB } from 'idb';
import { Product } from '@/types';

const dbPromise = openDB('products-store', 1, {
  upgrade(db) {
    db.createObjectStore('products', { keyPath: 'id' });
  },
});

export async function saveProductsToDB(products: Product[]) {
  const db = await dbPromise;
  const tx = db.transaction('products', 'readwrite');
  for (let product of products) {
    await tx.store.put(product);
  }
  await tx.done;
}

export async function getCachedProducts(): Promise<Product[]> {
  const db = await dbPromise;
  return await db.getAll('products');
}
