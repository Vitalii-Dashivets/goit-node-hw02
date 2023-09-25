import express from "express";
import {
  getAllContacts,
  getByIdContact,
  postContact,
  deleteContact,
  putContact,
} from "../../controllers/contacts.js";

import { validateBody } from "../../middlewares/index.js";
import { addSchema } from "../../schemas/index.js";

const router = express.Router();

router.get("/", getAllContacts);

router.get("/:contactId", getByIdContact);

router.post("/", validateBody(addSchema), postContact);

router.put("/:contactId", validateBody(addSchema), putContact);

router.delete("/:contactId", deleteContact);

export default router;
