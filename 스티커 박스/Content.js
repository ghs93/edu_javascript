export class Content {
    $content;

    constructor(titleNumber) {
        this.titleNumber = titleNumber;
        this.$content = this.createContent();
    }

    getElemContent = () => this.$content;

    createContent() {
        const $content = document.createElement("div");
        $content.className = "content";

        const $title = document.createElement("p");
        $title.innerText = `sample input ${this.titleNumber}`;

        const $delButton = document.createElement("button");
        $delButton.innerText = "삭제";
        $delButton.onclick = () => {
            $content.remove();
        };

        $content.append($title, $delButton);

        return $content;
    }
}
