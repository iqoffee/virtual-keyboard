import data from '../data/keys.json';

export default class Keyboard {
  constructor() {
    this.data = data;
  }

  init(node, lang) {
    this.data.forEach((arrOfkeys, i) => {
      const keysRow = document.createElement('div');
      keysRow.classList.add('keys-row', `keys-row-${i}`);

      arrOfkeys.forEach((keyFromArr) => {
        const keyNode = createKey(keyFromArr, lang);
        AddEventListeners(keyNode);
        keysRow.appendChild(keyNode);
      });
      node.appendChild(keysRow);
    });

    const arrowUp = document.querySelector('[data-key-code="38"]');
    const arrowDown = document.querySelector('[data-key-code="40"]');
    const arrowRight = document.querySelector('[data-key-code="39"]');

    const arrowsContainer = document.createElement('span');
    arrowsContainer.classList.add('arrows-container');
    arrowsContainer.appendChild(arrowUp);
    arrowsContainer.appendChild(arrowDown);

    arrowRight.before(arrowsContainer);
  }
}

function createKey(key, lang) {
  const keyElement = document.createElement('span');

  keyElement.classList.add('key');
  keyElement.dataset.keyCode = key.keyCode;
  keyElement.dataset.key = key.key;
  keyElement.dataset.keyRu = key.ru ? key.ru.key : key.key;
  keyElement.dataset.keyUp = key.keyUp ? key.keyUp : key.key;
  keyElement.dataset.keyUpRu = key.ru ? key.ru.keyUp : key.key;
  keyElement.dataset.capsLock = key.capsLock;
  keyElement.dataset.capsLockRu = key.ru ? key.ru.capsLock : null;

  keyElement.innerHTML =
    lang === 'en' ? keyElement.dataset.key : keyElement.dataset.keyRu;

  return keyElement;
}

function AddEventListeners(keyNode) {
  keyNode.addEventListener('click', (e) => {
    if (e.target.classList.contains('key')) {
      e.target.classList.add('key--clicked');
      setTimeout(() => {
        e.target.classList.remove('key--clicked');
      }, 100);
    }
  });
}
