export default (message = '', type = 'primary', element = 'div') => {
  const messageContainer = document.createElement(element);
  messageContainer.classList.add(
    'alert',
    `alert-${type}`,
    'd-flex',
    'justify-content-between',
    'align-items-center',
  );
  // FYI exista un textContent
  messageContainer.textContent = message;

  const button = document.createElement('button');
  button.classList.add('btn', 'btn-danger');
  button.textContent = 'Close';

  messageContainer.append(button);

  button.addEventListener('click', () => {
    messageContainer.remove();
  });

  return messageContainer;
};
