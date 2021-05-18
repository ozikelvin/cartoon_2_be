const  { Router } = require( "express");
const { checkAuth } = require("../middlewares/auth.js");
const  testRoute = require("./testRoute.js");
const authRoute = require("./authRoutes.js")

const router = Router();
const path = "/api/v1/cartoon"
router.use(testRoute.path, testRoute.router);
router.use(authRoute.path, authRoute.router);

module.exports = { router, path };