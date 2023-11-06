import axios from "axios"

const Api = axios.create({
    baseURL: "https://mocki.io"
})

export default Api;