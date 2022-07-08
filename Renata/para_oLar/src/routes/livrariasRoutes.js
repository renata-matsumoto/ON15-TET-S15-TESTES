const express = require("express");
const controller = require("../controllers/livrariasControllers");
const router = express.Router();

router.get("/all", controller.getAll);

router.post("/create", controller.createLibrary);

router.put("/update/:id", controller.updateLibraryById);

router.delete("/delete/:id", controller.deleteLibraryById);

module.exports = router;
