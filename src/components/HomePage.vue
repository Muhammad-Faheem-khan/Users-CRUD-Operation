<template>
  <div>
    <h3 class="heading">All Users Data</h3>
    <ul class="container" :class="{ blur: showModel }">
      <div class="addbtn-container">
        <button class="addUser-btn button" @click="addNewUser">
          + Add User
        </button>
      </div>
      <li class="users-data" v-for="user in userList.users" :key="user.id">
        <div class="user-info" >
          <p class="data">{{ user.firstName }} {{ user.lastName }}</p>
          <p class="data">{{ user.gender }}</p>
          <p class="data">{{ user.email }}</p>
        </div>
        <div>
          <button @click="editUser(user)" class="button edit-btn">Edit</button>
          <button @click="deleteTask(user.id)" class="button delete-btn">
            Delete
          </button>
        </div>
      </li>
    </ul>
    <PopUpBox @closeBtn="showModel = $event" v-show="showModel" />
  </div>
</template>

<script>
import { store } from "@/store";
import PopUpBox from "./PopUpBox";
export default {
  name: "HomePage",
  data() {
    return {
      showModel: false,
    };
  },
  components: {
    PopUpBox,
  },
  computed: {
    // it gets the userlist from store using getter 
    userList() {
      return store.getters.getAllUsers;
    },
  },
  methods: {
    editUser(userData) {
      this.showModel = true;
      this.$emit("updateData", userData);
    },
    addNewUser() {
      this.showModel = true;
      this.$emit("addUser", {firstName:'', lastName:'', email:'', gender:''});
    },
    deleteTask(id) {
      store.dispatch("deleteUser", id);
    },
  },
  created() {
    store.dispatch("userListUpdate");
  },
};
</script>

<style scoped>
.container {
  border: 2px solid black;
  border-radius: 0.5rem;
  padding-left: 0;
  width: 60%;
  margin: 0 auto;
  position: relative;
}
.heading {
  font-size: 1.5rem;
  text-align: center;
}
.users-data {
  list-style-type: none;
  padding: 1rem;
  margin-top: 0.5rem;
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}
.users-data:hover {
  background-color: #f2f6fc;
  color: #18233b;
}
.blur {
  filter: blur(2px);
  z-index: 100;
}
.addUser-btn {
  background-color: lightskyblue;
  margin: 1rem;
}
.addbtn-container {
  display: flex;
  justify-content: flex-end;
}
.user-info {
  display: flex;
  flex-direction: column;
  text-align: center;
}
.data {
  font-size: 1rem;
  margin-right: 2rem;
  margin-bottom: 0.2rem;
  margin-top: 0.2rem;
}
.button {
  padding: 0.2rem 0.5rem;
  margin-right: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 0.4rem;
  margin-top: 1rem;
}
.edit-btn {
  background-color: greenyellow;
}
.delete-btn {
  background-color: red;
}
@media screen and (max-width:768px){
  .container{
    width: 80%;
  }
}
@media screen and (max-width:530px){
  .users-data{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>