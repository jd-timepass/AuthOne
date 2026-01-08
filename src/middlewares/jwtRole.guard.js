export const roleGuard = (allowedRole) => {
    return (req, res, next) => {
        try {
            if (req.user.role != allowedRole) {
                return res.status(403).json({
                    message: `Only ${allowedRole} is allowed...Your current role is ${req.user.role}`
                });
            }
            next();
        } catch (err) {
            next(err);
        }
    }
}