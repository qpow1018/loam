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

const $closeMemoContentsModalBtn = document.querySelector('#memo-contents-modal .modal-close-btn');
const $memoContentsInput = document.querySelector('#memo-contents-modal #memo-contents-input');
const $memoContentsSubmitBtn = document.querySelector('#memo-contents-modal #memo-contents-submit-btn');

// Common Content Cell
$closeMemoContentsModalBtn.addEventListener('click', closeMemoContentsModal);
$memoContentsSubmitBtn.addEventListener('click', submitMemoContents);

let $dataTargetCell = null;
let dataTarget = null;
let dataKeyName = null;
let dataNickname = null;
let dataCellType = null;
let dataCellValue = null;

function clearContentCellData() {
  $dataTargetCell = null;
  dataTarget = null;
  dataKeyName = null;
  dataNickname = null;
  dataCellType = null;
  dataCellValue = null;
}

function updateContentCellTextData() {
  switch (dataTarget) {
    case 'main': {
      const _value = $memoContentsInput.value.trim();
      $dataTargetCell.textContent = _value;
      data.updateMainCharacterLoado(dataNickname, dataKeyName, dataCellType, _value);
      break;
    }
    case 'group': {
      break;
    }
    case 'sub': {
      break;
    }
    default: {
      throw new Error('undefined cell data target');
    }
  }
}

function updateContentCellCheckboxData() {
  switch (dataTarget) {
    case 'main': {
      $dataTargetCell.classList.toggle('active');
      data.updateMainCharacterLoado(dataNickname, dataKeyName, dataCellType, !dataCellValue);
      break;
    }
    case 'group': {
      break;
    }
    case 'sub': {
      break;
    }
    default: {
      throw new Error('undefined cell data target');
    }
  }
}

function handleClickContentCell() {
  switch (dataCellType) {
    case 'text': {
      openMemoContentsModal();
      break;
    }
    case 'checkbox': {
      updateContentCellCheckboxData();
      break;
    }
    case 'relaxationBonus': {
      break;
    }
    default: {
      throw new Error('undefined cell type');
    }
  }
}

function openMemoContentsModal() {
  $memoContentsInput.value = dataCellValue;
  modal.openWithId('memo-contents-modal');
  $memoContentsInput.focus();
}

function closeMemoContentsModal() {
  $memoContentsInput.value = '';
  modal.closeWithId('memo-contents-modal');
}

function submitMemoContents() {
  updateContentCellTextData();
  closeMemoContentsModal();
}






// Main Table
initMainTable();

function initMainTable() {
  // 기존 DOM 초기화
  $mainTableSubjectColumn.replaceChildren();
  $mainTableBody.replaceChildren();

  const allMainCharacterLoado = data.getAllMainCharacterLoado();
  if (0 < allMainCharacterLoado.length) {
    initMainLoadoSubjectColumn();
    initMainLoadoCharacterColumn();
  }
}

function initMainLoadoSubjectColumn() {
  $mainTableSubjectColumn.insertAdjacentHTML('afterbegin', '<div class="loado-cell main-table-subject-cell loado-cell-header"></div>');

  const useMainLoado = data.getMainLoado().filter(item => item.isUse === true);
  let $lastDailyContentElm = null;

  for (let i = 0; i < useMainLoado.length; i++) {
    const keyName = useMainLoado[i].keyName;
    const contentData = config.data[keyName];

    const $elm = document.createElement('div');
    $elm.classList.add('loado-cell', 'main-table-subject-cell');

    if (contentData.resetType === 'daily') {
      $lastDailyContentElm = $elm;
    }

    let iconElmStr = '';
    if (contentData.iconFileName !== '') {
      iconElmStr = `
        <img
          src="assets/images/${contentData.iconFileName}"
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
          ${ contentData.title }
        </div>
      `
    );

    $mainTableSubjectColumn.append($elm);
  }

  if ($lastDailyContentElm !== null) {
    $lastDailyContentElm.classList.add('loado-cell-last-daily');
  }
}

function initMainLoadoCharacterColumn() {
  const newMainCharacterLoado = [];

  const allMainCharacterLoado = data.getAllMainCharacterLoado();
  allMainCharacterLoado.forEach(item => {
    const { $columnElm, loadoData } = getMainLoadoCharacterColumnAndMainLoadoCharacterData(item);
    newMainCharacterLoado.push(loadoData);
    $mainTableBody.append($columnElm);
  });

  data.setAllMainCharacterLoado(newMainCharacterLoado);
}

