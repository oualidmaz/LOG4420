var express = require("express");
var router = express.Router();


router.get("/produit", function(req, res) {
  res.render("produit", { title: "produit", message: "page produit" });
});
router.get("/produits", function(req, res) {
  res.render("produits", { title: "produits", message: "page produits" });
});
router.get("/contact", function(req, res) {
  res.render("contact", { title: "contact", message: "page contact" });
});
router.get("/panier", function(req, res) {
  res.render("panier", { title: "panier", message: "page panier" });
});
router.get("/commande", function(req, res) {
  res.render("commande", { title: "commande", message: "page commande" });
});
router.get("/confirmation", function(req, res) {
  res.render("confirmation", { title: "confirmation", message: "page confirmation" });
});
router.get("/", function(req, res) {
  res.render("index", { title: "Accueil", message: "Ça semble fonctionner!" });
});

module.exports = router;
