
const isLoggedIn = (req, res, next) => {
  if (req.session?.user) return next();
  return res.status(401).json({ message: "You must be logged in" });
};

const isAdmin = (req, res, next) => {
  if (req.session?.user?.role === "admin") return next();
  return res.status(403).json({ message: "Admins only" });
};

module.exports = { isLoggedIn, isAdmin };
