class LocalStorage {
  get(key, defaultValue) {
    const _value = localStorage.getItem(key);
    if (_value === null) return defaultValue;

    return JSON.parse(_value);
  }

  set(key, jsonValue) {
    try {
      if (key.trim() === '') throw new Error('invalid storage key');

      const strValue = JSON.stringify(jsonValue);
      localStorage.setItem(key, strValue);

    } catch (error) {
      console.error('set storage error', error);
    }
  }
}

const storage = new LocalStorage();

const LOCAL_STORAGE_KEY = {
  myCharacters: 'LOAM-MY-CHARACTERS',
}

class Data {
  getMyCharacters() {
    return storage.get(LOCAL_STORAGE_KEY.myCharacters, []);
  }

  setMyCharacters(characters) {
    storage.set(LOCAL_STORAGE_KEY.myCharacters, characters);
  }

  addMyCharacter(nickname, classname, level) {
    const _myCharacters = this.getMyCharacters();
    this.setMyCharacters([
      ..._myCharacters,
      { nickname, classname, level }
    ]);
  }

  deleteMyCharacter(nickname) {
    const _myCharacters = this.getMyCharacters();
    const _newList = _myCharacters.filter(item => item.nickname !== nickname);
    this.setMyCharacters(_newList);
  }



}

const _inst = new Data();
export default _inst;