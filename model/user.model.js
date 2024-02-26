const mongoose = require('mongoose');
const jwt=require('jsonwebtoken');
const env=require('dotenv').config();

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: [4, "Al least 4 character required"],
        maxLength: [20, "At max only 20 Character"],
    },
    username: {
        type: String,
        required: true,
        minLength: [4, "Al least 4 character required"],
        maxLength: [20, "At max only 20 Character"],
        unique: true

    },
    email: {
        type: String,
        required: true,
        minLength: [4, "Al least 4 character required"],
        maxLength: [50, "At max only 50 Character"],
    },
    password: {
        type: String,
        required: true,
        minLength: [4, "Al least 4 character required"],
        maxLength: [200, "At max only 200 Character"],
    },
    bio: {
        type: String,
        required: true,
        minLength: [4, "Al least 4 character required"],
        maxLength: [500, "At max only 50 Character"],
    }
});

userSchema.methods= {
    generateJwtToken: function () {
      return  jwt.sign(
        {
            id: this._id,username:this.username,
        }, process.env.SECRET,
            // {
            //     expiresIn:process.env.EXPIRY
            // }
        )

    }
}

const userInstagram = mongoose.model('user', userSchema);

module.exports = userInstagram;