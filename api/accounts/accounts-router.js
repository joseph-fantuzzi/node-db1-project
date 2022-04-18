const router = require("express").Router();

const Accounts = require("./accounts-model");

const {
  checkAccountPayload,
  checkAccountNameUnique,
  checkAccountId,
} = require("./accounts-middleware");

router.get("/", async (req, res, next) => {
  try {
    const accounts = await Accounts.getAll();
    res.status(200).json(accounts);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", checkAccountId, async (req, res) => {
  res.status(200).json(req.account);
});

router.post("/", checkAccountPayload, checkAccountNameUnique, async (req, res, next) => {
  try {
    const newAccount = await Accounts.create(req.newAccount);
    res.status(201).json(newAccount);
  } catch (err) {
    next(err);
  }
});

router.put(
  "/:id",
  checkAccountPayload,
  checkAccountNameUnique,
  checkAccountId,
  async (req, res, next) => {
    try {
      const updatedAccount = await Accounts.updateById(req.account.id, req.newAccount);
      res.status(200).json(updatedAccount);
    } catch (err) {
      next(err);
    }
  }
);

router.delete("/:id", checkAccountId, async (req, res, next) => {
  try {
    const deletedAccount = await Accounts.deleteById(req.account.id);
    res.status(200).json(deletedAccount);
  } catch (err) {
    next(err);
  }
});

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = router;
