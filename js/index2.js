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
    <button type='button' class='btn-item' data-item="${item.name}" data-count="${item.count}" data-cost="${item.cost}" data-img="${item.img}">
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

// 선택한 아이템 담는 함수
const addCartList = (target) => {
  const stagedItem = document.createElement("li");
  stagedItem.dataset.item = target.dataset.item;
  stagedItem.dataset.price = target.dataset.price;
  stagedItem.innerHTML = `
    <button type="button" class="drink btn-staged">
      <img src="./images/${target.dataset.img}" alt="" class="img-item">
      <p class="txt-item">${target.dataset.item}</p>
      <span class="get-num">1</span>
    </button>
  `;
  stagedList.appendChild(stagedItem);
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
        console.log(intReMoney);
        const curTargetEl = event.currentTarget;
        console.log(curTargetEl.dataset.cost);
        let isStaged = false; // 이미 선택
        const curTargetElPrice = parseInt(curTargetEl.dataset.cost);
        const stagedListItem = stagedList.querySelectorAll("li");

        // 입금된 금액이 읍료수 값보다 많을 경우
        if (intReMoney >= curTargetElPrice) {
          returnMoney.textContent =
            new Intl.NumberFormat().format(intReMoney - curTargetElPrice) +
            " 원";

          // forEach 문을 사용할 경우 반복의 종료가 불가능하다(return, break 작동 안함). 모든 원소를 순환할 필요가 없다면 비효율적.
          for (const item of stagedListItem) {
            // 클릭한 음료수가 이미 선택한 아이템인지 탐색
            if (item.dataset.item === curTargetEl.dataset.item) {
              item.querySelector(".get-num").textContent++;
              isStaged = true;
              break;
            }
          }

          // 처음 선택한 경우
          if (!isStaged) {
            addCartList(curTargetEl);
          }
          curTargetEl.dataset.count--;
        } else {
          alert("잔액이 부족합니다. 돈을 입금해주세요");
        }
      });
    });
  });
