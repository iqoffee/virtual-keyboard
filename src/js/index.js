import '../styles/styles.scss';
import Keyboard from './Keyboard';

const description = [
  'Клавиатура создавалась на Windows',
  'Для смены языка клавиша "META" на экранной клавиатуре и сочетание "Ctrl" + "Alt" на фзической',
];

const modal = document.createElement('div');
modal.classList.add('modal');
const modalBtn = document.createElement('span');
modalBtn.classList.add('modal__btn');
modalBtn.innerText = 'x';
const modalList = document.createElement('ul');
modalList.classList.add('modal__list');

description.forEach((text) => {
  const modalListItem = document.createElement('li');
  modalListItem.innerText = text;
  modalListItem.classList.add('modal__list-item');

  modalList.append(modalListItem);
});

modalBtn.addEventListener('click', () => {
  modal.classList.add('modal--none');
});

modalList.append(modalBtn);
modal.append(modalList);

const body = document.querySelector('body');
const keyboardBody = document.createElement('div');
keyboardBody.classList.add('keyboard');

const keyboardTextarea = document.createElement('textarea');
keyboardTextarea.readOnly = true;
keyboardTextarea.classList.add('keyboard-aria');
const lang = localStorage.getItem('lang') === 'ru' ? 'ru' : 'en';

const keyboard = new Keyboard(keyboardTextarea, lang);

body.appendChild(keyboardTextarea);
body.appendChild(keyboardBody);
body.appendChild(modal);

keyboard.init(keyboardBody);
