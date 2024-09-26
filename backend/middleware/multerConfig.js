import multer from 'multer';
import path from 'path';

// Set up storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'assets/'); // Folder where files will be stored
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

// Set up file filter (optional, to limit file types)
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } 
    else {
        cb(new Error('Not an image! Please upload an image.'), false);
    }
};

// Initialize multer middleware
const upload = multer({ storage: storage, fileFilter: fileFilter });

export default upload;