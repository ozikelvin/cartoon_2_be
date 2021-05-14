const { Router } = require("express");
const { login } = require("../controllers/auth_controller");
const path = "/auth";
const router = Router();

router.post('/login', login);

module.exports = { router, path };