const main = document.querySelector("main");
const itemList = main.querySelector(".bending-list");
const returnMoney = main.querySelector(".return-money");
const btnReturn = main.querySelector(".btn.return");
const inpMoney = main.querySelector("#input-in");
const btnPut = main.querySelector(".btn.put");
const getBtn = main.querySelector(".get-btn");
const txtMyMoney = main.querySelector(".txt-mymoney");
const txtTotal = main.querySelector(".txt-total");

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
            <img src="./images/${item.img}" alt=${item.name}>
            <p>${item.name}</p>
            <button class='price-btn'>${item.cost}원</button>
        `;
        docFrag.appendChild(stagedItem);
    });
    itemList.appendChild(docFrag);

    inpMoneyFunc();
};
getData();

const inpMoneyFunc = (e) => {
    const moneyValue = inpMoney.value;
    // console.log(moneyValue);
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
    // 음료 선택 기능
    const itemDetail = itemList.querySelectorAll(".list");
    itemDetail.forEach((item) => {
        console.log(item);
        item.addEventListener("click", (e) => {
            console.log(item.dataset.cost);
            console.log(item.dataset.name);
        });
    });
};
const retMoneyFunc = (e) => {
    const intReMoney = parseInt(returnMoney.textContent.replaceAll(",", ""));
    const intMyMoney = parseInt(txtMyMoney.textContent.replaceAll(",", ""));
    // 잔액 금액 초기화
    if (intReMoney) {
        txtMyMoney.textContent = (intReMoney + intMyMoney).toLocaleString() + " 원";
        returnMoney.textContent = "원";
    }
};

btnReturn.addEventListener("click", retMoneyFunc);
btnPut.addEventListener("click", inpMoneyFunc);
