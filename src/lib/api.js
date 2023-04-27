// TODO 환경변수로 변경하기
const API_CONFIG = {
  domain: 'https://developer-lostark.game.onstove.com',
  key: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyIsImtpZCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyJ9.eyJpc3MiOiJodHRwczovL2x1ZHkuZ2FtZS5vbnN0b3ZlLmNvbSIsImF1ZCI6Imh0dHBzOi8vbHVkeS5nYW1lLm9uc3RvdmUuY29tL3Jlc291cmNlcyIsImNsaWVudF9pZCI6IjEwMDAwMDAwMDAyMjgzNTgifQ.SnfxMwIL6q9zez6a5EtiFLLi4lTI9TfhLcVxnW9yVxOGft1-thlZCZ2A-kUBI5fy8P479DOyFZJHq_dgT7LO0cVzoyycg1B_kWdRH8cdYRIAN1Ezmv6W0udueGhe3rTq3tyfsdI673_74aFzOhBx_Ln4dtPiMXZ6giQ4_SWW2ipmNKcRc4d-UCzQz2szgZnb6Pa474YH5SKcp5KdRExjp3IC5ts9fBMRaKFfb8_fXgx2WhfbMebODccD3gIkcd-MD_ZjxcMywRaNcjOiswbGyS9nr5szXXKv1E4VuljDjA6JZW6FKz_VgMH48oTGzjkVcVmZhT6s-3YcMpfiyWahnw'
}

const HTTP = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE'
}

class API {
  async #request(httpMethod, url, body) {
    const option = {
      method: httpMethod,
      headers: {
        "Content-Type": "application/json",
        "authorization": `bearer ${API_CONFIG.key}`
      }
    }

    if (httpMethod === HTTP.POST || httpMethod === HTTP.PUT) {
      option.body = JSON.stringify({ ...body })
    }

    try {
      const response = await fetch(API_CONFIG.domain + url, option);
      return response.json();
    } catch (error) {
      throw error;
    }
  }

  async getCharacterInfoByNickname(nickname) {
    if (nickname.length === 0) {
      throw new Error('required nickname');
    }

    return this.#request(
      HTTP.GET,
      `/armories/characters/${nickname}`
    );
  }

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