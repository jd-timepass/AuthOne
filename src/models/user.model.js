import mongoose from 'mongoose';

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
            default: user,

        },
        isActive: {
            type: Boolean,
            required: true,
            default: true,
        }

    }, { timestamps: true });

export const User = mongoose.model('User', userSchema);
