import { User } from "../models/user.model.js";
// import * as authService from './auth.service.js';

export const register = async (req, res, next) => {

    try {
        //get user details from frontend
        const { name, email, password, role, isActive } = req.body;

        //validations 
        if ([name, email, password, role, isActive].some(
            (field) => String(field)?.trim() === ""
        )) {
            throw new Error("All feilds are required...");
        }

        //check if user already exists
        const existedUser = await User.findOne({
            $or: [{ name }, { email }],
        });

        if (existedUser) {
            throw new Error("User already exists !");
        }

        //if new user then create user
        const createdUser = await User.create({
            name, email, password, role, isActive
        });

        return res.status(201).json(createdUser);

    } catch (error) {
        console.log("Registration error: ", error);
        res.status(500).json({ error: error.message });
    }
}