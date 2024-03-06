import { Request, Response, NextFunction } from "express";
const jwt = require('jsonwebtoken');

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    const authToken = authHeader && authHeader.split(' ')[1];

    if (authToken === null) {
        return res.status(403).json({ tokenError: 'You are not authenticated' });
    } 
    
    try {
        const decode = jwt.verify(authToken, process.env.ACCESS_TOKEN_SECRET);
        next();
    }
    catch (error) {
        return res.status(403).json({ tokenError: 'Invalid token' });
    }
    
}