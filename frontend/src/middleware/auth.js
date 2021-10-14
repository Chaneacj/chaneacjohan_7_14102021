export default function auth (to, from, next) {
    if (!localStorage.getItem('token')) {
      next({ name: 'Login' });
      return false
    }
    return next()
}