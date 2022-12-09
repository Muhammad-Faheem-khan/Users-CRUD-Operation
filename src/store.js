import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex)
const baseUrl = "https://dummyjson.com";
const endpointUserList = "/Users"
const endpointAdd = "/users/add"

function fetchData(baseUrl, endPoint, method, userData) {
    const data = fetch(`${baseUrl}${endPoint}`, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
    })
        .then((res) => res.json())
        .then(data => {
            return data;
        });
    return data
}
export const store = new Vuex.Store({
    state: {
        usersList: [],
    },
    getters: {
        getAllUsers() {
            return store.state.usersList
        }
    },
    mutations: {
        userListUpdate(context, userList) {
            this.state.usersList = userList
        },
        deleteUser(state, id) {
            const index = this.state.usersList.users.findIndex((user) => {
                return user.id == id;
            })
            this.state.usersList.users.splice(index, 1)
        },
        addUser(state, userData) {
            this.state.usersList.users.unshift(userData)
        },
        updateUser(state, userData) {
            const index = this.state.usersList.users.findIndex(user => {
                return user.id == userData.id
            })
            Vue.set(this.state.usersList.users, index, userData)
        }
    },
    actions: {
        async userListUpdate(context) {
            const data = await fetchData(baseUrl, endpointUserList, 'GET')
            context.commit('userListUpdate', data)
        },
        async deleteUser(context, id) {
            const endpointDelete = `/users/${id}`
            const data = await fetchData(baseUrl, endpointDelete, 'DELETE')
            context.commit('deleteUser', id, data)
        },
        async addUser(context, userData) {
            const data = await fetchData(baseUrl, endpointAdd, 'POST', userData)
            context.commit('addUser', userData, data)
        },
        async updateUser(context, userData) {
            const endpointUpdate = `/users/${userData.id}`
            const data = await fetchData(baseUrl, endpointUpdate, 'PUT', userData)
            context.commit('updateUser', userData, data)
        },
    }
})
