<template>
  <div class="modal-window">
    <button class="close-btn" @click="closeModal">&#10006;</button>
    <form autocomplete="off" class="popup-form">
      <div class="input-field">
        <label for="fname">First Name</label>
        <input
        v-model="newUser.firstName"
          type="text"
          required
          id="fname"
          placeholder="First Name"
        />
      </div>

      <div class="input-field">
        <label for="lname">Last Name</label>
        <input 
        v-model="newUser.lastName"
          type="text"
          required
          id="lname"
          placeholder="Last Name"
        />
      </div>

      <div class="input-field">
        <label for="gender">Gender</label>
        <input
        v-model="newUser.gender"
          type="text"
          required
          id="gender"
          placeholder="Gender"
        />
      </div>
      <div class="input-field">
        <label for="email">Email</label>
        <input
        v-model="newUser.email"
          type="email"
          required
          id="email"
          placeholder="Email"
        />
      </div>

      <div class="button-container">
        <button type="button" class="update-btn button" @click="saveData">
          Update
        </button>
        <button type="button" class="save-btn button" @click="saveNewUser">
          Add User
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { store } from "@/store";
export default {
  name: "PopUpBox",
  data() {
    return {
      newUser: {
        firstName: "",
        lastName: "",
        gender: "",
        email: "",
      },
    };
  },
  methods: {
    closeModal() {
      this.$emit("closeBtn", false);
    },
    saveData() {
      if(this.newUser.firstName !='' && this.newUser.email != ""){
      store.dispatch("updateUser", this.newUser);
      this.closeModal();
      }
    },
    saveNewUser() {
      if(this.newUser.firstName !='' && this.newUser.email != ""){
      store.dispatch("addUser", this.newUser);
      this.closeModal();
      }
    },
    setData: function (value) {
      this.newUser = {...value};
    },
    setNewUser: function (value) {
      this.newUser = value;
    },
  },
  created: function () {
    this.$parent.$on("updateData", this.setData);
    this.$parent.$on("addUser", this.setNewUser);
  },
};
</script>

<style scoped>
.modal-window {
  width: 60%;
  padding: 20px 10px;
  border: 1px solid black;
  background-color: #fff;
  position: fixed;
  top: 15%;
  left: 20%;
  display: flex;
  flex-direction: column;
  z-index: 1000;
  border: 1px solid whitesmoke;
  border-radius: 10px;
}
.input-field {
  display: flex;
  justify-content: space-between;
  width: 90%;
  margin: 1rem auto;
  padding: 0.75rem 0;
}
.input-field input {
  width: 70%;
  padding: 0.35rem;
}
.input-field input:focus {
  outline: none;
}
.button-container {
  display: flex;
  justify-content: center;
}
.button {
  padding: 0.4rem 0.5rem;
  margin-right: 0.5rem;
  font-size: 1rem;
  border: none;
  border-radius: 0.4rem;
}
.save-btn {
  background-color: lightgreen;
}
.update-btn {
  background-color: lightgray;
}
.close-btn {
  position: absolute;
  right: 10px;
  top: 10px;
  padding: 0.2rem;
  font-size: 0.8rem;
  font-weight: 600;
  color: #fff;
  background-color: red;
  border: none;
  border-radius: 0.3rem;
}
</style>