const express = require("express");
const Stock = require("../models/StockInfo");
const mongoose = require("mongoose");
const router = express.Router();

// Get 10 Crypto Info

router.get("/", (req, res, next) => {
  Stock.aggregate([{ $sample: { size: 10 } }])
    .exec()
    .then((data) => {
        console.log(data)
        return res.status(200).send(data)
    })
    .catch((err) => {
        console.log(err.message);
        return res.status(500).json({
            success : false,
            error : err.message
            
        })
    });
});
// Get Specific Crypto Info
router.get("/:name", (req, res, next) => {
    const name = req.params.name
    Stock.findOne({base_unit : name})
      .exec()
      .then((data) => {
          if(!data){
            return res.status(503).json({
                success : false,
                error : "Couldn't Found"
            })
          }
          else{
            console.log(data)
          return res.status(200).send(data)
          }
      })
      .catch((err) => {
          console.log(err.message);
          return res.status(500).json({
              success : false,
              error : err.message
              
          })
      });
  });


module.exports = router
