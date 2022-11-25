const main = document.querySelector("main");
const itemList = main.querySelector(".bending-list");

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
