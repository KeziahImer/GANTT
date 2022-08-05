import { verify } from 'jsonwebtoken';

function auth(req, res, next) {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = verify(token, 'RANDOM_SECRET_TOKEN');
    const userId = decodedToken.userId;
    req.auth = {
      userId
    };
    next();
  } catch (error) {
    res.status(401).json({ error });
  }
}

export default auth;
