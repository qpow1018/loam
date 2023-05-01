const TEST_DATA1 = [
  {
    nickname: '간판스타야무진'
  },
  {
    nickname: '반포동슬레이어'
  },
  {
    nickname: '32세버서커'
  }
]





class Data {
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



  static instance = null;
  static getInstance() {
    if (Data.instance === null) {
      Data.instance = new Data();
    }
    return Data.instance;
  }
}

export default Data;