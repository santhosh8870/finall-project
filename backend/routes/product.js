const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");

const {
    getProducts,
    newProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    createReview,
    getReviews,
    deleteReview,
    getAdminProducts
} = require("../controllers/productController");

const {
    isAuthenticatedUser,
    authorizeRoles
} = require("../middlewares/authenticate");

/* ==========================
   MULTER CONFIG
========================== */
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "..", "uploads/product"));
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

/* ==========================
   PUBLIC ROUTES
========================== */

// GET ALL PRODUCTS
// /api/v1/products
router.get("/products", getProducts);

// GET SINGLE PRODUCT
// /api/v1/product/:id
router.get("/product/:id", getSingleProduct);

// CREATE / UPDATE REVIEW
// /api/v1/review
router.put("/review", isAuthenticatedUser, createReview);

/* ==========================
   ADMIN ROUTES
========================== */

// CREATE PRODUCT
// /api/v1/admin/product/new
router.post(
    "/admin/product/new",
    isAuthenticatedUser,
    authorizeRoles("admin"),
    upload.array("images"),
    newProduct
);

// GET ALL PRODUCTS (ADMIN)
// /api/v1/admin/products
router.get(
    "/admin/products",
    isAuthenticatedUser,
    authorizeRoles("admin"),
    getAdminProducts
);

// UPDATE PRODUCT
// /api/v1/admin/product/:id
router.put(
    "/admin/product/:id",
    isAuthenticatedUser,
    authorizeRoles("admin"),
    upload.array("images"),
    updateProduct
);

// DELETE PRODUCT
// /api/v1/admin/product/:id
router.delete(
    "/admin/product/:id",
    isAuthenticatedUser,
    authorizeRoles("admin"),
    deleteProduct
);

// GET REVIEWS
// /api/v1/admin/reviews
router.get(
    "/admin/reviews",
    isAuthenticatedUser,
    authorizeRoles("admin"),
    getReviews
);

// DELETE REVIEW
// /api/v1/admin/review
router.delete(
    "/admin/review",
    isAuthenticatedUser,
    authorizeRoles("admin"),
    deleteReview
);

module.exports = router;
