class Modal {
  #openedModals = [];

  #createModalBackgroud() {
    if (this.#openedModals.length !== 0) return;

    const modalBackgroundElm = document.createElement('div');
    modalBackgroundElm.classList.add('loam-modal-background');
    modalBackgroundElm.addEventListener('click', () => {
      if (this.#openedModals.length === 0) return;
      const lastModalId = this.#openedModals[this.#openedModals.length - 1];
      this.closeWithId(lastModalId);
    });

    document.body.appendChild(modalBackgroundElm);
    document.body.classList.add('disabled-scroll');
  }

  #deleteModalBackground() {
    if (this.#openedModals.length !== 0) return;

    const modalBackgroundElm = document.querySelector('.loam-modal-background');
    modalBackgroundElm.remove();

    document.body.classList.remove('disabled-scroll');
  }

  openWithId(elmId) {
    // 기존에 열려있는 모달이면 다시 열리지 않도록
    if (this.#openedModals.findIndex(id => id === elmId) !== -1) return;

    this.#createModalBackgroud();

    const modalElm = document.getElementById(elmId);
    if (modalElm === null) {
      throw new Error('openModal error - elmId is null');
    }

    modalElm.classList.add('open');
    this.#openedModals.push(elmId);
  }

  closeWithId(elmId) {
    const modalElm = document.getElementById(elmId);
    if (modalElm === null) {
      throw new Error('openModal error - elmId is null');
    }

    modalElm.classList.remove('open');
    this.#openedModals = this.#openedModals.filter(id => id !== elmId);

    this.#deleteModalBackground();
  }
}

const _inst = new Modal();
export default _inst;