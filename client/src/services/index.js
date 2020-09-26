import axios from "axios"

const api = axios.create({
  baseURL: 'http://localhost:3000/api'
})

export const addGuild = payload => api.post(`/guild`, payload);
export const searchGuild = payload => api.post(`/guilds`, payload);
export const insertUser = payload => api.post(`/user`, payload);


const apis = {
  addGuild,
  searchGuild,
  insertUser
}

export default apis