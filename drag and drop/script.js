// script.js

function stickerMouseDown(e) {
    // Your code for onmousedown event of the div
    console.log("Sticker mousedown");
}

function buttonClick(e) {
    // Your code for onclick event of the button
    e.stopPropagation(); // Prevent the click event from propagating to the parent div
    e.preventDefault();
    console.log("Button clicked");
}