function getMainLoadoCharacterColumnAndMainLoadoCharacterData(mainCharacterLoado) {
  const $columnElm = document.createElement('div');
  $columnElm.classList.add('table-character-column');
  $columnElm.insertAdjacentHTML('afterbegin',
    `
      <div class="loado-cell loado-cell-header loado-nickname-cell">
        <div class="loado-nickname-cell-classname">
          ${ mainCharacterLoado.classname }
        </div>
        <div class="loado-nickname-cell-nickname">
          ${ mainCharacterLoado.nickname }
        </div>
      </div>
    `
  );

  const newLoado = {
    nickname: mainCharacterLoado.nickname,
    classname: mainCharacterLoado.classname
  };

  const useMainLoado = data.getMainLoado().filter(item => item.isUse === true);
  let $lastDailyContentElm = null;

  for (let i = 0; i < useMainLoado.length; i++) {
    const keyName = useMainLoado[i].keyName;
    const contentData = config.data[keyName];

    let cellType = null;
    let cellValue = '';

    const originData = mainCharacterLoado[keyName];
    if (originData !== undefined) {
      cellType = originData.type;
      cellValue = originData.value;

    } else {
      cellType = contentData.defaultCellType;
      cellValue = contentData.defaultValue;
    }

    const $loadoCellElm = document.createElement('div');
    $loadoCellElm.classList.add('loado-cell');
    setupMainLoadoCharacterContentCell($loadoCellElm, mainCharacterLoado.nickname, keyName, cellType, cellValue);

    newLoado[keyName] = {
      keyName: keyName,
      type: cellType,
      value: cellValue
    }

    if (contentData.resetType === 'daily') {
      $lastDailyContentElm = $loadoCellElm;
    }

    $columnElm.appendChild($loadoCellElm);
  }

  if ($lastDailyContentElm !== null) {
    $lastDailyContentElm.classList.add('loado-cell-last-daily');
  }

  return { $columnElm, loadoData: newLoado };
}

function setupMainLoadoCharacterContentCell($parent, nickname, keyName, cellType, cellValue) {
  const $contentCell = document.createElement('div');
  $contentCell.classList.add('loado-content-cell');

  let cellInnerElmStr = '';

  switch (cellType) {
    case 'text': {
      $contentCell.classList.add('loado-content-cell-text');
      cellInnerElmStr = cellValue;
      break;
    }
    case 'checkbox': {
      $contentCell.classList.add('loado-content-cell-checkbox');
      if (cellValue === true) {
        $contentCell.classList.add('active');
      }
      cellInnerElmStr = `
        <i class="fa-regular fa-square no-active"></i>
        <i class="fa-solid fa-square-check active"></i>
      `;
      break;
    }
    case 'relaxationBonus': {
      $contentCell.classList.add('loado-content-cell-relaxatio-bonus');
      cellInnerElmStr = `
        ${ cellValue.count }
        <i class="fa-regular fa-square no-active"></i>
        <i class="fa-solid fa-square-check active"></i>
      `;
      break;
    }
    default: {
      throw new Error('undefined cell type');
    }
  }

  $contentCell.insertAdjacentHTML('afterbegin', cellInnerElmStr);

  $contentCell.addEventListener('click', () => {
    clearContentCellData();

    $dataTargetCell = $contentCell;
    dataTarget = 'main';
    dataKeyName = keyName;
    dataNickname = nickname;
    dataCellType = cellType;
    dataCellValue = cellValue;

    handleClickContentCell();
  });

  $parent.appendChild($contentCell);
}

// Common Modal
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

// Main Modal
$openMainModalBtn.addEventListener('click', openMainModal);
$closeMainModalBtn.addEventListener('click', closeMainModal);
$mainModalSubmitBtn.addEventListener('click', submitMainModalData);

initMainModal();

function initMainModal() {
  const mainLoado = data.getMainLoado();
  mainLoado.forEach(item => {
    const $elm = makeModalCheckElm(config.data[item.keyName].title);
    $elm.setAttribute('data-key-name', item.keyName);
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
    const $elm = document.querySelector(`#main-modal-content-list .check-cell[data-key-name="${item.keyName}"]`);
    checkModalCheckElm($elm, item.isUse);
  });

  const allMainCharacterLoado = data.getAllMainCharacterLoado();
  allMainCharacterLoado.forEach(item => {
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
    const $elm = document.querySelector(`#main-modal-content-list .check-cell[data-key-name="${item.keyName}"]`);
    if ($elm.classList.contains('check-cell-active') === true) {
      isUse = true;
    }
    return { ...item, isUse };
  });

  data.setMainLoado(newMainLoado);
}

function setMainCharacterLoadoData() {
  const allMainCharacterLoado = data.getAllMainCharacterLoado();
  const originData = allMainCharacterLoado.map(item => item.nickname);

  const newData = [];
  const $elms = document.querySelectorAll(`#main-modal-character-list .check-cell.check-cell-active`);
  $elms.forEach($elm => {
    const nickname = $elm.getAttribute('data-nickname');
    const classname = $elm.getAttribute('data-classname');
    newData.push({ nickname, classname });
  });

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

  data.setAllMainCharacterLoado(resultData);
}