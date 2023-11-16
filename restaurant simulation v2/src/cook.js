export default class Cook {
    #$element;

    #orderNum;
    #status;

    constructor({ element }) {
        this.#status = "대기중";
        this.#$element = element;
    }

    getStatus = () => this.#status;

    setStatus = (status) => (this.#status = status);

    replaceElement = () => {
        this.#$element.innerText = `${this.#status}    ${
            this.#orderNum !== "" ? "주문" + this.#orderNum : this.#orderNum
        }`;
    };

    // 요리 시작
    onCook = (order) => {
        this.#status = "요리중";
        this.#orderNum = order.getOrderNum();
        this.replaceElement();

        // order.status = "요리중";
        order.setStatus("요리중");
        order.replaceElement();
    };

    // 완료된 요리 제공
    getFood = () => {
        this.#orderNum = "";
        this.#status = "대기중";

        this.replaceElement();
    };
}
