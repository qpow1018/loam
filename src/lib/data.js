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
  #myCharacters;

  addMyCharacter(nickname, classname, level) {
    const _myCharacters = storage.get(LOCAL_STORAGE_KEY.myCharacters, []);
    storage.set(LOCAL_STORAGE_KEY.myCharacters, [
      ..._myCharacters,
      { nickname, classname, level }
    ]);
  }

  getMyCharacters() {
    return storage.get(LOCAL_STORAGE_KEY.myCharacters, []);
  }







  getMainCharacters() {
    return TEST_DATA1;
  }

  getMainCharactersDailyTodos() {
    return {
      label: '메모',
      iconInfo: '',
      column: [
        {
          type: 'text',
          content: '크리2000개',
          resetType: 'daily',
        }
      ]
    }
  }

  getMainCharactersWeeklyTodos() {
    
  }
}

const _inst = new Data();
export default _inst;