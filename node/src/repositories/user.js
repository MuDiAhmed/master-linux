const { Model } = require("../models/user");

const getById = async id => {
  const foundUser = await Model.findById(id);
  if (!foundUser) throw new APIError(404, "Invalid User ID");
  return foundUser;
};

const login = async (email, password) => {
  try {
    const user =  await Model.findByCredentials({email, password});
    return user.generateAuthToken();
  } catch (e){
    throw new APIError(400, e);
  }
}

const register = async user => {
  try{
      const userProfile = new Model(user);
      await userProfile.save();
      return userProfile.generateAuthToken();
    } catch (e){
      throw new APIError(400, e);
    }
}

module.exports = {
  register,
  login,
  getById
};
