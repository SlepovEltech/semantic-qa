import axios from "axios";

export default axios.create({
  //baseURL: "https://semantic-qa-backend.herokuapp.com/",
  baseURL: "http://localhost:5000/",
  headers: {
    "Content-type": "application/json",
    "Access-Control-Allow-Methods" : "GET, POST, OPTIONS, PUT, DELETE"
  }
});
