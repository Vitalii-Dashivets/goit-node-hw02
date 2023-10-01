import express from "express";
import {
  getAllContacts,
  getByIdContact,
  postContact,
  deleteContact,
  putContact,
  patchFavorite,
} from "../../controllers/contacts.js";

import { validateBody, isValidId } from "../../middlewares/index.js";
import { addSchema } from "../../schemas/index.js";

const router = express.Router();

router.get("/", getAllContacts);

router.get("/:contactId", isValidId, getByIdContact);

router.post("/", validateBody(addSchema), postContact);

router.put("/:contactId", validateBody(addSchema), putContact);

router.patch("/:contactId/favorite", patchFavorite);

router.delete("/:contactId", deleteContact);

export default router;
