const alert = (content, variant) => sAlert.show({ content, variant });

export default (type, router) => {
  switch (type) {
    case 'user/loginSuccess':
      alert('Welcome aboard', 'success');
      break;
    case 'user/loginFailed':
      alert('Failed to login', 'danger');
      break;
    case 'user/removeAuth':
      alert('Thank you!', 'success');

      router.push('/login');
      break;
    default:
      break;
  }
};
