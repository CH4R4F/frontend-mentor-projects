"use strict";
let tipAmount = document.querySelector(".tip-result"),
    total = document.querySelector(".total-result"),
    bill = document.querySelector("#bill-input"),
    nop = document.querySelector("#nop-input"),
    tip = document.querySelectorAll(".tip-value"),
    reset = document.querySelector(".reset-results"),
    checkedTip = [false],
    tipValue = null;

//check the tip value and listen to the buttons
tip.forEach(button => {

    // check if the cklicked option is a button or the custom input 
    function selectTip() {

        if(checkedTip[0]) {
            checkedTip[1].classList.remove("active")
            button.classList.add("active")
            checkedTip[1] = button
        } else {
            checkedTip[0] = true
            checkedTip[1] = button
            checkedTip[1].classList.add("active")
        }

        tipValue = button.value
    }

    if(button.nodeName == "BUTTON") {
        button.addEventListener("click", selectTip)
        button.addEventListener("click", checkInfos)

    } else {
        button.addEventListener("focus", selectTip)
        button.addEventListener("input", selectTip)
        button.addEventListener("input", checkInfos)
    }
})

function initResults() {
    tipAmount.textContent = "0.00"
    total.textContent = "0.00"
}

//check for valid numbers
function validNumber(element) {
    if(Number.isNaN(Number(element))) {
        return false
    }
    return true
}
function checkInfos() {

    let tipAmountValue = eval((bill.value * (tipValue / 100)) / nop.value),
        totalValue = eval(bill.value / nop.value + tipAmountValue);

    if(bill.value && nop.value && tipValue) {
        if(validNumber(bill.value) && validNumber(nop.value)) {
            tipAmount.textContent = tipAmountValue.toFixed(2)
            total.textContent = totalValue.toFixed(2)
        }
    } else {
        initResults()
    }
}

bill.addEventListener("input", checkInfos)
nop.addEventListener("input", checkInfos)

reset.addEventListener("click", function(){
    bill.value = ""
    nop.value = ""
    tipValue = null
    checkedTip[0] = false
    if(checkedTip[1]){
        checkedTip[1].classList.remove("active")
        checkedTip.pop()
    }

    document.querySelector(".custom").value = ""
    initResults()
})