const config = {
  storageKey: {
    myCharacters: 'LOAM-MY-CHARACTERS',
    mainLoado: 'MAIN-LOADO',
    mainCharacterLoado: 'MAIN-CHARACTER-LOADO'
  },
  data: {
    memo: {
      keyName: 'memo',
      resetType: 'none',
      iconFileName: '',
      title: '메모',
      defaultCellType: 'text',
      defaultValue: ''
    },
    dailyEpona: {
      keyName: 'dailyEpona',
      resetType: 'daily',
      iconFileName: 'icon_dailyEpona.png',
      title: '에포나',
      defaultCellType: 'checkbox',
      defaultValue: false
    },
    bloodstone: {
      keyName: 'bloodstone',
      resetType: 'daily',
      iconPath: '',
      iconFileName: 'icon_bloodstone.png',
      title: '혈석',
      defaultCellType: 'checkbox',
      defaultValue: false
    },
    affinity: {
      keyName: 'affinity',
      resetType: 'daily',
      iconFileName: 'icon_affinity.png',
      title: '호감도',
      defaultCellType: 'checkbox',
      defaultValue: false
    },
    chaosDungeon: {
      keyName: 'chaosDungeon',
      resetType: 'daily',
      iconFileName: 'icon_chaosDungeon.png',
      title: '카오스 던전',
      defaultCellType: 'relaxationBonus',
      defaultValue: {
        threshold: 0,
        count: 0,
        relaxationBonus: 0
      }
    },
    guardianRaid: {
      keyName: 'guardianRaid',
      resetType: 'daily',
      iconFileName: 'icon_guardianRaid.png',
      title: '가디언 토벌',
      defaultCellType: 'relaxationBonus',
      defaultValue: {
        threshold: 0,
        count: 0,
        relaxationBonus: 0
      }
    },
    weeklyEpona: {
      keyName: 'weeklyEpona',
      resetType: 'weekly',
      iconFileName: 'icon_weeklyEpona.png',
      title: '주간 에포나',
      defaultCellType: 'checkbox',
      defaultValue: false
    },
    bloodstoneExchange: {
      keyName: 'bloodstoneExchange',
      resetType: 'weekly',
      iconFileName: 'icon_bloodstone.png',
      title: '혈석 교환',
      defaultCellType: 'checkbox',
      defaultValue: false
    },
    cube: {
      keyName: 'cube',
      resetType: 'weekly',
      iconFileName: 'icon_cube.png',
      title: '큐브',
      defaultCellType: 'checkbox',
      defaultValue: false
    },
    endContents1: {
      keyName: 'endContents1',
      resetType: 'weekly',
      iconFileName: 'icon_endContents.png',
      title: '엔드컨텐츠1',
      defaultCellType: 'checkbox',
      defaultValue: false
    },
    endContents2: {
      keyName: 'endContents2',
      resetType: 'weekly',
      iconFileName: 'icon_endContents.png',
      title: '엔드컨텐츠2',
      defaultCellType: 'checkbox',
      defaultValue: false
    },
    endContents3: {
      keyName: 'endContents3',
      resetType: 'weekly',
      iconFileName: 'icon_endContents.png',
      title: '엔드컨텐츠3',
      defaultCellType: 'checkbox',
      defaultValue: false
    }
  }
}

export default config;