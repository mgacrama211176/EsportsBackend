import multer from "multer";

export const upload = () => {
  // Create a storage engine for multer
  const storage = multer.memoryStorage(); // Using memory storage, you can also configure multer to store files on disk

  // Create the multer upload instance
  return multer({ storage });
};
