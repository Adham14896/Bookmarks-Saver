var bookmarkNameInput = document.getElementById("bookmarkName");
var websiteUrl = document.getElementById("siteUrl");
var addBtn = document.getElementById("addbtn");
var bookmarkContainer = document.getElementById("bookmarkContainer");
var inputAlert = document.getElementById("inputAlert");
var formAlert = document.getElementById("formAlert");
var bookmarks;

if (localStorage.getItem("bookmarks")) {
  bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  displayBookmarks(bookmarks);
} else {
  bookmarks = [];
}

function addBookmark() {
  var bookmark = {
    name: bookmarkNameInput.value,
    url: websiteUrl.value,
  };

  if (
    bookmarkNameInput.classList.contains("is-valid") &&
    websiteUrl.classList.contains("is-valid")
  ) {
    bookmarks.push(bookmark);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    console.log(bookmarks);
    displayBookmarks(bookmarks);
    clearInput();
  } else {
    formAlert.classList.remove("d-none");
    bookmarkNameInput.classList.add("is-invalid");
    bookmarkNameInput.nextElementSibling.classList.remove("d-none");
    websiteUrl.nextElementSibling.classList.remove("d-none");
  }
}

function displayBookmarks(arr) {
  var newBookmark = ``;

  for (var i = 0; i < arr.length; i++) {
    newBookmark += `<tr>
    <th scope="row">${[i + 1]}</th>
    <td>${arr[i].name}</td>
    <td>
    <a class="btn btn-warning p-2 text-white" href="${
      arr[i].url
    }" target="_blank">Visit</a>
    </td>
    <td>
    <button class="btn btn-danger text-white" onclick="deleteBookmark(${i})">Delete</button>
    </td>
  </tr>`;
  }

  bookmarkContainer.innerHTML = newBookmark;
}

function deleteBookmark(index) {
  bookmarks.splice(index, 1);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  displayBookmarks(bookmarks);
}

function clearInput() {
  bookmarkNameInput.value = "";
  websiteUrl.value = "";
}

function checkInput(element) {
  var regex = {
    bookmarkName: /^[a-zA-Z0-9]{4,12}$/,
    siteUrl: /^(https?:\/\/)?(www\.)?[\w-]+(\.[\w-]+)*\.(com|net|org)$/,
  };

  if (regex[element.id].test(element.value)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    element.nextElementSibling.classList.add("d-none");
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
  }
}
