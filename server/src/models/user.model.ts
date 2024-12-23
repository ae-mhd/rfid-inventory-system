import mongoose, {
  Document,
  Model,
  CallbackError,
  Schema,
  Types,
} from "mongoose";
import bcrypt from "bcryptjs";

// Define the UserType without _id (since _id will be handled by Mongoose as ObjectId)
export interface UserType extends Document {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  resetPasswordToken?: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
  isVerified: boolean;
  otp?: number;
  otpExpiration?: Date;
}

// Define the UserDocument interface which extends both Document and UserType

// Define the schema for the User model
const userSchema = new Schema<UserType>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    resetPasswordToken: String,
    isVerified: { type: Boolean, default: false },
    otp: Number,
    otpExpiration: Date,
  },
  { timestamps: true }
);

// Pre-save hook to hash the password before saving the user document
userSchema.pre("save", async function (next) {
  const user = this as UserType;

  if (!user.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    next();
  } catch (error) {
    next(error as CallbackError); // Cast error to the correct type
  }
});

// Method to compare entered password with hashed password in the database
userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  const user = this as UserType;
  return bcrypt.compare(candidatePassword, user.password);
};

// Define and export the User model
const User: Model<UserType> = mongoose.model<UserType>("User", userSchema);
export default User;
