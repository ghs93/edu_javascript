export class Sticker {
    $btnCreateContent;
    $btnDeleteSticker;
    $divContentList;

    constructor({ title, top, left, zIndex }) {
        this.title = title;
        this.$el = this.createSticker({
            top,
            left,
            zIndex,
        });
    }

    createSticker({ top, left, zIndex }) {
        const $sticker = document.createElement("div");
        $sticker.className = "sticker";
        $sticker.style.top = top + "px";
        $sticker.style.left = left + "px";
        $sticker.style.zIndex = zIndex;
        $sticker.style.backgroundColor = this.getRandomColor();

        const $title = document.createElement("h3");
        $title.innerText = this.title;

        $sticker.append($title);

        const $addContentButton = document.createElement("button");
        $addContentButton.innerText = "항목추가";
        this.$btnCreateContent = $addContentButton;

        const $delButton = document.createElement("button");
        $delButton.innerText = "스티커삭제";
        $delButton.onclick = () => {
            this.onDeleteSticker();
        };

        const $buttonDiv = document.createElement("div");
        $buttonDiv.append($addContentButton);
        $buttonDiv.append($delButton);

        $sticker.append($buttonDiv);

        const $contentListDiv = document.createElement("div");
        $contentListDiv.className = "content-list";
        this.$divContentList = $contentListDiv;

        $sticker.append($contentListDiv);

        return $sticker;
    }

    getElemSticker = () => this.$el;

    getElemCreateContent = () => this.$btnCreateContent;

    getElemContentList = () => this.$divContentList;

    getRandomColor = () => {
        const r = Math.floor(Math.random() * 51) + 150;
        const g = Math.floor(Math.random() * 51) + 150;
        const b = Math.floor(Math.random() * 51) + 150;
        return `rgb(${r}, ${g}, ${b})`;
    };

    onDeleteSticker() {
        this.$el.remove();
    }
}
