import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import "./user-card";

@customElement("user-select")
export class UserSelect extends LitElement {
  @property({ type: Number })
  index = 0;

  render() {
    return html` <user-card index=${this.index}></user-card> `;
  }
}
