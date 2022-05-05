import '../styles/styles.scss';
import Keyboard from './Keyboard';

const body = document.querySelector('body');
const keyboard = new Keyboard();
const keyboardBody = document.createElement('div');

let lang = 'en';

body.appendChild(keyboardBody);

keyboard.init(keyboardBody, lang);
