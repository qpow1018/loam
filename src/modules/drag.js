class Drag {
  #containerElm = null;
  #handleElmClassName = null;
  #direction = null;
  #standardOfMouseMove = 8;
  #siblingPointGap = 8;

  // options desc
  // containerElm : 드래그 영역 element / 해당 element 기준으로 childList의 변화를 감지하여 드래그 이벤트 추가 및 childList를 드래그 대상으로 설정
  // handleElmClassName(optional) : 드래그 대상의 handle class명 / 드래그 대상 자체를 handle로 사용
  // direction : x or y
  setupOptions(options) {
    if (!(options.containerElm instanceof Element || options.containerElm instanceof HTMLDocument)) {
      throw new Error('draggable containter is not element');
    }

    if (options.direction !== 'x' && options.direction !== 'y') {
      throw new Error('drag direction is "x" or "y"');
    }

    this.#containerElm = options.containerElm;
    this.#handleElmClassName = options.handleElmClassName ? options.handleElmClassName : null;
    this.#direction = options.direction;
  }

  init() {
    if (this.#containerElm === null) {
      throw new Error('required container element');
    }

    if (this.#direction === null) {
      throw new Error('required drag direction');
    }

    setTimeout(() => {
      for (let elm of this.#containerElm.children) {
        const $target = elm;
        const $handle = this.#handleElmClassName !== null ? $target.querySelector(`.${this.#handleElmClassName}`) : $target;
        this.#addDraggableEvent($target, $handle);
      }
    }, 100)
  }

  #addDraggableEvent($target, $handle) {
    // direction에 따라서 X값을 사용할지 Y값을 사용할지 먼저 정하기
    // 사용하는 함수를 먼저 정하면 mousemove에서 if 분기를 줄일 수 있다.
    const getPagePoint = this.#getPagePoint();

    let firstMouseDownPoint = null;
    let $ghostElm = null;
    let ghostElmCenterPoint = null;

    // direction에 따라 형제 element의 위치 저장
    // prev 위치 : y일경우 bottom, x일경우 right
    // next 위치 : y일경우 top, x일경우 left
    const { prevElementSiblingPoint, nextElementSiblingPoint } = this.#getElementSiblingInfo($target);
    let prevSiblingPoint = prevElementSiblingPoint;
    let nextSiblingPoint = nextElementSiblingPoint;

    $handle.addEventListener('mousedown', (e) => {
      // 브라우저에 selection이 있을 경우 (잘못된 드래그 등)
      // 브라우저의 drag event가 발생될 수 있다.
      // 그렇기에 selection을 제거해야 원하는 동작이 수행된다.
      // Chrome에서만 사용하기 때문에 Chrome 기준으로 selection을 제거한다.
      window.getSelection().empty();

      firstMouseDownPoint = getPagePoint(e);
      document.body.addEventListener('mousemove', onMousemove);
      document.body.addEventListener('mouseup', onMouseUp);
    });

    // 마우스 이동거리가 standardOfMouseMove 이상이면 드래그로 판단하고 새로운 mousemove 이벤트를 부여한다.
    const onMousemove = (e) => {
      const movePoint = Math.abs(firstMouseDownPoint - getPagePoint(e));
      if (this.#standardOfMouseMove <= movePoint) {
        // 기존 mousemove 이벤트 제거
        document.body.removeEventListener('mousemove', onMousemove);

        // target의 Ghost Element 추가
        const { element, centerPoint } = this.#makeGhostElementAndGetCenterPoint($target);
        $ghostElm = element;
        ghostElmCenterPoint = centerPoint;
        document.body.appendChild($ghostElm);

        // Ghost Element Move 이벤트 등록
        document.body.addEventListener('mousemove', onMoveGhoseElement);

        // target 식별 class 추가
        // Ghost Element는 cloneNode로 생성하기 때문에 해당 class를 포함시키지 않기 위해 Ghost Element를 먼저 생성 후 class 추가
        $target.classList.add('loam-drag-selected');
      }
    }

    const onMoveGhoseElement = (e) => {
      const movePoint = getPagePoint(e) - firstMouseDownPoint;
      $ghostElm.style.transform = `translateY(${movePoint}px)`;

      // 타겟 요소의 중간지점이 형제 요소의 영역으로 들어갔을 때 위치 변경이 일어나야 한다.
      const curCenterPoint = ghostElmCenterPoint + movePoint;
      const isMovePrev = prevSiblingPoint !== null && curCenterPoint < prevSiblingPoint;
      const isMoveNext = nextSiblingPoint !== null && nextSiblingPoint < curCenterPoint;

      if (isMovePrev || isMoveNext) {
        if (isMovePrev) {
          this.#containerElm.insertBefore($target, $target.previousElementSibling);
        } else {
          this.#containerElm.insertBefore($target.nextElementSibling, $target);
        }

        const { prevElementSiblingPoint, nextElementSiblingPoint } = this.#getElementSiblingInfo($target);
        prevSiblingPoint = prevElementSiblingPoint;
        nextSiblingPoint = nextElementSiblingPoint;
      }
    }

    // 드래그 이벤트가 끝남
    const onMouseUp = (e) => {
      console.log('$ghostElm', $ghostElm);


      // 등록된 이벤트 제거
      document.body.removeEventListener('mousemove', onMoveGhoseElement);
      document.body.removeEventListener('mousemove', onMouseUp);

      // Ghost Element 위치 맞추기 후 초기화
      $ghostElm.style.transition = '0.15s ease';
      $ghostElm.style.transform = 'translateX(0)';
      $ghostElm.style.transform = 'translateY(0)';

      setTimeout(() => {
        $target.classList.remove('loam-drag-selected');
        $ghostElm.remove();
        $ghostElm = null;
        ghostElmCenterPoint = null;
      }, 150);
    }
    
    
    // TODO 추가 작업 필요
    // onMouseUp 할때 ghostElm이 null 인 현상
    // onMouseUp 할때 $ghostElm.style.transform 이 초기 위치로 돌아감 - 변경된 위치로 가야하는데
    // drag.init() 추가 필요 - 리스트 목록이 추가 or 삭제 되었을 때
    
  }

  #getPagePoint() {
    const _getPageX = (e) => {
      return e.pageX;
    }
    const _getPageY = (e) => {
      return e.pageY;
    }
    return this.#direction === 'y' ? _getPageY : _getPageX;
  }

  #makeGhostElementAndGetCenterPoint($target) {
    const element = $target.cloneNode(true);
    element.classList.add('loam-drag-target-ghost');

    const targetDOMRect = $target.getBoundingClientRect();
    element.style.width = `${targetDOMRect.width}px`;
    element.style.height = `${targetDOMRect.height}px`;
    element.style.top = `${targetDOMRect.top}px`;
    element.style.left = `${targetDOMRect.left}px`;

    let centerPoint = 0;
    if (this.#direction === 'y') {
      centerPoint = targetDOMRect.top + (targetDOMRect.height / 2);
    } else {
      centerPoint = targetDOMRect.left + (targetDOMRect.width / 2);
    }

    
    console.log('element', element)
    return { element, centerPoint };
  }

  #getElementSiblingInfo($target) {
    const $prevElementSibling = $target.previousElementSibling;
    let prevElementSiblingPoint = null;
    if ($prevElementSibling !== null) {
      const _prevElmDomRect = $prevElementSibling.getBoundingClientRect();
      if (this.#direction === 'y') {
        prevElementSiblingPoint = _prevElmDomRect.top + _prevElmDomRect.height - this.#siblingPointGap;
      } else {
        prevElementSiblingPoint = _prevElmDomRect.left + _prevElmDomRect.width - this.#siblingPointGap;
      }
    }

    const $nextElementSibling = $target.nextElementSibling;
    let nextElementSiblingPoint = null;
    if ($nextElementSibling !== null) {
      const _nextElmDomRect = $nextElementSibling.getBoundingClientRect();
      if (this.#direction === 'y') {
        nextElementSiblingPoint = _nextElmDomRect.top + this.#siblingPointGap;
      } else {
        nextElementSiblingPoint = _nextElmDomRect.left + this.#siblingPointGap;
      }
    }

    return { prevElementSiblingPoint, nextElementSiblingPoint };
  }
}

export default Drag;