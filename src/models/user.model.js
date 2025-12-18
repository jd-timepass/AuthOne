import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            required: true,
            default: 'user',

        },
        isActive: {
            type: Boolean,
            required: true,
            default: true,
        }

    }, { timestamps: true });

//using pre middleware to salt password before saving.
// IMPORTANT: here we cannot use async arrow function bcz it will not support this keyword inside.
userSchema.pre('save', async function () {
    if (!this.isModified('password')) return;

    this.password = await bcrypt.hash(this.password, 10);
    //IMP: In async funtion no need to call next() bcz as fn
    //completes mongoose automatically continues...
});



userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

//exclude password when returning user object for better security
userSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.password;
    return obj;
};

export const User = mongoose.model('User', userSchema);
