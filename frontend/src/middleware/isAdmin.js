export default function isAdmin(to, from, next) {
  if (localStorage.getItem("userAdmin")) {
    next({ name: 'Feed' });
    return false;
  }
  return next()
}