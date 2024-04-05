import axios from "axios";

const Client = axios.create({ baseURL: process.env.NEXT_PUBLIC_BACKEND_URL })
// Client.defaults.headers.
export default Client