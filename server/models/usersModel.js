import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: [true, 'First Name is required'],
    },
    last_name: {
      type: String,
      required: [true, 'Last Name is required'],
    },
    // profile_img: {
      // data: { type: Buffer },
      // mimeType: { type: String },
    // },
    email: {
      type: String,
      unique: true,
      required: [true, 'Email is required'],
    },
    phone_number: {
      type: String,
      unique: true,
      required: [true, 'Phone Number is required'],
      validate: {
        validator: function (v) {
          // Ensure it matches the E.164 format
          return /^\+?[1-9]\d{1,14}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);
export default User;
