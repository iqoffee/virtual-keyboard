import data from '../data/keys.json';

export default class Keyboard {
  constructor(textArea, lang) {
    this.data = data;
    this.keys = [];
    this.textArea = textArea;
    this.lang = lang;
  }

  #shifted = false;

  #capsed = false;

  #text = '';

  #pressed = new Set();

  init(node) {
    this.data.forEach((arrOfkeys, i) => {
      const keysRow = document.createElement('div');
      keysRow.classList.add('keys-row', `keys-row-${i}`);

      arrOfkeys.forEach((keyFromArr) => {
        const keyNode = this.#createKey(keyFromArr);

        this.#AddEventListeners(keyNode, this.textArea, this.keys);

        keysRow.appendChild(keyNode);
        this.keys.push(keyNode);
      });
      node.appendChild(keysRow);
    });

    this.#addKeyboardEvents(this.textArea);

    const arrowUp = document.querySelector('[data-key-code="ArrowUp"]');
    const arrowDown = document.querySelector('[data-key-code="ArrowDown"]');
    const arrowRight = document.querySelector('[data-key-code="ArrowRight"]');

    const arrowsContainer = document.createElement('span');
    arrowsContainer.classList.add('arrows-container');
    arrowsContainer.appendChild(arrowUp);
    arrowsContainer.appendChild(arrowDown);

    arrowRight.before(arrowsContainer);
  }

