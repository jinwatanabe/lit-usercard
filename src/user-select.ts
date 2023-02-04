import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import "./user-card";

@customElement("user-select")
export class UserSelect extends LitElement {
  render() {
    return html`
      <user-card
        user='{
          "username": "watanabe",
          "age": "25",
          "prefecture": "埼玉県",
          "topImage": "https://source.unsplash.com/random?human",
          "subImages": "https://source.unsplash.com/random?fruit, https://source.unsplash.com/random?sweets, https://source.unsplash.com/random?cat, https://source.unsplash.com/random?school",
          "selfIntroduction": "こんにちは。じんです。よろしくお願いします。こんにちはよろしくおねがいします。こんにちはああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああ"
        }'
      ></user-card>
    `;
  }
}
