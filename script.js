const API_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";


const dropdowns = document.querySelectorAll(".form-select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector("#from");
const toCurr = document.querySelector("#to");
const msg = document.querySelector(".msg");


for (let select of dropdowns) {
    for (let currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.value = currCode;
        newOption.innerText = currCode;

        
        if (select.id === "from" && currCode === "USD") {
            newOption.selected = true;
        } else if (select.id === "to" && currCode === "INR") {
            newOption.selected = true;
        }

        select.appendChild(newOption);
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}


const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;

    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};


const updateExchange = async () => {
    let amount = document.querySelector("#amount");
    let amtVal = amount.value;

    if (amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amount.value = "1";
    }

    const URL = `${API_URL}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);

    if (response.ok) {
        let data = await response.json();
        let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
        let finalAmount = amtVal * rate;

        msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount.toFixed(2)} ${toCurr.value}`;
    } else {
        msg.innerText = "Error fetching exchange rate.";
    }
};


btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchange();
});


window.addEventListener("load", () => {
    updateExchange();
});
