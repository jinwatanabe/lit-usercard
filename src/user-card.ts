import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import catImg from "./assets/images/cat.jpg";

type User = {
  username: string;
  email: string;
  phone: string;
  website: string;
  image: string;
};

@customElement("user-card")
export class UserCard extends LitElement {
  @property()
  users: User[] = [];

  @property()
  loading = true;

  connectedCallback() {
    super.connectedCallback();
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then(async (users) => {
        users.forEach((user: User) => {
          this.users.push({
            username: user.username,
            email: user.email,
            phone: user.phone,
            website: user.website,
            image: this.getProfileImage(),
          });
        });
        this.loading = false;
      });
  }

  getProfileImage(): string {
    return "https://source.unsplash.com/random?human";
  }

  userCards() {
    return html`
      <div class="card">
        <img
          src=${this.users[0].image}
          class="card-img-top"
          width="200"
          height="230"
        />
        <div class="subImage">
          <img src="${this.users[0].image}" class="subImg" />
          <img src="${catImg}" class="subImg" />
          <img src="${catImg}" class="subImg" />
          <img src="${catImg}" class="subImg" />
          <img src="${catImg}" class="subImg" />
        </div>
        <div class="profile">
          <div>name: ${this.users[0].username}</div>
          <div>email: ${this.users[0].email}</div>
          <div>phone: ${this.users[0].phone}</div>
          <div>website: ${this.users[0].website}</div>
        </div>
      </div>
    `;
  }

  render() {
    if (this.loading) {
      return html` <div class="circle"></div> `;
    } else {
      return this.userCards();
    }
  }

  static styles = css`
    .card {
      width: 200px;
      height: 300px;
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
      height: 150px;
    }
    .subImage {
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin-top: 8px;
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
