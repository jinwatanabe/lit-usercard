import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { usersData } from "./data/user";
import "./user-card";

const users = usersData;
@customElement("user-select")
export class UserSelect extends LitElement {
  @property({ type: Object })
  user = {};

  @property({ type: Number, attribute: "index" })
  index = 0;

  connectedCallback() {
    super.connectedCallback();
    this.user = users[this.index];
  }

  _prevProfile() {
    this.index = this.index - 1;
    this.index = this.index < 0 ? 0 : this.index;
    this.user = users[this.index];
  }
  _nextProfile() {
    this.index = this.index + 1;
    this.user = users[this.index];
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
