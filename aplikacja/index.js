const inAddBtn = document.getElementById("income-addBtn");
const outAddBtn = document.getElementById("outcome-addBtn");

let inOutData = [];
let inOutDataLS = JSON.parse(localStorage.getItem("inOutArr"));
if (inOutDataLS?.length > 0) {
    inOutData = JSON.parse(localStorage.getItem("inOutArr"));
    updateMainContentnListUI();
    sum();
}

let lastId = 0;

function onInAddBtnClicked() {
    const incomeName = document.getElementById("income-name");
    const incomeValue = document.getElementById("income-val");
    if (incomeName.value.trim() === '' || incomeValue.value.trim() === '') {
        alert("Uzupełnij nazwę i/lub kwotę");
        return false;
    }
    inOutDataElem = {
        name: incomeName.value,
        value: incomeValue.value,
        id: lastId,
        type: "income"
    }
    inOutData.push(inOutDataElem);

    lastId++;

    updateMainContentnListUI();
    sum();
}      
 
function onOutAddBtnClicked() {
    const outcomeName = document.getElementById("outcome-name");
    const outcomeValue = document.getElementById("outcome-val");
    if (outcomeName.value.trim() === '' || outcomeValue.value.trim() === '') {
        alert("Uzupełnij nazwę i/lub kwotę");
        return false;
    }
    inOutDataElem = {
        name: outcomeName.value,
        value: outcomeValue.value,
        id: lastId,
        type: "outcome"
    }
    inOutData.push(inOutDataElem);
    lastId++;

    updateMainContentnListUI();
    sum();
}  

function onDeleteBtnClicked(event) {
    inOutData = inOutData.filter(function(elem){
        return elem.id !== Number(event.target.id.split('-')[1]);
    });
    localStorage.setItem("inOutArr", JSON.stringify(inOutData));
    
    updateMainContentnListUI();
    sum();
}

function onEditBtnClicked(event){
    indexElem = inOutData.findIndex(function(elem){
        return elem.id === Number(event.target.id.split('-')[1]);
    });
    let container = document.getElementById(`container-${event.target.id.split('-')[1]}`);
    // container.classList = ("z-index");
    // shadow = document.createElement("div");
    // shadow.classList = ("shadow");
    // document.body.appendChild(shadow);
    container.innerHTML =`
            <input class="edited-name" id="edited-name" type="text" value="${inOutData[indexElem].name}" placeholder="nazwa przychodu">
            <input class="edited-val" id="edited-val" type="number" value="${inOutData[indexElem].value}" placeholder="kwota przychodu">
            <button class="addBtn" id="edited-addBtn">Dodaj</button>
        `; 
    const editedAddBtn = document.getElementById("edited-addBtn")
    editedAddBtn.addEventListener("click", function() {
        const editedName = document.getElementById("edited-name");
        const editedVal = document.getElementById("edited-val");
        inOutData[indexElem].name = editedName.value;
        inOutData[indexElem].value = editedVal.value;
        updateMainContentnListUI()
        sum();
        // shadow.remove();
    });   
}
    
function updateMainContentnListUI () {
    const mainContentIncomeList = document.getElementById("mainContent-income-list");
    const mainContentOutcomeList = document.getElementById("mainContent-outcome-list");

    mainContentIncomeList.innerText = " ";
    mainContentOutcomeList.innerText = " ";

    inOutData.forEach(function(inOutDataElem) {
        const container = document.createElement("div");
        container.classList = "list-element"
        container.id = `container-${inOutDataElem.id}`;

        const paragraph = document.createElement("p");
        paragraph.innerText = `${inOutDataElem.name}:  ${inOutDataElem.value} zł`

        const editBtn = document.createElement("button");
        editBtn.innerText = "Edytuj"
        editBtn.id = `edit-${inOutDataElem.id}`;
        editBtn.addEventListener("click", onEditBtnClicked);

        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Usuń"
        deleteBtn.id = `delete-${inOutDataElem.id}`;
        deleteBtn.addEventListener("click", onDeleteBtnClicked)

        container.appendChild(paragraph);
        container.appendChild(editBtn);
        container.appendChild(deleteBtn);

        if (inOutDataElem.type === "income") {
            mainContentIncomeList.appendChild(container)
        } else {
            mainContentOutcomeList.appendChild(container)
        }

        localStorage.setItem("inOutArr", JSON.stringify(inOutData));
    });
}

function sum() {
    document.getElementById("balance")?.remove(); 
    let incomeSum = 0;
    let outcomeSum = 0;

    const incomeSumElem = document.getElementById("incomeSum");
    const outcomeSumElem = document.getElementById("outcomeSum");
    const topContainer = document.getElementById("topContainer");

    inOutData.forEach(function(inOutDataElem) {
        if (inOutDataElem.type === "income") {
            incomeSum += parseInt(inOutDataElem.value);
        }
        else if (inOutDataElem.type === "outcome"){
            outcomeSum += parseInt(inOutDataElem.value);
        }
    });

    incomeSumElem.innerText = incomeSum.toString();
    outcomeSumElem.innerText = outcomeSum.toString();
    
    let sumAll = incomeSum - outcomeSum;
    const sumAllContent = document.createElement("h1");
    sumAllContent.id = "balance";

    if (sumAll < 0) {
        sumAllContent.innerText = `Bilans jest ujemny. Jesteś na minusie ${sumAll*(-1)} złotych`;
    } else if (sumAll === 0) {
        sumAllContent.innerText = `Bilans wynosi zero`; 
    } else {
        sumAllContent.innerText = `Możesz jeszcze wydać ${sumAll} złotych`;
    }
    topContainer.appendChild(sumAllContent);
}

