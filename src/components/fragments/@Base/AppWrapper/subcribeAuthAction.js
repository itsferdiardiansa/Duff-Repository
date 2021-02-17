export default (type, router) => {
  // Router push
  if (type === 'user/setToken') router.push('/');
};