  #AddEventListeners(keyNode, textArea, keyNodes) {
    keyNode.addEventListener('click', (e) => {
      if (!e.target.classList.contains('key')) return;

      e.target.classList.add('key--clicked');
      setTimeout(() => {
        e.target.classList.remove('key--clicked');
      }, 100);

      switch (e.target.dataset.keyCode) {
        case 'Enter':
          this.#text += '\n';
          textArea.innerHTML = this.#text;
          break;

        case 'Backspace':
          this.#deleteChar();
          textArea.innerHTML = this.#text;
          break;

        case 'ShiftLeft':
        case 'ShiftRight':
          if (this.#capsed) {
            this.#capsed = !this.#capsed;
          }
          this.#shift(keyNodes);
          this.#shifted = !this.#shifted;
          break;

        case 'CapsLock':
          if (this.#shifted) {
            this.#shifted = !this.#shifted;
          }
          this.#caps(keyNodes);
          this.#capsed = !this.#capsed;
          break;

        case 'Tab':
          this.#text += '\t';
          textArea.innerHTML = this.#text;
          break;

        case 'MetaLeft':
          this.#changeLang(keyNodes);
          break;

        case 'ControlLeft':
        case 'AltLeft':
        case 'ControlRight':
        case 'AltRight':
          break;

        default:
          this.#text += e.target.innerHTML;
          textArea.innerHTML = this.#text;
      }
    });
  }

  #addKeyboardEvents(textArea) {
    document.addEventListener('keydown', (e) => {
      e.preventDefault();

      this.keys.forEach((key) => {
        if (e.code !== key.dataset.keyCode) return;

        key.classList.add('key--clicked');
        setTimeout(() => {
          key.classList.remove('key--clicked');
        }, 100);

        switch (key.dataset.keyCode) {
          case 'Enter':
            this.#text += '\n';
            textArea.innerHTML = this.#text;
            break;

          case 'Backspace':
            this.#deleteChar();
            textArea.innerHTML = this.#text;
            break;

          case 'ShiftLeft':
          case 'ShiftRight':
            if (this.#capsed) {
              this.#capsed = !this.#capsed;
            }
            this.#shift(this.keys);
            this.#shifted = !this.#shifted;
            break;

          case 'CapsLock':
            if (this.#shifted) {
              this.#shifted = !this.#shifted;
            }
            this.#caps(this.keys);
            this.#capsed = !this.#capsed;
            break;

          case 'Tab':
            this.#text += '\t';
            textArea.innerHTML = this.#text;
            break;

          case 'ControlLeft':
          case 'AltLeft':
            if (e.altKey && e.ctrlKey) {
              this.#changeLang(this.keys);
            }

            break;

          case 'ControlRight':
          case 'AltRight':
          case 'MetaLeft':
            break;

          default:
            this.#text += key.innerHTML;
            textArea.innerHTML = this.#text;
        }
      });
    });
  }

  #createKey(key) {
    const keyElement = document.createElement('span');

    keyElement.classList.add('key');
    keyElement.dataset.keyCode = key.code;
    keyElement.dataset.key = key.key;
    keyElement.dataset.keyRu = key.ru ? key.ru.key : key.key;
    keyElement.dataset.keyUp = key.keyUp ? key.keyUp : key.key;
    keyElement.dataset.keyUpRu = key.ru ? key.ru.keyUp : key.key;
    keyElement.dataset.capsLock = !key.capsLock ? key.key : key.keyUp;

    if (key.ru) {
      keyElement.dataset.capsLockRu = key.ru.capsLock
        ? key.ru.keyUp
        : key.ru.key;
    } else {
      keyElement.dataset.capsLockRu = key.key;
    }
    if (this.lang === 'en') {
      keyElement.innerHTML = keyElement.dataset.key;
    } else {
      keyElement.innerHTML = keyElement.dataset.keyRu;
    }

    return keyElement;
  }

  #deleteChar() {
    let charPosition = this.#text.length - 1;
    if (this.#text.charAt(charPosition) === ';') {
      charPosition = this.#text.length - 4;
      this.#text = this.#text.substring(0, charPosition);
      return;
    }
    this.#text = this.#text.substring(0, charPosition);
  }

  #shift(keyNodes) {
    keyNodes.forEach((keyElement) => {
      if (!this.#shifted && this.lang === 'en') {
        keyElement.innerHTML = keyElement.dataset.keyUp;
      }
      if (this.#shifted && this.lang === 'en') {
        keyElement.innerHTML = keyElement.dataset.key;
      }
      if (!this.#shifted && this.lang === 'ru') {
        keyElement.innerHTML = keyElement.dataset.keyUpRu;
      }
      if (this.#shifted && this.lang === 'ru') {
        keyElement.innerHTML = keyElement.dataset.keyRu;
      }
    });
  }

  #caps(keyNodes) {
    keyNodes.forEach((keyElement) => {
      if (!this.#capsed && this.lang === 'en') {
        keyElement.innerHTML = keyElement.dataset.capsLock;
      }
      if (this.#capsed && this.lang === 'en') {
        keyElement.innerHTML = keyElement.dataset.key;
      }
      if (!this.#capsed && this.lang === 'ru') {
        keyElement.innerHTML = keyElement.dataset.capsLockRu;
      }
      if (this.#capsed && this.lang === 'ru') {
        keyElement.innerHTML = keyElement.dataset.keyRu;
      }
    });
  }

  #changeLang(keyNodes) {
    keyNodes.forEach((keyElement) => {
      if (this.#capsed) {
        if (this.lang === 'en') {
          keyElement.innerHTML = keyElement.dataset.capsLockRu;
        }

        if (this.lang === 'ru') {
          keyElement.innerHTML = keyElement.dataset.capsLock;
        }
        return;
      }

      if (this.#shifted) {
        if (this.lang === 'en') {
          keyElement.innerHTML = keyElement.dataset.keyUpRu;
        }

        if (this.lang === 'ru') {
          keyElement.innerHTML = keyElement.dataset.keyUp;
        }
        return;
      }

      if (this.lang === 'en') {
        keyElement.innerHTML = keyElement.dataset.keyRu;
      }

      if (this.lang === 'ru') {
        keyElement.innerHTML = keyElement.dataset.key;
      }
    });
    this.lang = this.lang === 'en' ? 'ru' : 'en';
    this.#setLocalLang();
  }

  #setLocalLang() {
    localStorage.setItem('lang', this.lang);
  }
}
