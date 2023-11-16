import { createOrder } from "./order.js";
import Cook from "./cook.js";
import Server from "./server.js";

// 주문 목록 정의
let orderList = [];
let $orderList = document.querySelector(".orderList");
let $resultList = document.querySelector(".resultList");
let foodInfo = {
    sundae: {
        name: "순댓국",
        value: 1000,
    },
    heajang: {
        name: "해장국",
        value: 2000,
    },
};

// 요리사 정의
let cookers = [];
let $cookList = document.getElementsByName("cookList");
$cookList.forEach((element) => {
    cookers.push(new Cook({ element }));
});

// 서버 정의
let servers = [];
let $serverList = document.getElementsByName("serverList");
let servingTime = 1000;
$serverList.forEach((element) => {
    servers.push(new Server({ servingTime, element }));
    servingTime += 1000;
});

// 순댓국, 해장국 버튼 클릭
const $orderBtns = document.querySelector(".orderBtn");
$orderBtns.onclick = (e) => {
    if (e.target instanceof HTMLButtonElement === false) {
        return;
    }

    // 주문 생성
    let food = foodInfo[e.target.name];
    orderList.push(createOrder(food, $orderList));

    // 요리 시작 및 서빙
    runCook()
        .then(runServing)
        .then(({ server, order }) => {
            order.finishOrder({
                server,
                $orderList,
                $resultList,
            });
        });
};

// 요리 시작
function runCook() {
    return new Promise((resolve, reject) => {
        let cooker = undefined;
        let cookerCheck = setInterval(() => {
            cooker = cookers.find((c) => c.getStatus() === "대기중");

            if (cooker !== undefined) {
                clearInterval(cookerCheck);

                let order = orderList.shift();
                cooker.onCook(order);

                setTimeout(() => {
                    resolve({ cooker, order });
                }, order.getCookTime());
            }
        }, 100);
    });
}

// 서빙 시작
function runServing({ cooker, order }) {
    return new Promise((resolve, reject) => {
        let server = undefined;
        let serverCheck = setInterval(() => {
            server = servers.find((s) => s.getStatus() === "대기중");

            if (server !== undefined) {
                clearInterval(serverCheck);
                cooker.getFood(order.getOrderNum());

                server.onServing(order);

                setTimeout(() => {
                    resolve({ server, order });
                }, server.getServingTime());
            }
        }, 100);
    });
}
