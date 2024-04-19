import axios, { Axios } from "axios";

const Client: Axios = axios.create({ baseURL: process.env.NEXT_PUBLIC_BACKEND_URL })
// Client.defaults.headers.
export default Client