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
let itemDetail = [];

// json에서 데이터 받아오기
const getData = async () => {
  try {
    const response = await fetch("./js/item.json");
    const productData = await response.json();
    // console.log(productData);
    return productData;
  } catch (error) {
    console.log(error);
  }
};

// 데이터 받아와서 화면에 표현하기
const resData = (productData) => {
  const docFrag = document.createDocumentFragment();

  productData.forEach((item) => {
    console.log(item);
    const stagedItem = document.createElement("li");
    stagedItem.classList = "list";
    // 커스텀 속성 추가
    stagedItem.dataset.cost = item.cost;
    stagedItem.dataset.name = item.name;
    stagedItem.dataset.count = item.count;
    stagedItem.dataset.img = item.img;
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
  itemDetail = [...document.querySelectorAll(".btn-item")];
  // console.log([...itemDetail]);
};

// 입금액 입력 함수
const depositFunc = (e) => {
  // 입금액
  const depositValue = inpMoney.value;
  // 소지금
  const intMyMoney = parseInt(txtMyMoney.textContent.replaceAll(",", ""));
  // 잔액
  const intReMoney = parseInt(returnMoney.textContent.replaceAll(",", ""));

  if (depositValue) {
    if (depositValue <= intMyMoney && depositValue > 0) {
      // 잔액 표시하기
      returnMoney.textContent =
        Number(
          parseInt(intReMoney ? intReMoney : 0) + parseInt(depositValue)
        ).toLocaleString() + " 원";

      // 소지금 액수 차감
      txtMyMoney.textContent =
        (intMyMoney - depositValue).toLocaleString() + " 원";
    } else {
      alert("소지금이 부족합니다.");
    }
    inpMoney.value = null;
  }
};

// 거스름돈 반환 함수
const retMoneyFunc = (e) => {
  console.log("click2");
  // 잔액
  const intReMoney = parseInt(returnMoney.textContent.replaceAll(",", ""));
  // 소지금
  const intMyMoney = parseInt(txtMyMoney.textContent.replaceAll(",", ""));
  e.preventDefault();
  // 잔액 초기화
  if (intReMoney) {
    txtMyMoney.textContent = (intReMoney + intMyMoney).toLocaleString() + " 원";
    returnMoney.textContent = "원";
  }
};

// 데이터 받아오는 함수 실행
getData()
  .then((data) => {
    resData(data);
    return data;
  })
  .then((data) => {
    console.log(data);

    // 입금액 입력 함수
    btnPut.addEventListener("click", depositFunc);

    // 거스름돈 반환 함수
    btnReturn.addEventListener("click", retMoneyFunc);

    // 음료수 선택
    // console.log(itemDetail);
    itemDetail.forEach((item) => {
      item.addEventListener("click", (event) => {
        console.log(event.currentTarget);
        // 잔액
        const intReMoney = parseInt(
          returnMoney.textContent.replaceAll(",", "")
        );
        const curTargetEl = event.currentTarget;
        let isStaged = false; // 이미 선택
        const curTargetElPrice = parseInt(curTargetEl.dataset.cost);
        const stagedListItem = stagedList.querySelectorAll("li");

        // 잔액이 있을 경우 음료수 선택 가능
        if (intReMoney >= curTargetElPrice) {
          // 카트 리스트 생성 함수

          // 선택했다면 리스트 생성하기
          if (!isStaged) {
            const stagedItem = document.createElement("li");
            stagedItem.classList = "drink";
            stagedItem.dataset.cost = item.dataset.cost;
            stagedItem.dataset.name = item.dataset.name;
            stagedItem.dataset.count = item.dataset.count;
            stagedItem.dataset.img = item.dataset.img;
            stagedItem.innerHTML = `
            <img src="./images/${item.dataset.img}" alt="">
            <p>${item.dataset.name}</p>
            <span class="get-num">2</span>
            `;
            stagedList.appendChild(stagedItem);
          }
        } else if (intReMoney < curTargetElPrice) {
          alert("잔액이 부족합니다.");
        }
      });
    });
  });
