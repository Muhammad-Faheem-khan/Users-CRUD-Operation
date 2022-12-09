<template>
  <div class="login-page">
    <h2 class="form-heading-main">Login Form</h2>
    <div class="loginform">
      <div class="">
        <div class="input-field">
          <label for="email">User ID*</label>
          <input
            v-model="login.userId"
            type="text"
            placeholder="Please enter your password"
          />
        </div>
        <div class="input-field">
          <label for="password">Password*</label> <br />
          <input
            v-model="login.password"
            type="password"
            placeholder="Please enter your password"
          />
        </div>

        <button class="login-btn" type="button" @click="getUserData(login)">
          LOGIN
        </button>
        <p class="register-first-text">
          New member? <a href="#" class="link-text">Register</a> here.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginPage",
  data() {
    return {
      login: {
        userId: "",
        password: "",
      },
    };
  },

  methods: {
    // method to check user Credentials and fetch user data from server 
    getUserData(login) {
      if (login.userId != "" && login.password != "") {
        fetch("https://dummyjson.com/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: login.userId,
            password: login.password,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.token) {
              localStorage.setItem("currentUser", JSON.stringify(data));
              sessionStorage.setItem("token", data.token);
              this.$router.push("/home");
            }
          });
      }
    },
  },
};
</script>

<style scoped>
.login-page {
  background-color: white;
  padding: 1rem;
  border: 1px solid grey;
  border-radius: 1rem;
  -webkit-box-shadow: 0 0 15px rgb(141, 132, 132);
  box-shadow: 0 0 15px rgb(141, 132, 132);
  width: 35%;
  margin: 5rem auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.form-heading-main {
  font-size: 1.5rem;
  text-align: center;
}
.register-first-text {
  font-size: 0.75rem;
  color: rgb(126, 122, 122);
}

.input-field label {
  font-size: 0.85rem;
  margin-bottom: 0.5rem;
}
.input-field input {
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.3rem;
  border: 1px solid #d1d2d4e3;
}
.input-field {
  margin-bottom: 1rem;
}
.input-field input:focus {
  outline: none;
}
.loginform {
  background-color: white;
  width: 80%;
}
.login-btn {
  border: none;
  border-radius: 0.3rem;
  background-color: rgb(240, 118, 18);
  color: white;
  padding: 0.5rem;
  font-size: 1rem;
}
.login-btn:hover {
  background-color: rgb(217, 106, 15);
  color: white;
}
.link-text {
  color: rgb(8, 135, 214);
  font-size: 0.8rem;
  text-decoration: none;
}
@media screen and (max-width:768px){
  .login-page{
    width: 70%;
  }
}
</style>