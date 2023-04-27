class Utils {
  // 특정 엘리먼트에 로딩 엘리먼드를 추가한다.
  addLoadingElement($parentElm, type) {
    if ($parentElm === null || $parentElm === undefined) {
      throw new Error('parent loading element is required');
    }

    switch (type) {
      case 'fixed': {
        $parentElm.classList.add('loam-fixed-loading');
        $parentElm.insertAdjacentHTML(
          'afterbegin',
          `
            <div class="loam-fixed-loading-container">
              <div class="loam-fixed-loading-spinner"></div>
            </div>
          `
        )
        break;
      }
      case 'box': {
        $parentElm.classList.add('loam-box-loading');
        $parentElm.insertAdjacentHTML(
          'afterbegin',
          `
            <div class="loam-box-loading-container">
              <div class="loam-box-loading-spinner"></div>
            </div>
          `
        )
        break;
      }
      default: {
        throw new Error('undefined loading element type');
      }
    }
  }

  // 특정 엘리먼트를 display: 'block' 으로 변경한다.
  showElement($elm) {
    $elm.style.display = 'block';
  }

  // 특정 엘리먼트를 display: 'none' 으로 변경한다.
  hideElement($elm) {
    $elm.style.display = 'none';
  }
}

const _inst = new Utils()
export default _inst;