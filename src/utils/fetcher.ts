const BASEURL_API = process.env.REACT_APP_BASEURL_API;
const EMAIL = process.env.REACT_APP_EMAIL;
const PASSWORD = process.env.REACT_APP_PASSWORD;

const DEFAULT_HEADERS = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

const fetcherObj = {
  token: "",
  getToken: async function () {
    return fetch(`${BASEURL_API}/auth/login`, {
      method: "POST",
      headers: DEFAULT_HEADERS,
      body: JSON.stringify({
        email: EMAIL,
        password: PASSWORD,
      }),
    })
      .then((response) => response.json())
      .then((data) => data.auth_token);
  },
  fetcher: async function <T>(path: string, options: RequestInit): Promise<T> {
    if (!this.token) {
      this.token = await this.getToken();
    }
    return fetch(`${BASEURL_API}${path}`, {
      headers: { Authorization: this.token, ...DEFAULT_HEADERS },
      ...options,
    })
      .then((response) => response.text())
      .then((responseText) => (responseText ? JSON.parse(responseText) : {}))
      .then((data) => data);
  },
};

export { fetcherObj };
