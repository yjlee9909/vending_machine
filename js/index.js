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
        stagedItem.classList = "list";
        stagedItem.innerHTML = `
        <img src="./images/${item.img}" alt=${item.name}>
                            <p>${item.name}</p>
                            <button>${item.cost}원</button>
        `;
        docFrag.appendChild(stagedItem);
    });
    itemList.appendChild(docFrag);
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
};
btnReturn.addEventListener("click", () => {
    console.log("hi");
});
btnPut.addEventListener("click", inpMoneyFunc);
getBtn.addEventListener("click", () => {
    console.log("hee3333ei");
});
