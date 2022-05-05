import data from '../data/keys.json';

export default class Keyboard {
  constructor() {
    this.data = data;
  }

  init(node, lang) {
    this.data.forEach((arrOfkeys) => {
      const keysRow = document.createElement('div');
      arrOfkeys.forEach((keyFromArr) => {
        keysRow.appendChild(createKey(keyFromArr, lang));
      });
      node.appendChild(keysRow);
    });
  }
}

function createKey(key, lang) {
  console.log(key.capsLock);
  const keyElement = document.createElement('span');

  keyElement.classList.add('key');
  keyElement.dataset.keyCode = key.keyCode;
  keyElement.dataset.key = key.key;
  keyElement.dataset.keyRu = key.ru ? key.ru.key : key.key;
  keyElement.dataset.keyUp = key.keyUp ? key.keyUp : key.key;
  keyElement.dataset.keyUpRu = key.ru ? key.ru.keyUp : key.key;
  keyElement.dataset.capsLock = key.capsLock;
  keyElement.dataset.capsLockRu = key.ru ? key.ru.capsLock : null;

  keyElement.innerText =
    lang === 'en' ? keyElement.dataset.key : keyElement.dataset.keyRu;

  return keyElement;
}
