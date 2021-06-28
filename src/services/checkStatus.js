/* eslint-disable */
const pluralMessages = (messages = {}) => {
  const contents = [];

  Object.keys(messages).map(key => {
    contents.push(messages[key].map(value => <li>{value}</li>));
  });

  if (!contents.length) return null;

  return () => (
    <div style={{ paddingLeft: '15px' }}>
      {contents.map(value => (
        <ol style={{ listStyle: 'disc' }}>{value}</ol>
      ))}
    </div>
  );
};

const checkStatus = ({ status, data }) => {
  switch (true) {
    case /5+[0-9]{2}/.test(status):
      SSNotification('danger', 'Terjadi kesalahan di server');
      break;
    case /4+[0-9]{2}/.test(status):
      const message =
        data?.result?.error_message ||
        pluralMessages(data?.result?.error_messages);

      SSNotification('danger', message || 'Terjadi kesalahan di server (2)');
      break;
    default:
      break;
  }
};

export default checkStatus;
