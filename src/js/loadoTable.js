import { LOADO } from './contants.js';
import Data from './data.js';

class LoadoCell {
  #text = null;
  #imageUrl = null;

  getText() {
    return this.#text;
  }
  setText(text) {
    this.#text = text;
  }

  getImageUrl() {
    return this.#imageUrl;
  }
  setImageUrl(imageUrl) {
    this.#imageUrl = imageUrl;
  }


  // 종류 및 동작 정의
  
  // 메인캐릭터 열
  // 닉네임, 아이콘 표시, 스타일 다르게
  // 클릭 기능 없음
  // 드래그 가능
  // 우클릭시 모달 열기
  
  // 메인캐릭터 행
  // 아이콘 정보, 라벨, 스타일 다르게
  // 일일 or 주간
  // 클릭 기능 없음
  // 드래그 가능
  // 우클릭시 모달 열기
  
  // 메인캐릭터 벨류
  // 타입 - 텍스트, 체크박스, 휴게, 체크 + 텍스트
  // 리셋 설정
  // 클릭 시 체크일 경우 체크
  // 우클릭시 모달 열기

  getElement() {
    const text = this.getText();

    let loadoCellElm = document.createElement('div');
    loadoCellElm.classList.add('loado-cell');


    return loadoCellElm;
  }
}

class LoadoTable {
  
  
  
  
  
  
  
  #makeMainCharacterTable() {
    const dataInst = Data.getInstance();
    const mainCharacters = dataInst.getMainCharacters();

    if (mainCharacters.length === 0) {
      this.#addEmptyContentElement(mainCharacterTableElm);
      return;
    }

    this.#makeMainCharacterTableHeader(mainCharacters);
  }

  #makeMainCharacterTableHeader(mainCharacters) {
    const mainCharacterTableElm = document.getElementById('mainCharacterTable');
    const tableHeaderElmString = `
      <div class="table-header">
        <div class="loado-cell"></div>
      </div>
    `;
    mainCharacterTableElm.insertAdjacentHTML('afterbegin', tableHeaderElmString);

    // 캐릭터 리스트 추가
    const loadoCellParantElm = document.querySelector('#mainCharacterTable .table-header');
    for (let i = 0; i < mainCharacters.length; i++) {
      const curData = mainCharacters[i];

      const loadoCell = new LoadoCell();
      loadoCell.setText(curData.nickname);

      const loadoElm = loadoCell.getElement();
      loadoCellParantElm.appendChild(loadoElm);
    }
  }

  #addEmptyContentElement(parentElement) {
    const emptyContentElmString = `
      <div class="empty-content">
        저장된 내용이 없습니다.
      </div>
    `;
    parentElement.insertAdjacentHTML('beforeend', emptyContentElmString);
  }

  init() {
    this.#makeMainCharacterTable();
    console.log('CharacterTable init');
  }
}

export default LoadoTable