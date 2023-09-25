import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} from "../models/contacts.js";
import { HttpError, ctrlWrapper } from "../helpers/index.js";

const getAll = async (req, res, next) => {
  const result = await listContacts();
  res.status(200).json(result);
};

const getById = async (req, res, next) => {
  const id = req.params.contactId;
  const result = await getContactById(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(result);
};

const post = async (req, res, next) => {
  const result = await addContact(req.body);
  res.status(201).json(result);
};

const remove = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await removeContact(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({ message: "Contact deleted" });
};

const put = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await updateContact(contactId, req.body);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(result);
};

export const getAllContacts = ctrlWrapper(getAll);
export const getByIdContact = ctrlWrapper(getById);
export const postContact = ctrlWrapper(post);
export const deleteContact = ctrlWrapper(remove);
export const putContact = ctrlWrapper(put);
