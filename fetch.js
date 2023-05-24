fetch("http://localhost:8080/users/login", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    username: "cousingreg",
    password: "mosteligiblebachelor",
  }),
})
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.log("ERROR", error));
