export default (type, payload, router) => {
  switch (type) {
    case 'user/loginSuccess':
      SSNotification('success', 'Selamat datang');
      break;
    case 'user/loginFailed':
      if (!(responseData?.timeout || responseData?.server))
        SSNotification('danger', 'Gagal masuk');
      break;
    case 'user/removeAuth':
      SSNotification('success', 'Terima kasih!');

      router.push('/login');
      break;
    default:
      break;
  }
};
