const axios = require("axios");
const Stock = require("../models/StockInfo");
const mongoose = require('mongoose')

let data = [];

const fetchData = async () => {
  try {
    const response = await axios.get("https://api.wazirx.com/api/v2/tickers");
    data = Object.values(response.data)
      .slice(0, 20)
      .map((obj) => {
        const { base_unit, last, volume, sell, buy, name } = obj;
        return { base_unit, last, volume, sell, buy, name };
      });
    // console.log(data);
   for (let i = 0; i < data.length; i++) {
      const obj = data[i];
      const stock = new Stock({
        _id: new mongoose.Types.ObjectId(),
        ...obj,
      });
      // check if stock already exist and update
      Stock.findOneAndUpdate({ name: obj.name }, { $set: obj }, { new: true })
        .exec()
        .then((res) => {
          // if stock already doesn't exist
          if (!res) {
            stock.save().then((create_res) => {
            //   console.log(create_res);
            });
          } else {
            // console.log(res);
          }
        })
        .catch((err) => console.log(err,err.message));
    }
  } catch (err) {
    console.log(err.message);
  }
  
};
module.exports = fetchData;
