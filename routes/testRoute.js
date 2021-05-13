const { Router } = require("express");

const path = "/ping";
const router = Router();

router.get('/', (req, res, _) => {
    res.status(200).json({ message: "pong" })
});

module.exports = { router, path };