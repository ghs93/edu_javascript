import { Content } from "./Content.js";

let getZIndex = () => {
    let index = 1;

    return () => index++;
};

let getContentNumber = () => {
    let number = 1;

    return () => number++;
};

export let stickerZIndex = getZIndex();
let contentNumber = getContentNumber();

export function makeDragable(sticker) {
    let $sticker = sticker.getElemSticker();
    let $createContent = sticker.getElemCreateContent();
    let $contentList = sticker.getElemContentList();

    $sticker.onmousedown = (event) => {
        onStickerDrag(event, $sticker);
    };

    $sticker.ondragstart = () => false;

    $createContent.onclick = (event) => {
        const content = new Content(contentNumber());
        $contentList.append(content.getElemContent());
    };
}

function onStickerDrag(event, sticker) {
    let shiftX = event.clientX - sticker.getBoundingClientRect().left;
    let shiftY = event.clientY - sticker.getBoundingClientRect().top;

    sticker.style.zIndex = stickerZIndex();

    moveAt(event.pageX, event.pageY);

    // 초기 이동을 고려한 좌표 (pageX, pageY)에서
    // 공을 이동합니다.
    function moveAt(pageX, pageY) {
        sticker.style.left = pageX - shiftX + "px";
        sticker.style.top = pageY - shiftY + "px";
    }

    // mousemove로 움직입니다.
    function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
    }

    // 드롭하고, 불필요한 핸들러를 제거합니다.
    function onMouseUp(event) {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
    }

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
}
