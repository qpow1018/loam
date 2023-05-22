import config from '/config/index.js';

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

  remove(key) {
    localStorage.removeItem(key);
  }
}
const storage = new LocalStorage();

class Data {
  // 초기 세팅이 필요한 내용들
  constructor() {
    this.#initMainLoado();
  }

  #initMainLoado() {
    const mainLoado = storage.get(config.storageKey.mainLoado, null);

    if (mainLoado === null) {
      const initValue = [
        { isUse: true, keyName: config.data.memo.keyName },
        { isUse: true, keyName: config.data.bloodstone.keyName },
        { isUse: true, keyName: config.data.dailyEpona.keyName },
        { isUse: true, keyName: config.data.affinity.keyName },
        { isUse: true, keyName: config.data.chaosDungeon.keyName },
        { isUse: true, keyName: config.data.guardianRaid.keyName },
        { isUse: true, keyName: config.data.weeklyEpona.keyName },
        { isUse: true, keyName: config.data.bloodstoneExchange.keyName },
        { isUse: true, keyName: config.data.cube.keyName },
        { isUse: true, keyName: config.data.endContents1.keyName },
        { isUse: true, keyName: config.data.endContents2.keyName },
        { isUse: true, keyName: config.data.endContents3.keyName }
      ];
      storage.set(config.storageKey.mainLoado, initValue);
    }
  }

  getMyCharacters() {
    return storage.get(config.storageKey.myCharacters, []);
  }

  setMyCharacters(data) {
    storage.set(config.storageKey.myCharacters, data);
  }

  addMyCharacter(nickname, classname, level) {
    const _myCharacters = this.getMyCharacters();
    this.setMyCharacters([
      ..._myCharacters,
      {
        nickname,
        classname,
        level,
        isMainCharacter: false,
        isSubCharacter: false
      }
    ]);
  }

  deleteMyCharacter(nickname) {
    const _myCharacters = this.getMyCharacters();
    const _newList = _myCharacters.filter(item => item.nickname !== nickname);
    this.setMyCharacters(_newList);
  }

  getMainLoado() {
    return storage.get(config.storageKey.mainLoado, null);
  }

  setMainLoado(data) {
    storage.set(config.storageKey.mainLoado, data);
  }
}

const _inst = new Data();
export default _inst;