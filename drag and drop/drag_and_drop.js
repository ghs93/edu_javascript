import { Sticker } from "./sticker.js";
import { makeDragable, stickerZIndex } from "./sticker_util.js";

let makeTitle = () => {
    let titleNum = 1;

    return () => `Sticker ${titleNum++}`;
};

let makePosition = () => {
    let top = 30;
    let left = 30;

    return () => {
        let position = {
            top: (top += 10),
            left: (left += 10),
        };

        return position;
    };
};

let stickerList = [];
let getTitle = makeTitle();
let getPosition = makePosition();

document.getElementById("btn-make-sticker").onclick = (event) => {
    let position = getPosition();

    let sticker = new Sticker({
        title: getTitle(),
        top: position.top,
        left: position.left,
        zIndex: stickerZIndex(),
    });

    makeDragable(sticker);

    document.body.appendChild(sticker.getElemSticker());
    stickerList.push(sticker);
};
