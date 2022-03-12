//console.log("Hello World!");

//Add even listeners here
window.onload = function () {
  var button = document.getElementById("btnFetchUsers");
  button.addEventListener("click", fetchUsers);
};

var fetchUsers = function () {
  console.log("Hello Users!");
  window
    .fetch("http://localhost:8080/users/")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      displayUsers(data);
    });
};

var displayUsers = function (users) {
  var placeholder = document.getElementById("tableDataPlaceholder");
  placeholder.parentNode.removeChild(placeholder);
  
  var table = document.getElementById("tableUsers");

  users.forEach((user) => {
    var row = table.insertRow(-1);
    var userName = row.insertCell(0);
    var firstName = row.insertCell(1);
    var lastName = row.insertCell(2);
    var phone = row.insertCell(3);
    var email = row.insertCell(4);
    var admin = row.insertCell(5);
    var reviewer = row.insertCell(6);

    userName.innerHTML = user.userName;
    firstName.innerHTML = user.firstName;
    lastName.innerHTML = user.lastName;
    phone.innerHTML = user.phone;
    email.innerHTML = user.email;
    admin.innerHTML = user.admin;
    reviewer.innerHTML = user.reviewer;
  });
};