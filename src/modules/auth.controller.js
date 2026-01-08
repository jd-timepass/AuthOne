import session from "express-session";
import { User } from "../models/user.model.js";
import { signAccessToken } from "../utils/token.js";

// Stateful Authentication - Session Based

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

export const login = async (req, res, next) => {


    const { email, password } = req.body;

    //find user by email
    const user = await User.findOne({ email: email });

    if (!user) {
        throw new Error("User does not exist...");
    }


    //check if matching
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
        throw new Error("Invalid password...");
    }

    //create session
    req.session.user = {
        id: user._id,
        role: user.role,
    }

    return res.status(200).json({ ok: true });


}

export const logout = async (req, res, next) => {
    req.session.destroy(err => {
        if (err) return next(err);

        res.clearCookie('sid');
        res.status(200).json({ message: 'Logged out successfully...' });
    });
}

// Stateless Authentication - JWT Based

export const jwtLogin = async (req, res, next) => {

    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) throw new Error("User does not exist...");

        const isMatch =  await user.comparePassword(password);


        if (!isMatch) throw new Error("Invalid password");

        const token = signAccessToken({
            userId: user._id,
            role: user.role,
        });

        res.json({
            accessToken: token
        });

    } catch (err) {
        next(err);
    }
}