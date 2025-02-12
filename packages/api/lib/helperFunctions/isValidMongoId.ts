import { ObjectId } from 'mongodb';

const isValidMongoId = (id: string) => {
  return ObjectId.isValid(id);
};

export default isValidMongoId;
