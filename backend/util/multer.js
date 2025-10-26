import multer from 'multer';
const fileFilter = (req, file, cb) => {
 
  if (file.mimetype.startsWith('image/') || file.mimetype === 'application/pdf') {
    cb(null, true); 
  } else {
    req.fileValidationError = 'Only image (.jpg, .png, etc) and .pdf files are allowed!';
    cb(null, false); 
  }
};

const storage = multer.memoryStorage(); // Keep this as memoryStorage

export  const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter 
});

