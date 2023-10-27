/* eslint-disable no-console */
function helloWord() {
  console.log('Hello Word');
}

const saudacao = () => {
  const data = new Date();
  const hour = data.getHours();

  if (hour <= 12) {
    return 'Bom dia';
  }
  if (hour <= 18) {
    return 'Boa tarde';
  }
  return 'boa noite';
};

helloWord();
console.log(`A saudação é minha casa normal casa ${saudacao()}`);
