import '../styles/styles.scss';
import Keyboard from './Keyboard';

const body = document.querySelector('body');
const keyboardBody = document.createElement('div');
keyboardBody.classList.add('keyboard');

const keyboardTextarea = document.createElement('textarea');
keyboardTextarea.readOnly = true;
keyboardTextarea.classList.add('keyboard-aria');
let lang = 'en';

const keyboard = new Keyboard(keyboardTextarea, lang);

body.appendChild(keyboardTextarea);
body.appendChild(keyboardBody);

keyboard.init(keyboardBody);
