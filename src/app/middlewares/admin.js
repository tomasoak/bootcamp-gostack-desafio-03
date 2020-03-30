export default (req, res, next) =>
  req.userIsAdmin
    ? next()
    : res.status(401).json({ error: 'Unauthorizied Acess' });