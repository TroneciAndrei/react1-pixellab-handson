export default (message = '', type = 'primary') => {
  const messageContainer = document.createElement('div');
  messageContainer.classList.add('alert', `alert-${type}`);

  // FYI exista un textContent
  messageContainer.textContent = message;

  return messageContainer;
};
