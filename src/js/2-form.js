const form = document.querySelector('.feedback-form');
const textArea = form.elements.message;
const email = form.elements.email;
const submittedMsgs = [];

let msgBox = document.createElement('p');
msgBox.textContent = 'Wrong values, please type in Email and Message';
msgBox.classList.add('msg-box');
msgBox.classList.add('visually-hidden');
form.prepend(msgBox);

const savedValues =
  JSON.parse(localStorage.getItem('feedback-form-state')) ?? {};
email.value = savedValues.email ?? '';
textArea.value = savedValues.message ?? '';

const onFormInput = event => {
  const { target: targetElement } = event;
  const inputName = targetElement.name;
  const inputValue = targetElement.value.trim();
  savedValues[inputName] = inputValue;
  localStorage.setItem('feedback-form-state', JSON.stringify(savedValues));
};

form.addEventListener('input', onFormInput);

const onSubmit = event => {
  event.preventDefault();
  if (textArea.value !== '' && email.value !== '') {
    submittedMsgs.push(savedValues);
    msgBox.classList.add('visually-hidden');
    localStorage.removeItem('feedback-form-state');
    form.reset();
    console.log(submittedMsgs);
  } else {
    msgBox.classList.remove('visually-hidden');
  }
};

form.addEventListener('submit', onSubmit);
