import '../styles/styles.scss';
import data from '../data/keysRU.json';

for (const arr of data) {
  for (const { upperCase, lowerCase, type } of arr) {
    if (type === 'symbol' || type === 'digit') {
      console.log(String.fromCharCode(lowerCase.code));
    }
  }
}
