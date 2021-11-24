const url = "http://localhost:3002/login";

let token = "";

const login = () => {
  console.log("entro?");
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const alert = document.getElementById("alert");

      if (!data.ok) {
        // alert(data.err.message);
        alert.innerHTML = data.err.message;
      } else {
        alert.innerHTML = data.token;
      }
      token = data.token;
    });
};

document.getElementById("login").addEventListener("click", login);

const urlUsers = "http://localhost:3002/user";

const getUsers = () => {
  const headers = new Headers({
    "Content-Type": "application/json",
    "X-Access-Token": token,
  });
  const settings = {
    method: "GET",
    headers: headers,
  };
  fetch(urlUsers, settings)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
};

document.getElementById("getUsers").addEventListener("click", getUsers);
