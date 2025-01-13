 import jwt from 'jsonwebtoken';

 function authMiddleware(req, res, next) {
    const token = req.headers['authorization']

    if (!token){
        return res.status(401).json({message: "no Token detected ;("})
    }

    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
        if (error){
            return res.status(401).json({message: "invalid Token brother"})
        } 

        req.userId = decoded.id;
        next();

    })
 }

 export default authMiddleware;