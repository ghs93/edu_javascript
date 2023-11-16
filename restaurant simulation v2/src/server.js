export default class Server {
    #$element;

    #orderNum;
    #status;
    #servingTime;

    constructor({ servingTime, element }) {
        this.#status = "대기중";
        this.#servingTime = servingTime;
        this.#$element = element;
    }

    getServingTime = () => this.#servingTime;

    getStatus = () => this.#status;

    setStatus = (status) => (this.#status = status);

    replaceElement = () => {
        this.#$element.innerText = `${this.#status}    ${
            this.#orderNum !== "" ? "주문" + this.#orderNum : this.#orderNum
        }`;
    };

    // 서빙 시작
    onServing = (order) => {
        this.#status = "서빙";
        this.#orderNum = order.getOrderNum();
        this.replaceElement();

        order.setStatus("서빙");
        order.replaceElement();
    };

    // 서빙 완료
    finishServing = () => {
        this.#status = "대기중";
        this.#orderNum = "";
        this.replaceElement();
    };
}
