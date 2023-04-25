import { CONSTANTS, HTTP_METHOD } from './contants.js';

window.addEventListener('load', () => {
  const headerParentElm = document.getElementById('includedHeaderWrapper');
  const headerFilePath = 'http://localhost:8000/layout/header.html';
  includeLayoutFile(headerParentElm, headerFilePath).then(() => {
    setupNavigationActiveMark();
  });

  const footerParentElm = document.getElementById('includedFooterWrapper');
  const footerFilePath = 'http://localhost:8000/layout/footer.html';
  includeLayoutFile(footerParentElm, footerFilePath);
})

async function includeLayoutFile(parentElm, filePath) {
  return new Promise((resolve) => {
    const xhr = new XMLHttpRequest();
    xhr.open(HTTP_METHOD.get, filePath);
    xhr.onreadystatechange = async function(event) {
      const { target } = event;
      if (target.readyState === XMLHttpRequest.DONE) {
        switch (target.status) {
          case CONSTANTS.xmlHttpRequestResponseOK: {
            parentElm.innerHTML = target.response;
            resolve();
            break;
          }
          case CONSTANTS.xmlHttpRequestResponseNotFound: {
            alert('include layout file failed - not found');
            break;
          }
          default: {
            alert('include layout file failed - undefined status');
          }
        }
      }
    }
    xhr.send();
  })
}

function setupNavigationActiveMark() {
  const pathname = window.location.pathname;

  const navigationLinks = document.querySelectorAll('#header .navigation-panel a');
  for (const item of navigationLinks) {
    const href = item.getAttribute('href');
    if (pathname === href) {
      item.classList.add('active');
      break;
    }
  }
}