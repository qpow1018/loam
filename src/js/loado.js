import config from '/config/index.js';
import { api, snackbar, modal, utils, data } from '/lib/stdlib.js';
import Drag from '/modules/drag.js';

const $mainTableSubjectColumn = document.querySelector('#main-table .table-subject-column');
const $mainTableBody = document.querySelector('#main-table .table-body');
const $openMainModalBtn = document.querySelector('#open-main-modal-btn');
const $closeMainModalBtn = document.querySelector('#main-modal .modal-close-btn');
const $mainModalContentList = document.querySelector('#main-modal-content-list');
const $mainModalCharacterList = document.querySelector('#main-modal-character-list');
const $mainModalSubmitBtn = document.querySelector('#main-modal-submit-btn');

// 메인 테이블
initMainTable();

function initMainTable() {
  // 기존 DOM 초기화
  $mainTableSubjectColumn.replaceChildren();
  $mainTableBody.replaceChildren();

  const mainCharacterLoado = data.getMainCharacterLoado();
  if (0 < mainCharacterLoado.length) {
    renderMainLoadoSubjectColumn();
    renderMainLoadoCharacterColumn();
  }
}

function renderMainLoadoSubjectColumn() {
  $mainTableSubjectColumn.insertAdjacentHTML('afterbegin', '<div class="loado-cell main-table-subject-cell loado-cell-header"></div>');

  const mainLoado = data.getMainLoado();
  const useMainLoado = mainLoado.filter(item => item.isUse === true);
  let $lastDailyContentElm = null;

  for (let i = 0; i < useMainLoado.length; i++) {
    const keyName = useMainLoado[i].keyName;
    const data = config.data[keyName];

    const $elm = document.createElement('div');
    $elm.classList.add('loado-cell', 'main-table-subject-cell');

    if (data.resetType === 'daily') {
      $lastDailyContentElm = $elm;
    }

    let iconElmStr = '';
    if (data.iconFileName !== '') {
      iconElmStr = `
        <img
          src="assets/images/${data.iconFileName}"
          alt=""
        />
      `;
    }

    $elm.insertAdjacentHTML('afterbegin',
      `
        <div class="main-table-subject-cell-img">
          ${ iconElmStr }
        </div>
        <div class="main-table-subject-cell-label">
          ${ data.title }
        </div>
      `
    );

    $mainTableSubjectColumn.append($elm);
  }

  if ($lastDailyContentElm !== null) {
    $lastDailyContentElm.classList.add('loado-cell-last-daily');
  }
}

function renderMainLoadoCharacterColumn() {
  const mainCharacterLoado = data.getMainCharacterLoado();
  mainCharacterLoado.forEach(item => {
    const $elm = makeMainLoadoCharacterColumn(item);
    $mainTableBody.append($elm);
  });
}

function makeMainLoadoCharacterColumn(data) {
  console.log('testData', data);

  const $elm = document.createElement('div');
  $elm.classList.add('table-character-column');

  $elm.insertAdjacentHTML('afterbegin',
    `
      <div class="loado-cell loado-cell-header">
        dddd
      </div>
    `
  );

  // <div class="table-character-column">
  //   <div class="loado-cell">닉네임</div>
    
  //   <div class="loado-cell">메모</div>
  //   <div class="loado-cell">혈석</div>
  //   <div class="loado-cell">에포나</div>
  //   <div class="loado-cell">호감도</div>
  //   <div class="loado-cell">카던</div>
  //   <div class="loado-cell">가토</div>

  //   <div class="loado-cell">주간에포나</div>
  //   <div class="loado-cell">혈석교환</div>
  //   <div class="loado-cell">큐브</div>
  //   <div class="loado-cell">엔드컨텐츠1</div>
  //   <div class="loado-cell">엔드컨텐츠2</div>
  //   <div class="loado-cell">엔드컨텐츠3</div>
  // </div>
  
  return $elm;
}


