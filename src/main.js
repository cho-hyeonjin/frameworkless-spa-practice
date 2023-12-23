import GithubAvatar, { EVENTS } from "./components/GithubAvatar.js";

window.customElements.define("github-avatar", GithubAvatar);

document.querySelectorAll("github-avatar").forEach((avatar) => {
  avatar.addEventListener(EVENTS.AVATAR_LOAD_COMPLETE, (e) => {
    console.log("Avatar Loaded", e.detail.avatar);
  });

  avatar.addEventListener(EVENTS.AVATAR_LOAD_ERROR, (e) => {
    console.log("Avatar Loading error", e.detail.error);
  });
});