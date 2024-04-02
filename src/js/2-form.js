const form = document.querySelector('.feedback-form');
const textArea = form.elements.message;
const email = form.elements.email;

const extractedValues = JSON.parse(localStorage.getItem('feedback-form-state'));
const savedValues = { ...extractedValues };
const submittedMsgs = [];

let msgBox = document.createElement('p');

msgBox.textContent = 'Wrong values, please type in Email and Message';
msgBox.classList.add('msg-box');
form.prepend(msgBox);

email.value = savedValues.email ?? '';
textArea.value = savedValues.message ?? '';

form.addEventListener('input', event => {
  event.target.type === 'email'
    ? (savedValues.email = event.target.value.trim())
    : (savedValues.message = event.target.value.trim());
  localStorage.setItem('feedback-form-state', JSON.stringify(savedValues));
});

form.addEventListener('submit', event => {
  event.preventDefault();
  if (textArea.value !== '' && email.value !== '') {
    submittedMsgs.push(savedValues);
    if (!msgBox.classList.contains('visually-hidden')) {
      msgBox.classList.toggle('visually-hidden');
    }
    email.value = '';
    textArea.value = '';
    localStorage.removeItem('feedback-form-state');
    console.log(submittedMsgs);
  } else {
    if (msgBox.classList.contains('visually-hidden')) {
      msgBox.classList.toggle('visually-hidden');
    }
  }
});
