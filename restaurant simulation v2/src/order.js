export default class Order {
    #$element;

    #status;
    #orderNum;
    #cookTime;
    #orderName;

    constructor({ orderNum, orderName, cookTime }) {
        this.#orderNum = orderNum;
        this.#cookTime = cookTime;
        this.#orderName = orderName;

        this.#status = "대기";
    }

    getElement = () => this.#$element;

    setElement = (element) => (this.#$element = element);

    replaceElement = () => {
        this.#$element.innerText = `주문${this.#orderNum}    ${this.#orderName}    ${this.#status}`;
    };

    getStatus = () => this.#status;

    setStatus = (status) => (this.#status = status);

    getOrderNum = () => this.#orderNum;

    setOrderNum = (orderNum) => (this.#orderNum = orderNum);

    getCookTime = () => this.#cookTime;

    // 주문 목록 추가
    makeOrder = ($orderList) => {
        let $li = document.createElement("li");
        $li.innerText = this.toString();

        $orderList.appendChild($li);
        this.#$element = $li;
    };

    // 주문 완료
    finishOrder = ({ server, $orderList, $resultList }) => {
        $orderList.removeChild(this.#$element);

        server.finishServing();

        let $li = document.createElement("li");
        $li.innerText = this.toString();
        $resultList.appendChild($li);
    };

    toString = () => `주문${this.#orderNum}    ${this.#orderName}    ${this.#status}`;
}

// 주문 생성
export let createOrder = addOrder();
function addOrder() {
    let orderNum = 1;

    return ({ name, value }, $orderList) => {
        let order = new Order({
            orderNum,
            orderName: name,
            cookTime: value,
        });

        order.makeOrder($orderList);

        orderNum = orderNum + 1;

        return order;
    };
}
