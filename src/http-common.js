import axios from "axios";

var base_url = "http://localhost";
if (typeof window !== "undefined") {
  base_url = window.location.protocol + "//" + window.location.hostname;
}
const baseURL = base_url + ":8080/api";
export default axios.create({
  baseURL: baseURL,
  headers: {
    "Content-type": "application/json",
  },
});