const express = require('express');
const app = express();
const errorMiddleware = require('./middlewares/error');
const cookieParser = require('cookie-parser');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, "config/config.env") });

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: ["http://localhost:3000", "https://finall-project-3.onrender.com"],
    credentials: true
}));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ROUTES
const products = require('./routes/product');
const auth = require('./routes/auth');
const order = require('./routes/order');
const payment = require('./routes/payment');

app.use('/api/v1', products);
app.use('/api/v1', auth);
app.use('/api/v1', order);
app.use('/api/v1', payment);

// HOME ROUTE (safe)
app.get('/', (req, res) => {
    res.send("Hello from Sanizz-ecommerce api");
});

// PRODUCTION – SERVE FRONTEND
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, '../frontend/build')));

    app.get('*', (req, res) => {
        res.sendFile(
            path.resolve(__dirname, '../frontend/build/index.html')
        );
    });
}

// ERROR HANDLER (always last)
app.use(errorMiddleware);

module.exports = app;
