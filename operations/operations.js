import { Contact } from "../models/contactModel.js";

const updateStatusContact = async (contactId, body) => {
  const result = await Contact.findByIdAndUpdate({ _id: contactId }, body, {
    new: true,
  });
  return result;
};
export { updateStatusContact };
