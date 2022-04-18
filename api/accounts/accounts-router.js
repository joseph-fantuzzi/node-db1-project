const router = require("express").Router();

const Accounts = require("./accounts-model");

router.get("/", async (req, res, next) => {
  try {
    const accounts = await Accounts.getAll();
    res.status(200).json(accounts);
  } catch (err) {
    res.status(500).json({ message: "There was an error in retrieving the accounts." });
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const account = await Accounts.getById(req.params.id);
    res.status(200).json(account);
  } catch (err) {
    res.status(500).json({ message: "There was an error in retrieving the account." });
  }
});

router.post("/", async (req, res, next) => {
  try {
    const newAccount = await Accounts.create(req.body);
    res.status(201).json(newAccount);
  } catch (err) {
    res.status(500).json({ message: "There was an error in creating the account." });
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const updatedAccount = await Accounts.updateById(req.params.id, req.body);
    res.status(200).json(updatedAccount);
  } catch (err) {
    res.status(500).json({ message: "There was an error in updating the account." });
  }
});

router.delete("/:id", (req, res, next) => {
  // DO YOUR MAGIC
});

router.use((err, req, res, next) => {
  // eslint-disable-line
  // DO YOUR MAGIC
});

module.exports = router;
