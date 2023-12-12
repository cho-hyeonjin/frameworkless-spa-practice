const ERROR_IMAGE = "https://files-82ee7vgzc.now.sh";
const LOADING_IMAGE = "https://files-8bga2nnt0.now.sh";

const getGithubAvatarUrl = async (user) => {
  if (!user) {
    return;
  }

  const url = `https://api.github.com/users/${user}`; // toss.tech 페이지 sources의 assets에 있는 이미지를 사용해보려 했으나, response가 json이 아닌 image 파일 자체여서 일단 예제코드 그대로 진행

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const data = await response.json();
  return data.avatar_url;
};

export default class GithubAvatar extends HTMLElement {
  constructor() {
    super();
    this.url = LOADING_IMAGE;
  }

  get user() {
    return this.getAttribute("user");
  }

  set user(value) {
    this.setAttribute("user", value);
  }

  render() {
    window.requestAnimationFrame(() => {
      this.innerHTML = "";
      const img = document.createElement("img");
      img.src = this.url;
      this.appendChild(img);
    });
  }

  async loadNewAvatar() {
    const { user } = this;
    if (!user) {
      return;
    }
    try {
      this.url = await getGithubAvatarUrl(user);
    } catch (e) {
      this.url = ERROR_IMAGE;
    }

    this.render();
  }

  connectedCallback() {
    this.render();
    this.loadNewAvatar();
  }
}
