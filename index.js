var page1 = document.getElementById("page1")
var page2 = document.getElementById("page2")

var socket = io.connect();
var uploader = new SocketIOFileUpload(socket);
uploader.listenOnSubmit(document.getElementById("upload_button"), document.getElementById("file_input"));

$(document).ready(logoFade)

function logoFade() {

    $("input").fadeIn(100000000000)
    $("").fadeIn()

}

document.getElementById("downloadB").addEventListener("click", downloadFile)

document.getElementById("uploadB").addEventListener("click", uploadFile)

function downloadFile() {

    page2.style.display="none"
    page1.style.display="block"

}

function uploadFile() {

    page1.style.display="none"
    page2.style.display="block"

}