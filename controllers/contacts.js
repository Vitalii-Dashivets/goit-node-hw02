import { HttpError, ctrlWrapper } from "../helpers/index.js";
import { Contact } from "../models/contactModel.js";
import { updateStatusContact } from "../operations/operations.js";

const getAll = async (req, res, next) => {
  const { _id: owner } = req.user;
  console.log(owner);
  const { page = 1, limit = 10, favorite } = req.query;
  console.log("page=", page);
  console.log("limit=", limit);
  const result = await Contact.find({ owner })
    .skip((page - 1) * limit)
    .limit(limit);
  res.status(200).json(result);
};

const getById = async (req, res, next) => {
  const id = req.params.contactId;
  const { _id: owner } = req.user;
  const result = await Contact.findOne({ _id: id, owner });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(result);
};

const post = async (req, res, next) => {
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};

const remove = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;
  const result = await Contact.findByIdAndRemove({ _id: contactId, owner });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({ message: "Contact deleted" });
};

const put = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;
  const result = await Contact.findOneAndUpdate(
    { _id: contactId, owner },
    req.body,
    {
      new: true,
    }
  );
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(result);
};

const patch = async (req, res, next) => {
  const { favorite } = req.body;
  const { _id: owner } = req.user;
  const id = req.params.contactId;
  if (favorite === undefined) {
    throw HttpError(400, "missing field favorite");
  }
  const result = await findOneAndUpdate({ _id: id, owner }, req.body, {
    new: true,
  });
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
export const patchFavorite = ctrlWrapper(patch);
