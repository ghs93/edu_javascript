class Order {
    cookTime = 1000;
    orderName;
    element;

    constructor({ orderNum }) {
        this.orderNum = orderNum;
        this.status = "대기";
    }

    toString = () => `주문${this.orderNum}    ${this.orderName}    ${this.status}`;

    replaceElement() {
        this.element.innerText = `주문${this.orderNum}    ${this.orderName}    ${this.status}`;
    }
}

let addOrderList = addOrder();
let orderList = [];
let food = {
    sundae: "순댓국",
    heajang: "해장국",
};

// 순댓국, 해장국 버튼 클릭
const el_orderBtns = document.getElementsByName("orderBtn")[0];
el_orderBtns.addEventListener("click", (e) => {
    if (e.target instanceof HTMLButtonElement === false) {
        return;
    }

    let foodName = food[e.target.name];
    orderList.push(addOrderList(foodName));

    makeOrder().then(runCook).then(runServing).then(finishOrder);
});

// 주문 생성
function addOrder() {
    let orderNum = 1;

    return (orderName) => {
        let order = new Order({ orderNum });
        order.orderName = orderName;
        order.cookTime = orderName === food.sundae ? 1000 : 2000;

        orderNum = orderNum + 1;

        return order;
    };
}

// 주문 완료
let el_resultList = document.getElementsByName("resultList")[0];
function finishOrder({ server, order }) {
    el_orderList.removeChild(order.element);

    server.status = "대기중";
    server.orderNum = "";
    server.replaceElement();

    let el_li = document.createElement("li");
    el_li.innerText = order;
    el_resultList.appendChild(el_li);
}

// 주문 목록 추가
let el_orderList = document.getElementsByName("orderList")[0];
function makeOrder() {
    let el_li = document.createElement("li");
    let order = orderList[orderList.length - 1];

    el_li.innerText = order;
    el_orderList.appendChild(el_li);
    order.element = el_li;

    return new Promise((resolve, reject) => {
        resolve();
    });
}

class Cook {
    orderNum;

    constructor({ element }) {
        this.status = "대기중";
        this.element = element;
    }

    replaceElement() {
        this.element.innerText = `${this.status}    ${
            this.orderNum !== "" ? "주문" + this.orderNum : this.orderNum
        }`;
    }
}

let cookers = [];
let el_cookList = document.getElementsByName("cookList");
for (let element of el_cookList) {
    cookers.push(new Cook({ element }));
}

// 요리 시작
function runCook() {
    return new Promise((resolve, reject) => {
        let cooker = undefined;
        let cookerCheck = setInterval(() => {
            cooker = cookers.find((c) => c.status === "대기중");

            if (cooker !== undefined) {
                clearInterval(cookerCheck);

                let order = orderList.shift();

                cooker.status = "요리중";
                cooker.orderNum = order.orderNum;
                cooker.replaceElement();

                order.status = "요리중";
                order.replaceElement();

                setTimeout(() => {
                    resolve(order);
                }, order.cookTime);
            }
        }, 100);
    });
}

// 서버가 음식 받아감
function getFood(orderNum) {
    let order = cookers.find((c) => c.orderNum === orderNum);
    order.orderNum = "";
    order.status = "대기중";

    order.replaceElement();
}

class Server {
    orderNum;

    constructor({ servingTime, element }) {
        this.status = "대기중";
        this.servingTime = servingTime;
        this.element = element;
    }

    replaceElement() {
        this.element.innerText = `${this.status}    ${
            this.orderNum !== "" ? "주문" + this.orderNum : this.orderNum
        }`;
    }
}

let servers = [];
let el_serverList = document.getElementsByName("serverList");
let servingTime = 1000;
for (let element of el_serverList) {
    servers.push(new Server({ servingTime, element }));
    servingTime += 1000;
}

// 서빙 시작
function runServing(order) {
    return new Promise((resolve, reject) => {
        let server = undefined;
        let serverCheck = setInterval(() => {
            server = servers.find((s) => s.status === "대기중");

            if (server !== undefined) {
                clearInterval(serverCheck);
                getFood(order.orderNum);

                server.status = "서빙";
                server.orderNum = order.orderNum;
                server.replaceElement();

                order.status = "서빙";
                order.replaceElement();

                setTimeout(() => {
                    resolve({ server, order });
                }, server.servingTime);
            }
        }, 100);
    });
}
