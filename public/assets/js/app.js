const urlParams = new URLSearchParams(window.location.search);
const email = urlParams.get("email");

if (email) {
  document.getElementById("email").value = email;
}

let onLogin = () => {
  let email = document.getElementById("email");
  let password = document.getElementById("password");

  firebase
    .auth()
    .signInWithEmailAndPassword(email.value, password.value)
    .then((res) => {
      firebase
        .database()
        .ref(`users/${res.user.uid}`)
        .once("value", (data) => {
          console.log(data.val());
        });
      $("#alert-response")
        .removeClass("alert-danger")
        .addClass("alert-success")
        .append(`Login Successfully: ${res.user.email}`)
        .css("display", "block");
      $("button[type=submit]").addClass("disabled");
      // See the UserRecord reference doc for the contents of userRecord.
      console.log("Login Successfully:", res.user.email);
      setTimeout(function () {
        location.href = `index.html`;
      }, 5000);
    })
    .catch((err) => {
      console.log("err=>", err);
      $("#alert-response")
        .addClass("alert-danger")
        .append(`Successfully created new user: ${err.message}`)
        .css("display", "block");
      $("button[type=submit]").addClass("disabled");
    });
  setTimeout(function () {
    $("#alert-response").css("display", "none").text("");
    $("button[type=submit]").removeClass("disabled");
  }, 5000);
};
const onSignup = () => {
  let email = document.getElementById("email");
  let password = document.getElementById("password");

  firebase
    .auth()
    .createUserWithEmailAndPassword(email.value, password.value)
    .then((res) => {
      let user = {
        email: email.value,
        password: password.value,
      };

      firebase.database().ref(`users/${res.user.uid}`).set(user);
      $("#alert-response")
        .removeClass("alert-danger")
        .addClass("alert-success")
        .append(`Successfully created new user: ${res.user.email}`)
        .css("display", "block");
      $("button[type=submit]").addClass("disabled");
      // See the UserRecord reference doc for the contents of userRecord.
      console.log("Successfully created new user:", res.user.email);
      setTimeout(function () {
        location.href = `login.html?email=${res.user.email}`;
      }, 5000);
    })
    .catch((err) => {
      console.log(`Successfully created new user: ${err.message}`);
      $("#alert-response")
        .addClass("alert-danger")
        .append(`Successfully created new user: ${err.message}`)
        .css("display", "block");
      $("button[type=submit]").addClass("disabled");
    });

  setTimeout(function () {
    $("#alert-response").css("display", "none").text("");
    $("button[type=submit]").removeClass("disabled");
  }, 5000);
};

const orderCreate = () => {
  let name = document.getElementById("name");
  let price = document.getElementById("price");
  let category = document.getElementById("category");
  let delivery_type = document.getElementById("delivery_type");

  // Add a new document in collection "cities"
  firebase
    .database()
    .ref("orders/" + userId)
    .set({
      name: name.value,
      price: price.value,
      category: category.value,
      delivery_type: delivery_type.value,
    })
    .then(() => {
      console.log("Document successfully written!");
      $("#alert-response")
        .removeClass("alert-danger")
        .addClass("alert-success")
        .append(`Order Created Successfully`)
        .css("display", "block");
      $("button[type=submit]").addClass("disabled");
      // See the UserRecord reference doc for the contents of userRecord.
      console.log("Order Created Successfully");
      setTimeout(function () {
        location.href = `orders.html`;
      }, 5000);
    })
    .catch((err) => {
      console.log(`Error: ${err.message}`);
      $("#alert-response")
        .addClass("alert-danger")
        .append(`Error: ${err.message}`)
        .css("display", "block");
      $("button[type=submit]").addClass("disabled");
    });
  setTimeout(function () {
    $("#alert-response").css("display", "none").text("");
    $("button[type=submit]").removeClass("disabled");
  }, 5000);
};

// const onLogin = () => {
//   // get data from MongoDB
//   // get input values
//   const obj = {
//     username: $("#username").val(),
//     email: $("#email").val(),
//   };
//   // Make a request for a user with a given ID
//   // post(url,body,headers)
//   axios
//     .post(`${BASE_URL}/login`, obj)
//     .then((response) => {
//       const userData = {
//         username: response.data.username,
//         email: response.data.email,
//       };
//       console.log(response);
//       if (userData) {
//         $("#alert-response")
//           .removeClass("alert-danger")
//           .addClass("alert-success")
//           .append("Login Successful")
//           .css("display", "block");
//         localStorage.setItem("user", JSON.stringify(userData));
//         setTimeout(function () {
//           location.href = "index.html";
//         }, 5000);
//       } else {
//         $("#alert-response")
//           .removeClass("alert-success")
//           .addClass("alert-danger")
//           .append(response.data)
//           .css("display", "block");
//       }
//     })
//     .catch((error) => {
//       $("#alert-response")
//         .addClass("alert-danger")
//         .append(error)
//         .css("display", "block");
//       console.log(error);
//     });
//   setTimeout(function () {
//     $("#alert-response").css("display", "none").text("");
//   }, 5000);
// };

// const onLogout = () => {
//   // function onLogout() {
//   var message = document.getElementById("message");
//   localStorage.removeItem("user");
//   message.innerHTML = "Good Bye.!";
//   // clear state
//   setTimeout(() => {
//     location.href = "login.html";
//   }, 2000);
// };

// const getCurrentUser = () => {
//   // function getCurrentUser() {
//   var detail = document.getElementById("detail");
//   if (JSON.parse(localStorage.getItem("user"))) {
//     var user = JSON.parse(localStorage.getItem("user"));
//     detail.innerHTML = "Loggedin as " + user.email.split("@")[0];
//   } else {
//     location.href = "login.html";
//   }
// };

// const createPost = () => {
//   const obj = {
//     title: "JS",
//     description: "JS stand for javascript",
//   };
//   // Make a request for a user with a given ID
//   // post(url,body,headers)
//   axios
//     .post(`${BASE_URL}/create`, obj)
//     .then((response) => {
//       console.log(response);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };

// const getPost = () => {
//   // post(url, headers)
//   axios
//     .get(`${BASE_URL}/posts`)
//     .then((response) => {
//       console.log(response.data);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };

// getPost();
