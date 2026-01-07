const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const {
  getProducts,
  newProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  createReview,
  getReviews,
  deleteReview,
  getAdminProducts,
} = require("../controllers/productController");

const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../middlewares/authenticate");


// ================================
// MULTER CONFIG (SAFE)
// ================================

// Ensure upload directory exists (important for Render)
const uploadDir = path.join(__dirname, "..", "uploads", "product");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});


// ================================
// PUBLIC ROUTES
// ================================

router.get("/products", getProducts);

router.get("/product/:id", getSingleProduct);

router.put("/review", isAuthenticatedUser, createReview);


// ================================
// ADMIN ROUTES
// ================================

router.post(
  "/admin/product/new",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  upload.array("images", 5),
  newProduct
);

router.get(
  "/admin/products",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  getAdminProducts
);

router.put(
  "/admin/product/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  upload.array("images", 5),
  updateProduct
);

router.delete(
  "/admin/product/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  deleteProduct
);

router.get(
  "/admin/reviews",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  getReviews
);

router.delete(
  "/admin/review",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  deleteReview
);

module.exports = router;
