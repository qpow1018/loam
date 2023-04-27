const HTML_HEADER = `
  <header id="header">
    <a href="/" class="header-logo">
      LoAM
    </a>
    <ul class="navigation-panel">
      <li>
        <a href="/">
          <i class="fa-solid fa-square-check"></i>
          <span>할 일</span>
        </a>
      </li>
      <li>
        <a href="/my-characters.html">
          <i class="fa-solid fa-users"></i>
          <span>캐릭터</span>
        </a>
      </li>
      <li>
        <a href="/">
          <i class="fa-solid fa-ranking-star"></i>
          <span>랭킹</span>
        </a>
      </li>
    </ul>
    <div>Todo - 캐릭검색, 인벤검색</div>
  </header>
`;

const HTML_FOOTER = `
    <footer id="footer">
    Footer / Made by Jin
    </footer>
`;

window.addEventListener('load', () => {
  document.getElementById('includedHeaderWrapper').innerHTML = HTML_HEADER;
  document.getElementById('includedFooterWrapper').innerHTML = HTML_FOOTER;
});