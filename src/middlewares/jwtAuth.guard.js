import { verifyAccessToken } from "../utils/token"

export const jwtAuthGuard = async (req, res, next) => {

    try {
        const authHeader = req.headers.authorization;

        if (!authHeader.startsWith("Bearer ")) throw new Error("token missing...");

        const token = authHeader.split(" ")[1];

        const decoded = await verifyAccessToken(token);

        if (!decoded) throw new Error("Invalid token");

        req.user = decoded;

        next();
    } catch (error) {
        next(error);
    }
};