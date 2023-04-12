var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
var token = null;
var current_user;

const signUp = () => {
  event.preventDefault();
  console.log("signup");
  const username = document.querySelector("#username").value;
  const emailadd = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  var email = new AmazonCognitoIdentity.CognitoUserAttribute({
    Name: "email",
    Value: emailadd,
  });

  userPool.signUp(username, password, [email], null, function (err, result) {
    if (err) {
      alert(err);
    } else {
      location.href = "confirm.html#" + username;
    }
  });
};

const confirmCode = () => {
  event.preventDefault();
  const username = location.hash.substring(1);
  const cognitoUser = new AmazonCognitoIdentity.CognitoUser({
    Username: username,
    Pool: userPool,
  });
  const code = document.querySelector("#confirm").value;
  console.log("code =" + code);
  cognitoUser.confirmRegistration(code, true, function (err, results) {
    if (err) {
      alert(err);
    } else {
      console.log("confirmed");
      location.href = "signin.html";
    }
  });
};

const resendCode = () => {
  event.preventDefault();
  const username = location.hash.substring(1);
  const cognitoUser = new AmazonCognitoIdentity.CognitoUser({
    Username: username,
    Pool: userPool,
  });
  cognitoUser.resendConfirmationCode(function (err) {
    if (err) {
      alert(err);
    }
  });
};

const signIn = () => {
  event.preventDefault();
  const username = document.querySelector("#username").value;
  const password = document.querySelector("#password").value;

  let authenticationData = {
    Username: username,
    Password: password,
  };

  var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
    authenticationData
  );
  var userData = {
    Username: username,
    Pool: userPool,
  };

  var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
  cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: function () {
      console.log("login success");
      location.href = "booking.html";
    },
    onFailure: function (err) {
      alert(JSON.stringify(err));
    },
  });
};

const signOut = () => {
  console.log("sign out");
  var cognitoUser = userPool.getCurrentUser();
  if (cognitoUser) cognitoUser.signOut();
};

// const refreshLogin = () => {
//   const userBtn = document.querySelector(".user");
//   var cognitoUser = userPool.getCurrentUser();
//   if (cognitoUser != null) {
//     userBtn.innerHTML += cognitoUser.username;
// };


const checkLogin = () => {
  console.log("checking login..");
  const login = false;
  const userBtn = document.querySelector(".user");
  const leftBtn = document.querySelector(".left");
  const rightBtn = document.querySelector(".right");
  var cognitoUser = userPool.getCurrentUser();
  if (cognitoUser != null) {
    userBtn.innerHTML += "welcome "+ cognitoUser.username;
    return cognitoUser.username;
    rightBtn.classList.toggle("hide");
  } else {
    leftBtn.innerHTML = "Sign In";
    rightBtn.innerHTML = "Register";
  }
};

const navTosignUp = () => {
  console.log("sign up");
  location.href = "signup.html";
};

const navTosignIn = () => {
  console.log("sign in");
  var cognitoUser = userPool.getCurrentUser();
  if (cognitoUser !== null) {
    location.href = "booking.html";
  } else {
    location.href = "signin.html";
  }
};

const loadUsers = () => {
  getJWTToken(function (token) {
    apiClient
      .usersGet({}, null, { headers: { Authorization: token } })
      .then(function (result) {
        console.log(result);
        displayUsers(result.data);
      })
      .catch((err) => console.log(err));
  });
};

function refresh(){
  const userBtn = document.querySelector(".user");
  var cognitoUser = userPool.getCurrentUser();
  if (cognitoUser != null) {
    userBtn.innerHTML += cognitoUser.username;
  }
}


function getJWTToken(callback) {
  if (token == null) {
    var cognitoUser = userPool.getCurrentUser();
    if (cognitoUser != null) {
      cognitoUser.getSession(function (err, session) {
        if (err) {
          location.href = "index.html";
        }
        token = session.getIdToken().getJwtToken();
        console.log("---------------");
        console.log(token);
        console.log("---------------");
        callback(token);
      });
    }
  } else {
    callback(token);
  }
}
