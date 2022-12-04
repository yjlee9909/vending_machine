const main = document.querySelector("main");
const itemList = main.querySelector(".bending-list");
const returnMoney = main.querySelector(".return-money");
const btnReturn = main.querySelector(".btn.return");
const inpMoney = main.querySelector("#input-in");
const btnPut = main.querySelector(".btn.put");
const getBtn = main.querySelector(".get-btn");
const txtMyMoney = main.querySelector(".txt-mymoney");
const txtTotal = main.querySelector(".txt-total");
const stagedList = main.querySelector(".list-item-staged");

// json에서 데이터 받아오기
const getData = async () => {
    const response = await fetch("./js/item.json");
    const productData = await response.json();
    console.log(productData);
    const docFrag = document.createDocumentFragment();
    productData.forEach((item) => {
        const stagedItem = document.createElement("li");
        stagedItem.dataset.cost = item.cost;
        stagedItem.dataset.name = item.name;
        stagedItem.classList = "list";
        stagedItem.innerHTML = `
        <button type='button' class='btn-item' data-item="${item.name}" data-count="${item.count}" data-price="${item.cost}" data-img="${item.img}">
            <img src="./images/${item.img}" alt=${item.name}>
            <p>${item.name}</p>
            <span class='price-btn'>${item.cost}원</span>
        </button>
        `;
        docFrag.appendChild(stagedItem);
    });
    itemList.appendChild(docFrag);
    return productData;
};
getData();

const inpMoneyFunc = (e) => {
    const moneyValue = inpMoney.value;
    const intMyMoney = parseInt(txtMyMoney.textContent.replaceAll(",", ""));
    const intReMoney = parseInt(returnMoney.textContent.replaceAll(",", ""));
    if (moneyValue) {
        if (moneyValue <= intMyMoney && moneyValue > 0) {
            // 잔액에 금액 표시하기
            returnMoney.textContent = Number(parseInt(intReMoney ? intReMoney : 0) + parseInt(moneyValue)).toLocaleString() + " 원";

            // 소지금 액수 차감
            txtMyMoney.textContent = (intMyMoney - moneyValue).toLocaleString() + " 원";
        } else {
            alert("소지금이 부족합니다.");
        }
        inpMoney.value = null;
    }
};
// 선택 음료 목록 생성
const stagedItemGenerator = (target) => {
    const stagedItem = document.createAttribute("li");
    stagedItem.classList = "drink";
    stagedItem.dataset.name = target.dataset.name;
    stagedItem.dataset.cost = target.dataset.cost;
    stagedItem.innerHTML = `
    <img src="./images/${target.dataset.img}" alt="">
    <p>${target.dataset.name}</p>
    <span class="get-num">2</span>
    `;
    stagedList.appendChild(stagedItem);
};

// 음료 선택 기능
const itemDetail = itemList.querySelectorAll(".btn-item");
const intReMoney = parseInt(returnMoney.textContent.replaceAll(",", ""));
itemDetail.forEach((item) => {
    item.addEventListener("click", (e) => {
        // e.preventDefault();
        console.log("hi");
        console.log(e.currentTarget);
        const targetEl = e.currentTarget;
        const targetElPrice = parseInt(targetEl.dataset.cost);
        if (intReMoney >= targetElPrice) {
            // 잔액
            returnMoney.textContent = (intReMoney - targetElPrice).toLocaleString() + " 원";
            console.log(item.dataset.cost);
            console.log(item.dataset.name);
            console.log("hi");
        } else {
            alert("잔액이 부족합니다.");
        }
    });
});

const retMoneyFunc = (e) => {
    const intReMoney = parseInt(returnMoney.textContent.replaceAll(",", ""));
    const intMyMoney = parseInt(txtMyMoney.textContent.replaceAll(",", ""));
    // 잔액 금액 초기화
    if (intReMoney) {
        txtMyMoney.textContent = (intReMoney + intMyMoney).toLocaleString() + " 원";
        returnMoney.textContent = "원";
    }
};

btnPut.addEventListener("click", inpMoneyFunc);
btnReturn.addEventListener("click", retMoneyFunc);
