import multer from "multer";

// ✅ store uploaded files in memory instead of writing to disk
const storage = multer.memoryStorage();

export const upload = multer({ storage });