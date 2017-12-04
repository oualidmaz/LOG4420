"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Order = new Schema({
  id: { type: Number, unique: true },
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  products: Array
}, { versionKey: false });


var Product = new Schema({
  id: { type: Number, unique: true },
  name: String,
  price: Number,
  image: String,
  category: String,
  description: String,
  features: Array
}, { versionKey: false });

mongoose.model("Order", Order);
mongoose.model("Product", Product);

mongoose.Promise = global.Promise;

mongoose.connect("mongodb://shopping:Password+1@ds149495.mlab.com:49495/log4420", { useMongoClient: true }, (err, res) => {
  if (err) {
    console.log('Unable to connect to mongoLab .... ' + err);
  } else {
    console.log('Successfully connected to mongoLab :)')
  }
});
