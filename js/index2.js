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
// console.log(itemDetail);

// 데이터 받아오는 함수 실행
getData()
  .then((data) => {
    resData(data);
    return data;
  })
  .then((data) => {
    console.log(data);
  });
