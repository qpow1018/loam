class Drag {
  #containerElm = null;
  #handleElmClassName = null;

  // options desc
  // containerElm : 드래그 영역 element / 해당 element 기준으로 childList의 변화를 감지하여 드래그 이벤트 추가 및 childList를 드래그 대상으로 설정
  // handleElmClassName(optional) : 드래그 대상의 handle class명 / 드래그 대상 자체를 handle로 사용
  setupOptions(options) {
    if (!(options.containerElm instanceof Element || options.containerElm instanceof HTMLDocument)) {
      throw new Error('draggable containter is not element');
    }

    this.#containerElm = options.containerElm;
    this.#handleElmClassName = options.handleElmClassName ? options.handleElmClassName : null;
  }

  init() {
    if (this.#containerElm === null) {
      throw new Error('required container element');
    }

    const observer = new MutationObserver((mutations) => {
      mutations.forEach(mutation => {
        const addedNode = mutation.addedNodes.item(0);
        if (this.#handleElmClassName === null) {
          this.#addDraggableEvent(addedNode);
        } else {
          const handleElm = addedNode.querySelector(`.${this.#handleElmClassName}`);
          this.#addDraggableEvent(handleElm);
        }
      });
    });

    observer.observe(this.#containerElm, {
      childList: true
    });
  }

  #addDraggableEvent($elm) {
    $elm.setAttribute('draggable', true);
    
    $elm.addEventListener('drag', () => {
      console.log('드래그 시작');
    })
  }

}

export default Drag;