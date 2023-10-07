import express from "express";
import {
  getAllContacts,
  getByIdContact,
  postContact,
  deleteContact,
  putContact,
  patchFavorite,
} from "../../controllers/contacts.js";

import {
  validateBody,
  isValidId,
  isValidToken,
} from "../../middlewares/index.js";
import { addSchema, updateFavoriteSchema } from "../../schemas/index.js";

const router = express.Router();

router.get("/", isValidToken, getAllContacts);

router.get("/:contactId", isValidToken, isValidId, getByIdContact);

router.post("/", isValidToken, validateBody(addSchema), postContact);

router.put("/:contactId", isValidToken, validateBody(addSchema), putContact);

router.patch(
  "/:contactId/favorite",
  isValidToken,
  validateBody(updateFavoriteSchema),
  patchFavorite
);

router.delete("/:contactId", isValidToken, deleteContact);

export default router;
