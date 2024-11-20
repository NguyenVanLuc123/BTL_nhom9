const express = require('express');
var methodOverride = require('method-override');
const expressLayouts = require('express-ejs-layouts');
const router = require('./router/admin/index.router');
const router_client = require("./router/client/index.router");
const systemconfig = require("./config/system");
const flash = require('express-flash');
const cookieParser = require('cookie-parser');
const app = express();
const session = require('express-session');
require("dotenv").config();

const port = process.env.port || 3000;

// Sử dụng middleware session


// Các cấu hình khác
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//flash
app.use(cookieParser('sdasdsa'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());

//flash

app.use(expressLayouts);
app.set('views', `${__dirname}/view`);
app.set('view engine', 'ejs');
app.set('layout', 'admin/layout/default');

app.use(express.static(`${__dirname}/public`));

// Thiết lập kết nối với MySQL
app.locals.prefixAdmin = systemconfig.prefixAdmin;
router(app);
router_client(app);

// Khởi động ứng dụng Express
app.listen(port, () => {
  console.log(`Ứng dụng đang chạy tại http://localhost:${port}`);
});
