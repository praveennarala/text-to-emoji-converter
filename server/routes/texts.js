const router = require('express').Router();
const Text = require('../models/Text');

router.post('/', async (req, res) => {
  try {
    const text = await new Text(req.body).save();
    res.send(text);
  } catch (error) {
    res.send(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const texts = await Text.find();
    res.send(texts);
  } catch (error) {
    res.send(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const text = await Text.findByIdAndDelete(req.params.id);
    res.send(text);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;