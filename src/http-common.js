import axios from "axios";

export default axios.create({
  baseURL: "https://semantic-qa-backend.herokuapp.com/",
  headers: {
    "Content-type": "application/json"
  }
});
