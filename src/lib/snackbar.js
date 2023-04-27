class Snackbar {
  #displaySnackbars = [];
  
  
  success(message) {
    document.body.insertAdjacentHTML(
      'beforeend',
      `
        <div class="test-snackbar">
          ${message}
        </div>
      `
    );
  }

  error(message) {
    
  }

}

const _inst = new Snackbar()
export default _inst;