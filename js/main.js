var siteName = document.querySelector("#siteName");
var url = document.querySelector("#Website");
var submit = document.querySelector(".btn-submit");
var update = document.querySelector(".btn-update");
var closeBox = document.querySelector(".close");
var lightBox = document.querySelector(".light-box-container")
var bookmarkList = [];
if (localStorage.getItem("book") != null) {
    bookmarkList = JSON.parse(localStorage.getItem("book"));
    displayBooks(bookmarkList);
} else {
    bookmarkList = [];
}

function addBookmark() {
    if (validateData() == true) {
        var bookmark = {
            siteName: siteName.value,
            website: url.value,
        };
        bookmarkList.push(bookmark);
        console.log(bookmarkList);
        displayBooks(bookmarkList);
        localStorage.setItem("book", JSON.stringify(bookmarkList))
        clear();

    } else {
        submit.addEventListener("click", function (e) {
            lightBox.classList.replace("d-none", "d-flex");
            closeBox.addEventListener("click", close)

            lightBox.addEventListener("click", close)


        })
    }

}

submit.addEventListener("click", function (e) {
    addBookmark();

});


function displayBooks(list) {
    cartona = "";
    for (let i = 0; i < list.length; i++) {
        cartona += `<tr>
        <td>${i + 1}</td>
        <td>${list[i].siteName}</td>
        <td><button class="btn btn-success btn-sm"  onclick="visit('${list[i].website}')"> 
            <i class="fa-solid fa-eye pe-2"></i>Visit</button></td>
        <td><i class="fa-solid fa-trash-can text-danger delete" onclick="deleteBook(${i})"></i></td>
        <td><i class="fa-solid fa-pen-to-square me-3 text-success cursor-pointer" onclick="updateBook(${i})"></i></td>
      </tr>`;
    }
    document.querySelector(".tbody").innerHTML = cartona;
}

function visit(url) {
    window.open(url);
}

function clear() {
    siteName.value = '';
    url.value = '';

}
function deleteBook(index) {
    console.log("delete");
    bookmarkList.splice(index, 1);
    localStorage.setItem("book", JSON.stringify(bookmarkList));
    displayBooks(bookmarkList);
}
var updatedIndex;
function updateBook(index) {
    siteName.value = bookmarkList[index].siteName;
    url.value = bookmarkList[index].website;
    update.classList.remove("d-none");
    submit.classList.add("d-none")
    updatedIndex = index;
}
function modifyCell() {
    var modified = {
        siteName: siteName.value,
        website: url.value,
    };
    bookmarkList.splice(updatedIndex, 1, modified);
    displayBooks(bookmarkList);
    localStorage.setItem("book", JSON.stringify(bookmarkList));
}
update.addEventListener("click", function (e) {
    modifyCell();
    update.classList.add("d-none");
    submit.classList.remove("d-none")
    clear();
})

var regexName = /[A-Za-z]{3,}/;
var regexURL = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;

function validateData() {
    if (regexName.test(siteName.value) && regexURL.test(url.value)) {
        return true;
    } else {
        return false
    }

}
function close() {
    lightBox.classList.replace("d-flex", "d-none");
}
