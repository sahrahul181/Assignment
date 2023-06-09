const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const fetchData = require("./api/data/info");
const updateInfo = require('./api/data/updateInfo');
const getData = require('./api/routes/getData')
mongoose
  .connect(
    "mongodb+srv://sahrahul493:" +
      'Rahul_181' +
      "@node-rest-shop.8xmwnxz.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("DB Connection Successful");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan("dev"));
app.use((req,res,next)=>{
  res.header('Access-Control-Allow-Origin','*');
  res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Authorization')
  if(req.method === 'OPTIONS'){
      res.header('Access-Control-Allow-Origin','PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({})
  }
  next()
});


fetchData();
updateInfo();

app.use('/api/data',getData);

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    success: false,
    error: error.message,
  });
});

module.exports = app;
