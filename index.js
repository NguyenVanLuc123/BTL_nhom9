const express = require('express');
var methodOverride = require('method-override');
const expressLayouts = require('express-ejs-layouts');
const router = require('./router/admin/index.router');
const systemconfig = require("./config/system");
const flash = require('express-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const app = express();
require("dotenv").config(); // Đảm bảo gọi dotenv trước khi sử dụng biến môi trường

const port = process.env.port // Sử dụng PORT từ .env hoặc 3000 nếu không có

app.use(methodOverride('_method'));  // Thay đổi method từ POST thành PATCH
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Đảm bảo rằng các yêu cầu có nội dung JSON cũng được xử lý

//flash
app.use(cookieParser('sdasdsa'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());

//flash
// Cấu hình views và view engine (EJS)
app.use(expressLayouts);
app.set('views', `${__dirname}/view`);
app.set('view engine', 'ejs');
app.set('layout', 'admin/layout/default'); // Thiết lập layout mặc định

app.use(express.static(`${__dirname}/public`));

// Thiết lập kết nối với MySQL
app.locals.prefixAdmin = systemconfig.prefixAdmin;

router(app);

// Khởi động ứng dụng Express
app.listen(port, () => {
  console.log(`Ứng dụng đang chạy tại http://localhost:${port}`);
});
