const userdata = (e) => {
  e.preventDefault();

  let user = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
  };

  var Name = /^[a-zA-Z\-]+$/;
  var Email =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  var password = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

  console.log(Name.test(user.name));

  // name
  document.getElementById("name").addEventListener("keypress", () => {
    let name = document.getElementById("name").value;
    var Name = /^[a-zA-Z\-]+$/;
    if (!Name.test(name)) {
      document.getElementById("n-err").innerHTML = "not a valid name";
    } else {
      document.getElementById("n-err").innerHTML = " valid name";
      document.getElementById("n-err").style.color = "green";
    }
  });

  // email
  document.getElementById("email").addEventListener("keypress", () => {
    let email = document.getElementById("email").value;
    const Email =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!Email.test(email)) {
      document.getElementById("e-err").innerHTML = "not a valid email";
    } else {
      document.getElementById("e-err").innerHTML = " valid email";
      document.getElementById("e-err").style.color = "green";
    }
  });

  // password
  document.getElementById("password").addEventListener("keypress", () => {
    let Password = document.getElementById("password").value;
    var password = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    if (!password.test(Password)) {
      document.getElementById("p-err").innerHTML = "not a valid password";
    } else {
      document.getElementById("p-err").innerHTML = " valid password";
      document.getElementById("p-err").style.color = "green";
    }
  });

  if (Name.test(user.name) && Email.test(user.email) && password.test(user.password)){
    fetch(`http://localhost:3000/signupdata?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.length > 0) {
          if (data[0].email == user.email) {
            document.getElementById("e-err").innerHTML = "email already exist";
            setTimeout(() => {
              window.location.href="/pages/signin.html";
            }, 1000);
          }
        } else {
          try {
            fetch("http://localhost:3000/signupdata", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(user),
            });
            localStorage.setItem("loggedin", true);
          } catch (error) {
            alert(Error);
          }
        }
      });
  }
};

document.querySelector("#form").addEventListener("submit", userdata);


