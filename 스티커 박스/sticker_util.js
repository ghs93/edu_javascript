import { Content } from "./Content.js";

// zIndex 관리를 위한 클로저
let getZIndex = () => {
    let index = 1;

    return () => index++;
};
export let stickerZIndex = getZIndex();

// ContentNumber 관리를 위한 클로저
let getContentNumber = () => {
    let number = 1;

    return () => number++;
};
let contentNumber = getContentNumber();

// Sticker drag 하기
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
        const $content = content.getElemContent();
        $content.onmousedown = (event) => {
            onContentDrag(event, $content);
        };

        $contentList.append($content);
    };
}

// Sticker drag시 좌표 계산
function onStickerDrag(event, sticker) {
    let shiftX = event.clientX - sticker.getBoundingClientRect().left;
    let shiftY = event.clientY - sticker.getBoundingClientRect().top;

    sticker.style.zIndex = stickerZIndex();

    moveAt(event.pageX, event.pageY);

    function moveAt(pageX, pageY) {
        sticker.style.left = pageX - shiftX + "px";
        sticker.style.top = pageY - shiftY + "px";
    }

    function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
    }

    function onMouseUp(event) {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
    }

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
}

// Sticker 내부의 Content Drag 하기
function onContentDrag(event, content) {
    event.preventDefault();
    event.stopPropagation();

    let shiftX = event.clientX;
    let shiftY = event.clientY;

    // 이동 실패시 다시 돌아가기 위한 위치
    let originX = event.pageX - shiftX + "px";
    let originY = event.pageY - shiftY + "px";

    content.parentElement.parentElement.style.zIndex = stickerZIndex();
    content.style.zIndex = stickerZIndex();

    moveAt(event.pageX, event.pageY);
    function moveAt(pageX, pageY) {
        content.style.left = pageX - shiftX + "px";
        content.style.top = pageY - shiftY + "px";
    }

    // mousemove로 움직입니다.
    function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
    }

    // 드롭하고, 불필요한 핸들러를 제거합니다.
    function onMouseUp(event) {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);

        DropContent(event, content, originX, originY);
    }

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
}

// 이동한 Content Drop 하기
function DropContent(event, content, originX, originY) {
    let target = findLocation(event);

    // drag한 곳이 sticker 영역이면
    if (target) {
        let contentArea = target.querySelector(".content-list");
        let contentList = Array.from(target.querySelectorAll(".content"));

        content.style.top = 0;
        content.style.left = 0;

        if (contentList.length <= 0) {
            contentArea.appendChild(content);
        } else {
            let nextContent = contentList.find(
                (targetContent) => event.clientY <= targetContent.getBoundingClientRect().top
            );

            if (nextContent) {
                contentArea.insertBefore(content, nextContent);
            } else {
                contentArea.appendChild(content);
            }
        }
    } else {
        content.style.top = originY;
        content.style.left = originX;
    }
}

// content를 이동시킨 곳이 sticker위면 해당 sticker 반환
function findLocation(mouse) {
    let stickers = Array.from(document.querySelectorAll(".sticker")).sort(
        (a, b) => b.style.zIndex - a.style.zIndex
    );

    return stickers.find((sticker) => {
        let stickerRect = sticker.getBoundingClientRect();

        let innerX = mouse.clientX >= stickerRect.left && mouse.clientX <= stickerRect.right;
        let innerY = mouse.clientY >= stickerRect.top && mouse.clientY <= stickerRect.bottom;

        if (innerX && innerY) {
            return sticker;
        }
    });
}
