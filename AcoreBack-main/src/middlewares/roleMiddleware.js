export const  authorize = (...allowedRoles) => (req, res, next ) =>  {
    if(!allowedRoles.includes(req.user.role)){
        return res.status(403).json({ status: false, message: "Forbidden: You don't have enough permission to access this resource." });
    }
    
    next();
}