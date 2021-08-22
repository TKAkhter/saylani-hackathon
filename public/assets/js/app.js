const urlParams = new URLSearchParams(window.location.search);
const email = urlParams.get("email");

if (email) {
  document.getElementById("email").value = email;
}

const onLogin = () => {
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
      localStorage.setItem("user", JSON.stringify({ email: email.value }));
      setTimeout(function () {
        location.replace(`index.html`);
      }, 5000);
    })
    .catch((err) => {
      console.log("err=>", err);
      $("#alert-response")
        .addClass("alert-danger")
        .append(err.message)
        .css("display", "block");
      $("button[type=submit]").addClass("disabled");
    });
  setTimeout(function () {
    $("#alert-response").css("display", "none").text("");
    $("button[type=submit]").removeClass("disabled");
  }, 5000);
};

const onSignup = () => {
  let as_restaurant = document.getElementById("as_restaurant");
  let name = document.getElementById("name");
  let email = document.getElementById("email");
  let country = document.getElementById("country");
  let city = document.getElementById("city");
  let password = document.getElementById("password");

  firebase
    .auth()
    .createUserWithEmailAndPassword(email.value, password.value)
    .then((res) => {
      let user = {
        as_restaurant: as_restaurant.checked,
        name: name.value,
        email: email.value,
        country: country.value,
        city: city.value,
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
        location.replace(`login.html?email=${res.user.email}`);
      }, 5000);
    })
    .catch((err) => {
      console.log(err.message);
      $("#alert-response")
        .addClass("alert-danger")
        .append(err.message)
        .css("display", "block");
      $("button[type=submit]").addClass("disabled");
    });

  setTimeout(function () {
    $("#alert-response").css("display", "none").text("");
    $("button[type=submit]").removeClass("disabled");
  }, 5000);
};

const getOrders = () => {
  getCurrentUser();
  $(".dataTables_empty").remove();
  firebase
    .database()
    .ref("orders")
    .on("value", (snapshot) => {
      if (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          let childData = childSnapshot.val();
          let data = "<tr>";
          for (const property in childData) {
            data = data + `<td>${childData[property]}</td>`;
          }
          data = data + "</tr>";
          $(".dataTableOrder").append(data);
        });
      }
    });
};

const orderCreate = () => {
  let name = document.getElementById("name");
  let price = document.getElementById("price");
  let categories = "";
  for (let option of document.getElementById("category").options) {
    if (option.selected) {
      categories = categories + option.value + ",";
    }
  }
  categories.slice(0, -1);
  let delivery_type = document.getElementById("delivery_type");

  // Add a new document in collection "orders"
  firebase
    .database()
    .ref("orders")
    .push({
      name: name.value,
      price: price.value,
      category: categories,
      delivery_type: delivery_type.value,
    })
    .then(() => {
      $("#alert-response")
        .removeClass("alert-danger")
        .addClass("alert-success")
        .append(`Order Created Successfully`)
        .css("display", "block");
      $("button[type=submit]").addClass("disabled");
      // See the UserRecord reference doc for the contents of userRecord.
      console.log("Order Created Successfully");
      setTimeout(function () {
        location.replace(`orders.html`);
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

const getDishes = () => {};

const dishCreate = () => {};

const getCurrentUser = () => {
  // function getCurrentUser() {
  let currentUrl = window.location.pathname;

  var detail = document.getElementById("detail");
  if (JSON.parse(localStorage.getItem("user"))) {
    var user = JSON.parse(localStorage.getItem("user"));
    detail.innerHTML = "Logged as " + user.email.split("@")[0];
  } else {
    location.replace("login.html");
  }
};

const onLogout = () => {
  localStorage.removeItem("user");
  location.replace("login.html");
};
// const onLogout = () => {
//   // function onLogout() {
//   var message = document.getElementById("message");
//   localStorage.removeItem("user");
//   message.innerHTML = "Good Bye.!";
//   // clear state
//   setTimeout(() => {
//     location.replace("login.html");
//   }, 2000);
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
