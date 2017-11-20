var express = require("express");
var router = express.Router();


router.get("/produit", function(req, res) {
  res.render("produit", { title: "Produit", message: "page produit" });
});
router.get("/produits", function(req, res) {
  res.render("produits", { title: "Produits", message: "page produits" });
});
router.get("/contact", function(req, res) {
  res.render("contact", { title: "Contact", message: "page contact" });
});

router.get("/panier", function(req, res) {
  res.render("panier", { title: "Panier", message: "page panier" });
});

router.get("/order", function(req, res) {
  res.render("commande", { title: "Commande", message: "page commande" });
});

router.post("/confirmation", function(req, res) {
  res.render("confirmation", { title: "Confirmation", message: "page confirmation" });
});

router.get("/produit", function(req, res) {
  res.render("produit", { title: "Produit", message: "page produit" });
});
router.get("/shopping-cart", function(req, res) {
  res.render("shopping-cart", { title: "Shopping-cart", message: "page shopping cart" });
});
router.get("/", function(req, res) {
  res.render("index", { title: "Accueil", message: "Ça semble fonctionner!" });
});

module.exports = router;
