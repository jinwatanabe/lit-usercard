import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import "./user-card";

const user2 = {
  username: "あいかわ",
  age: "30",
  prefecture: "福岡",
  topImage: "https://source.unsplash.com/random?human",
  subImages: [
    "https://source.unsplash.com/random?fruit",
    "https://source.unsplash.com/random?sweets",
    "https://source.unsplash.com/random?cat",
    "https://source.unsplash.com/random?school",
  ],
  selfIntroduction: "宝くじを当てたい",
};
@customElement("user-select")
export class UserSelect extends LitElement {
  @property({ type: Object })
  user = {
    username: "じん!!",
    age: "25",
    prefecture: "埼玉県",
    topImage: "https://source.unsplash.com/random?human",
    subImages: [
      "https://source.unsplash.com/random?fruit",
      "https://source.unsplash.com/random?sweets",
      "https://source.unsplash.com/random?cat",
      "https://source.unsplash.com/random?school",
    ],
    selfIntroduction: "test",
  };

  @property({ type: Number, attribute: "index" })
  index = 0;

  _prevProfile() {
    this.index = this.index - 1;
    this.index = this.index < 0 ? 0 : this.index;
    // this.user = users[this.index];
  }
  _nextProfile() {
    this.index = this.index + 1;
    // this.user = users[this.index];
  }

  navigator() {
    return html`
      <div
        style="padding-top: 10px; display: flex; justify-content: space-between; width: 180px; padding-left: 10px; padding-right: 10px;"
      >
        <button @click=${this._prevProfile} class="btn">前へ</button>
        <button @click=${this._nextProfile} class="btn">次へ</button>
      </div>
    `;
  }

  render() {
    return html`
      <user-card .user="${this.user}"></user-card>
      ${this.navigator()}
    `;
  }
}
