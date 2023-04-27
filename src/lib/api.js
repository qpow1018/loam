




class API {
  getTest() {
    // dotenv.config();
    // const test = process.env.APP_DOMAIN;
    // console.log('test', test);

    var xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.open("GET", "https://developer-lostark.game.onstove.com/characters/간판스타야무진/siblings", true);
    xmlHttpRequest.setRequestHeader('accept', 'application/json');
    xmlHttpRequest.setRequestHeader('authorization', 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyIsImtpZCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyJ9.eyJpc3MiOiJodHRwczovL2x1ZHkuZ2FtZS5vbnN0b3ZlLmNvbSIsImF1ZCI6Imh0dHBzOi8vbHVkeS5nYW1lLm9uc3RvdmUuY29tL3Jlc291cmNlcyIsImNsaWVudF9pZCI6IjEwMDAwMDAwMDAyMjgzNTgifQ.SnfxMwIL6q9zez6a5EtiFLLi4lTI9TfhLcVxnW9yVxOGft1-thlZCZ2A-kUBI5fy8P479DOyFZJHq_dgT7LO0cVzoyycg1B_kWdRH8cdYRIAN1Ezmv6W0udueGhe3rTq3tyfsdI673_74aFzOhBx_Ln4dtPiMXZ6giQ4_SWW2ipmNKcRc4d-UCzQz2szgZnb6Pa474YH5SKcp5KdRExjp3IC5ts9fBMRaKFfb8_fXgx2WhfbMebODccD3gIkcd-MD_ZjxcMywRaNcjOiswbGyS9nr5szXXKv1E4VuljDjA6JZW6FKz_VgMH48oTGzjkVcVmZhT6s-3YcMpfiyWahnw');
    xmlHttpRequest.onreadystatechange = (e) => {
      
      console.log('djodjodj??', e)
      
    };
    xmlHttpRequest.send();
    console.log('kgkgkgkgkgkgkg');
  }
  
  // function api_test(nickname) {
  //   fetch('url', {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       title: "Test",
  //       body: "I am testing!",
  //       userId: 1,
  //     }),
  //   }).then((response) => console.log(response));
  // }
  
  static instance = null;
  static getInstance() {
    if (API.instance === null) {
      API.instance = new API();
    }
    return API.instance;
  }
}

const _inst = new API();
export default _inst;