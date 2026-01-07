export const hasPermission = (requiredPermission) => {
    return (req, res, next) => {
        // Admins automatically get all permissions
        if (req.user.role === 'admin') return next();

        if (req.user.permissions.includes(requiredPermission)) {
            return next();
        }

        return res.status(403).json({ 
            message: `Access denied. You need '${requiredPermission}' permission.` 
        });
    };
};