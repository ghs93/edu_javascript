const el_input_name = document.getElementById("name");
const el_makeBtns = document.getElementById("btn-make");
const el_list = document.getElementById("pung-list");
const el_total_item = document.getElementById("total-items");
const el_avg_time = document.getElementById("avg-time");

const el_btn_option = document.getElementById("btn-option");

let pungList = [];
let totalTime = 0;

window.onload = () => {
    setInterval(() => {
        renderList();
        pungHandler();
        setSummary();
    }, 280);
};

// 펑 목록 추가
el_makeBtns.addEventListener("click", (e) => {
    let btn = e.target;

    if (btn instanceof HTMLButtonElement === false) {
        return;
    }

    if (el_input_name.value === "") {
        alert("내용 입력");
        return;
    }

    addPung({
        time: btn.value,
        name: el_input_name.value,
    });

    el_input_name.value = "";
    el_input_name.focus();
});

el_btn_option.addEventListener("click", (e) => {
    let btn = e.target;

    if (btn instanceof HTMLButtonElement === false) {
        return;
    }

    switch (btn.name) {
        case "btn-reset":
            doReset();
            break;

        case "btn-double":
            doDouble();
            break;

        case "btn-all-add":
            doAdd();
            break;

        case "btn-all-stop":
            doAllStop();
            break;

        case "btn-all-start":
            doAllStart();
            break;
    }
});

// pungList에 펑 추가 및 정렬
function addPung({ time, name }) {
    pungList.push(new Pung({ time, name }));
    totalTime += +time;
}

// 펑 목록 출력
function renderList() {
    el_list.replaceChildren();

    pungList.sort((src, dest) => src.time - dest.time);
    for (let pung of pungList) {
        el_list.appendChild(pung.addElement());
    }
}

// 펑 시간 관리
function pungHandler() {
    pungList.forEach((pung, index) => {
        if (pung.isStop) {
            return;
        }

        if (pung.time <= 0.28) {
            pungList.splice(index, 1);
        } else {
            pungList[index].time -= 0.28;
            totalTime -= 0.28;
        }
    });
}

// 총건과 평균 남은시간 출력
function setSummary() {
    el_total_item.innerText = pungList.length;
    el_avg_time.innerText = pungList.length == 0 ? "0.0" : (totalTime / pungList.length).toFixed(1);
}

function doReset() {
    pungList = [];
    totalTime = 0;
}

function doDouble() {
    let tempList = [];
    pungList.forEach((pung) => {
        tempList.push(
            new Pung({
                time: pung.time,
                name: pung.name,
            })
        );

        totalTime += +pung.time;
    });

    pungList.push(...tempList);
}

function doAdd() {
    pungList.forEach((pung, index) => {
        pungList[index].time += 5;
        totalTime += 5;
    });
}

function doAllStop() {
    pungList.forEach((pung, index) => {
        pungList[index].isStop = true;
    });
}

function doAllStart() {
    pungList.forEach((pung, index) => {
        pungList[index].isStop = false;
    });
}

class Pung {
    el_li = document.createElement("li");
    el_p = document.createElement("p");
    el_name = document.createElement("span");
    el_time = document.createElement("span");
    el_add = document.createElement("button");
    el_stop = document.createElement("button");
    el_delete = document.createElement("button");

    addListener = (e) => {
        this.time += 5;
        totalTime += 5;
    };

    stopListener = (e) => {
        this.isStop = !this.isStop;
    };

    deleteListener = (e) => {
        totalTime -= this.time;
        this.time = 0;

        this.el_li.style.display = "none";
    };

    constructor({ time, name }) {
        this.time = time;
        this.name = name;

        this.el_add.addEventListener("click", this.addListener);
        this.el_stop.addEventListener("click", this.stopListener);
        this.el_delete.addEventListener("click", this.deleteListener);
    }

    get isStop() {
        if (this._isStop === undefined) {
            this._isStop = false;
        }
        return this._isStop;
    }

    set isStop(value) {
        this._isStop = value;
    }

    // 펑 리스트 생성
    addElement() {
        this.el_name.innerText = `${this.name}  `;
        this.el_time.innerText = `${parseInt(this.time)} 초`;
        this.el_add.innerText = "5초";
        this.el_stop.innerText = this._isStop ? "시작" : "중지";
        this.el_delete.innerText = "삭제";

        this.el_p.appendChild(this.el_name);
        this.el_p.appendChild(this.el_time);
        this.el_p.appendChild(this.el_add);
        this.el_p.appendChild(this.el_stop);
        this.el_p.appendChild(this.el_delete);

        this.el_li.appendChild(this.el_p);

        return this.el_li;
    }
}
