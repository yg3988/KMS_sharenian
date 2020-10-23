import axios from 'axios';

const api = axios.create({
	baseURL: 'http://localhost:3000/api',
});

export const getGuildInDB = (payload) => api.post(`/getguildbyname`, payload);
export const getGuilds = (payload) => api.post(`/searchguild`, payload);
export const getGuildById = (payload) => api.post(`/getguildbyid`, payload);
export const getGuildInfo = (payload) => api.post(`/getguildinfo`, payload);
export const getGuildMembers = (payload) =>
	api.post(`/getguildmembers`, payload);
export const getMembersOfSharenian = (payload) =>
	api.post(`/getmembersofsharenian`, payload);

const apis = {
	getGuildInDB,
	getGuilds,
	getGuildById,
	getGuildInfo,
	getGuildMembers,
	getMembersOfSharenian,
};

export default apis;
