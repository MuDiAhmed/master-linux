const mongoose = require("mongoose");
const { models } = require("../../env").getEnv();
const mongooseSchema = mongoose.Schema;
const collectionName = models.USERS;
const {hashString, compareWithHash, generateJWT} = require("../services/utility");
const validator = require('validator');

const schema = new mongooseSchema({
  name: {
    type: String,
    alias: "firstName",
    minlength: 4,
    required: true
  },
  ln: {
    type: String,
    alias: "lastName",
    minlength: 4,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate(value){
      if(!validator.isEmail(value)) throw new Error("Invalid Email");
    }
  },
  password: { type: String, required: true },
  role: { type: String, enum: ['Examiners', 'Normal'] },
  createAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now }
});
const Model = mongoose.model(collectionName, schema)

schema.pre('save', async function(next){
    if(this.isModified('password')){
        this.password = hashString(this.password);
    }
    next();
})

schema
.virtual("profile")
.get(function () {
  return {
    _id: this._id,
    email: this.email,
    role: this.role,
    firstName: this.firstName,
    lastName: this.lastName
  }
})

schema.statics.findByCredentials = async function(email, password){
    const user =  await Model.findOne({email});
    if(!user || compareWithHash(password, user.password)){
      throw new Error("Invalid Credentials");
    }
    return user;
}

schema.methods.generateAuthToken = async function(){
    return generateJWT(this.profile);
}

module.exports.schema = schema;
module.exports.Model = Model;
