// ============================================================
// 文件存储层 — IndexedDB 存储图片和视频
// 参考: MDN IndexedDB best practices
// ============================================================

const DB_NAME = "youguang_files";
const DB_VERSION = 1;
const STORE_NAME = "files";

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// 存储文件，返回唯一 id
export async function storeFile(file: File): Promise<string> {
  const id = crypto.randomUUID() + "_" + file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    const entry = {
      id,
      name: file.name,
      type: file.type,
      size: file.size,
      data: file, // 直接存 File 对象
      createdAt: Date.now(),
    };
    const request = store.put(entry);
    request.onsuccess = () => resolve(id);
    request.onerror = () => reject(request.error);
    tx.oncomplete = () => db.close();
  });
}

// 从 base64 data URL 创建并存储文件
export async function storeDataUrl(dataUrl: string, fileName: string): Promise<string> {
  const res = await fetch(dataUrl);
  const blob = await res.blob();
  const file = new File([blob], fileName, { type: blob.type });
  return storeFile(file);
}

// 读取文件并返回 ObjectURL
export async function getFileUrl(id: string): Promise<string | null> {
  if (!id || typeof id !== "string") return null;
  // 如果已经是 data: 或 / 开头的路径，直接返回（兼容旧数据）
  if (id.startsWith("data:") || id.startsWith("/")) return id;
  
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);
    const request = store.get(id);
    request.onsuccess = () => {
      const entry = request.result;
      if (entry && entry.data) {
        resolve(URL.createObjectURL(entry.data));
      } else {
        resolve(null);
      }
      db.close();
    };
    request.onerror = () => { resolve(null); db.close(); };
  });
}

// 获取文件原始 File 对象（用于 video src）
export async function getFile(id: string): Promise<File | null> {
  if (!id || typeof id !== "string") return null;
  if (id.startsWith("data:") || id.startsWith("/")) return null;
  
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);
    const request = store.get(id);
    request.onsuccess = () => {
      const entry = request.result;
      resolve(entry?.data || null);
      db.close();
    };
    request.onerror = () => { resolve(null); db.close(); };
  });
}

// 删除文件
export async function deleteFile(id: string): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    store.delete(id);
    tx.oncomplete = () => { db.close(); resolve(); };
    tx.onerror = () => { db.close(); reject(tx.error); };
  });
}

// 获取所有文件列表
export async function listFiles(): Promise<Array<{ id: string; name: string; type: string; size: number; createdAt: number }>> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);
    const request = store.getAll();
    request.onsuccess = () => {
      const entries = request.result;
      resolve(entries.map(e => ({
        id: e.id,
        name: e.name,
        type: e.type,
        size: e.size,
        createdAt: e.createdAt,
      })));
      db.close();
    };
    request.onerror = () => { resolve([]); db.close(); };
  });
}

// 清除所有文件
export async function clearAllFiles(): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    store.clear();
    tx.oncomplete = () => { db.close(); resolve(); };
    tx.onerror = () => { db.close(); reject(tx.error); };
  });
}
