import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { User } from "./types/user";
import catImage from "./assets/images/cat.jpg";
import { usersData } from "./data/user";

@customElement("user-card")
export class UserCard extends LitElement {
  @property()
  user: User = {} as User;

  @property({ type: String })
  topImage = "";

  @property({ type: Boolean })
  loading = true;

  @property({ type: Number, attribute: "index" })
  index = 0;

  _prevProfile() {
    this.index = this.index - 1;
    this.index = this.index < 0 ? 0 : this.index;
    this.user = usersData[this.index];
    this.topImage = this.user.topImage;
  }
  _nextProfile() {
    this.index = this.index + 1;
    this.user = usersData[this.index];
    this.topImage = this.user.topImage;
  }

  connectedCallback() {
    super.connectedCallback();
    this.user = usersData[this.index];
    this.topImage = this.user.topImage;
    this.loading = false;
  }

  private _imageClick(e: Event) {
    this.topImage = catImage;
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

  userCards() {
    return html`
      <div class="card">
        <img src=${this.topImage} class="card-img-top" />
        <div class="subImage">
          <img
            src="${this.user.topImage}"
            class="subImg"
            @click=${this._imageClick}
          />
          ${this.user?.subImages.map(
            (subImage) => html`<img
              src="${subImage}"
              class="subImg"
              @click=${this._imageClick}
            />`
          )}
        </div>
        <div class="profile">
          <div
            style="color: red; font-size: 8px; padding-top: 5px; line-height: 0px;"
          >
            ${this.user?.age}歳 ${this.user?.prefecture}
          </div>
          <div>
            <div style="font-size: 10px; padding-top: 5px; font-weight: bold;">
              自己紹介
            </div>
            <div style="font-size: 10px; line-height: 12px; overflow: hidden;">
              ${this.user.selfIntroduction.length > 100
                ? this.user.selfIntroduction.slice(0, 100) + "..."
                : this.user.selfIntroduction}
            </div>
          </div>
        </div>
      </div>
      ${this.navigator()}
    `;
  }

  render() {
    if (this.loading) {
      return html` <div class="circle"></div> `;
    } else if (!this.user?.username) {
      return html`
        <h1>ユーザーがいません</h1>
        ${this.navigator()}
      `;
    } else {
      return this.userCards();
    }
  }

  static styles = css`
    .card {
      width: 200px;
      height: 310px;
      background-color: #f4a460;
      border-radius: 10px;
      box-shadow: 5px 15px 15px -5px #777777;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .card-img-top {
      border-radius: 10px 10px 0 0;
      object-fit: cover;
      height: 158px;
      width: 200px;
    }
    .subImage {
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin-top: 8px;
      cursor: pointer;
    }
    .subImg {
      width: 30px;
      height: 30px;
      border-radius: 99%;
      object-fit: cover;
    }
    .profile {
      margin: 5px;
      height: 150px;
    }
    .btn {
      width: 80px;
      height: 30px;
      border-radius: 10px;
      background-color: gray;
      color: #fff;
      font-size: 10px;
      font-weight: bold;
      border: none;
      cursor: pointer;
    }
    .btn:hover {
      background-color: #fff;
      color: gray;
    }
    .circle {
      width: 100px;
      height: 100px;
      border-radius: 150px;
      border: 15px solid #fff;
      border-top-color: rgba(0, 0, 0, 0.3);
      box-sizing: border-box;
      position: absolute;
      top: 20%;
      left: 35%;
      animation: circle 1s linear infinite;
      -webkit-animation: circle 1s linear infinite;
    }
    @keyframes circle {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
    @-webkit-keyframes circle {
      0% {
        -webkit-transform: rotate(0deg);
      }
      100% {
        -webkit-transform: rotate(360deg);
      }
    }
  `;
}
