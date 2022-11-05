require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cron = require("node-cron");
const connectDB = require("../config/db");
const productRoutes = require("../routes/productRoutes");
const userRoutes = require("../routes/userRoutes");
const adminRoutes = require("../routes/adminRoutes");
const orderRoutes = require("../routes/orderRoutes");
const permissionRoutes = require("../routes/permissionRoutes");
const roleRoutes = require("../routes/roleRoutes");
const categoryRoutes = require("../routes/categoryRoutes");
const couponRoutes = require("../routes/couponRoutes");
const currencyRoutes = require("../routes/currencyRoutes");
const loanRoutes = require("../routes/loanRoutes");
const kassaRoutes = require("../routes/kassaRoutes");
const paymentRoutes = require("../routes/paymentRoutes");
const spendRoutes = require("../routes/spendRoutes");

const kassaController = require("../controller/kassaController");
const { isAuth } = require("../config/auth");

connectDB();
const app = express();

app.set("trust proxy", 1);

app.use(express.json({ limit: "4mb" }));
app.use(helmet());
app.use(cors());

//root route
app.get("/", (req, res) => {
  res.send("App works properly!");
});

//this for route will need for store front, also for admin dashboard
app.use("/api/products/", isAuth, productRoutes);
app.use("/api/category/", isAuth, categoryRoutes);
app.use("/api/coupon/", isAuth, couponRoutes);
app.use("/api/user/", isAuth, userRoutes);
app.use("/api/currency/", isAuth, currencyRoutes);
app.use("/api/permission/", isAuth, permissionRoutes);
app.use("/api/role/", isAuth, roleRoutes);
app.use("/api/kassa/", isAuth, kassaRoutes);
app.use("/api/loan/", isAuth, loanRoutes);
app.use("/api/payment/", isAuth, paymentRoutes);
app.use("/api/spend/", isAuth, spendRoutes);


//if you not use admin dashboard then these two route will not needed.
app.use("/api/admin/", adminRoutes);
app.use("/api/orders/", isAuth, orderRoutes);

// Use express's default error handling middleware
app.use((err, req, res, next) => {
  if (res.headersSent) return next(err);
  res.status(400).json({ message: err.message });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server running on port ${PORT}`));

cron.schedule(
  "0 1 * * *",
  () => {
    kassaController.dailyKassa();
  },
  {
    scheduled: true,
    timezone: "Asia/Tashkent",
  }
);