// 모달
function makeModalCheckElm(label) {
  const $elm = document.createElement('div');
  $elm.classList.add('check-cell');
  $elm.insertAdjacentHTML('afterbegin',
    `
      <div class="check-cell-icon">
        <i class="fa-solid fa-check"></i>
      </div>
      <div class="check-cell-label">
        ${ label }
      </div>
    `
  );

  $elm.addEventListener('click', () => {
    if ($elm.classList.contains('check-cell-active') === true) {
      $elm.classList.remove('check-cell-active');
    } else {
      $elm.classList.add('check-cell-active');
    }
  });

  return $elm;
}

function checkModalCheckElm($elm, isActive) {
  $elm.classList.remove('check-cell-active');
  if (isActive === true) {
    $elm.classList.add('check-cell-active');
  }
}

// 메인 모달
$openMainModalBtn.addEventListener('click', openMainModal);
$closeMainModalBtn.addEventListener('click', closeMainModal);
$mainModalSubmitBtn.addEventListener('click', submitMainModalData);

initMainModal();

function initMainModal() {
  const mainLoado = data.getMainLoado();
  mainLoado.forEach(item => {
    const $elm = makeModalCheckElm(config.data[item.keyName].title);
    $elm.setAttribute('data-keyName', item.keyName);
    $mainModalContentList.append($elm);
  });

  const myCharacters = data.getMyCharacters();
  myCharacters.forEach(item => {
    const $elm = makeModalCheckElm(item.nickname);
    $elm.setAttribute('data-nickname', item.nickname);
    $elm.setAttribute('data-classname', item.classname);
    $mainModalCharacterList.append($elm);
  });
}

function openMainModal() {
  const mainLoado = data.getMainLoado();
  mainLoado.forEach(item => {
    const $elm = document.querySelector(`#main-modal-content-list .check-cell[data-keyName="${item.keyName}"]`);
    checkModalCheckElm($elm, item.isUse);
  });

  const mainCharacterLoado = data.getMainCharacterLoado();
  mainCharacterLoado.forEach(item => {
    const $elm = document.querySelector(`#main-modal-character-list .check-cell[data-nickname="${item.nickname}"]`);
    checkModalCheckElm($elm, true);
  });

  modal.openWithId('main-modal');
}

function closeMainModal() {
  modal.closeWithId('main-modal');
}

function submitMainModalData() {
  // set Data
  setLoadoData();
  setMainCharacterLoadoData();

  // render main table
  initMainTable();

  // close modal
  closeMainModal();
}

function setLoadoData() {
  const mainLoado = data.getMainLoado();

  const newMainLoado = mainLoado.map(item => {
    let isUse = false;
    const $elm = document.querySelector(`#main-modal-content-list .check-cell[data-keyName="${item.keyName}"]`);
    if ($elm.classList.contains('check-cell-active') === true) {
      isUse = true;
    }
    return { ...item, isUse };
  });

  data.setMainLoado(newMainLoado);
}

function setMainCharacterLoadoData() {
  const mainCharacterLoado = data.getMainCharacterLoado();
  const originData = mainCharacterLoado.map(item => item.nickname);

  const newData = [];
  const $elms = document.querySelectorAll(`#main-modal-character-list .check-cell.check-cell-active`);
  $elms.forEach($elm => {
    const nickname = $elm.getAttribute('data-nickname');
    const classname = $elm.getAttribute('data-classname');
    newData.push({ nickname, classname });
  })

  const resultData = [];

  // 새로운 데이터에 기존 데이터값이 있다면 유지해야할 데이터
  originData.forEach(item => {
    const matchDataIndex = newData.findIndex(nickname => nickname === item.nickname);
    if (matchDataIndex !== -1) {
      resultData.push(item);
      newData.splice(matchDataIndex, 1);
    }
  });

  // 나머지 새로운 데이터는 추가되어야 할 데이터
  newData.forEach(item => {
    resultData.push(item);
  });

  data.setMainCharacterLoado(resultData);
}