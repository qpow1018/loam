class Snackbar {
  #hideSeconds = 2500;
  #displaySnackbars = [];

  success(message) {
    const $elm = this.#makeElement('success', message);
    this.#appendElement($elm);
    this.#setupAutoRemoveFunc($elm);
  }

  error(message) {
    const $elm = this.#makeElement('error', message);
    this.#appendElement($elm);
    this.#setupAutoRemoveFunc($elm);
  }

  #makeElement(type, message) {
    const $elm = document.createElement('div');
    $elm.classList.add('loam-snackbar');

    let colorClassName = 'loam-snackbar-error';
    let iconClassName = 'fa-solid fa-circle-exclamation';

    if (type === 'success') {
      colorClassName = 'loam-snackbar-success';
      iconClassName = 'fa-solid fa-circle-check';
    }

    $elm.insertAdjacentHTML(
      'afterbegin',
      `
        <div class="loam-snackbar-container ${colorClassName}">
          <div class="loam-snackbar-icon">
            <i class="${iconClassName}"></i>
          </div>
          <div class="loam-snackbar-message">
            ${message}
          </div>
        </div>
      `
    );
    return $elm;
  }

  #appendElement($elm) {
    document.body.append($elm);
    this.#displaySnackbars.unshift($elm);

    $elm.style.bottom = `-${$elm.offsetHeight}px`;
    $elm.style.visibility = 'visible';

    setTimeout(() => {
      this.#updatePositions();
    }, 10);
  }

  #updatePositions() {
    let prevBottomPosition = 0;
    this.#displaySnackbars.forEach($elm => {
      $elm.style.bottom = `${prevBottomPosition}px`;
      prevBottomPosition += $elm.offsetHeight;
    })
  }

  #setupAutoRemoveFunc($elm) {
    setTimeout(() => {
      $elm.classList.add('loam-snackbar-hide');

      // hide 애니메이션 실행 후 실제 요소 없애기
      setTimeout(() => {
        this.#displaySnackbars.pop();
        $elm.remove();
      }, 250);

    }, this.#hideSeconds);
  }
}

const _inst = new Snackbar()
export default _inst;