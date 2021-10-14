export default function isAdmin(to, from, next) {
  const admin = localStorage.getItem("userAdmin");
  if (admin != "true") {
    next({ name: 'Feed' });
    return false;
  }
  return next()
}