const form = document.querySelector('.feedback-form');
const textArea = form.elements.message;
const email = form.elements.email;

const extractedValues = JSON.parse(localStorage.getItem('feedback-form-state'));
const savedValues = { ...extractedValues };

email.value = savedValues.email ?? '';
textArea.value = savedValues.message ?? '';

form.addEventListener('input', event => {
  event.target.type === 'email'
    ? (savedValues.email = event.target.value)
    : (savedValues.message = event.target.value.trim());
  localStorage.setItem('feedback-form-state', JSON.stringify(savedValues));
});

form.addEventListener('submit', event => {
  event.preventDefault();
  email.value = '';
  textArea.value = '';
  localStorage.removeItem('feedback-form-state');
});
