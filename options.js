let addButton;
let blackListDisplay;
let blackList = [];

window.onload = function() {
  addButton = document.getElementById("addButton");
  blackListDisplay = document.getElementById("blackListDisplay");

  addButton.onclick = function() {
    website = document.getElementById("website").value.toLowerCase();
    blackList.push(website);
    console.log(blackList)
    updateBlackListDisplay();
  }
}

function updateBlackListDisplay() {
  blackListDisplay.innerHTML = '';
  let theTable = document.createElement("table");
  theTable.setAttribute("id", "blackListTable")
  for (let i = 0; i < blackList.length; i++) {
    let newRow = document.createElement("tr");
    let websiteName = document.createElement("td");
    let removeButton = document.createElement("input");
    setUpRemoveButton(removeButton);
    websiteName.appendChild(document.createTextNode(blackList[i]));
    newRow.appendChild(websiteName);
    newRow.appendChild(removeButton);
    theTable.appendChild(newRow);

    blackListDisplay.appendChild(theTable);
  }
}

function setUpRemoveButton(button) {
  button.setAttribute("type", "submit");
  button.setAttribute("value", "X");

  button.onclick = function() {
    website = this.parentNode.children[0].innerHTML;
    index = blackList.indexOf(website);
    blackList.splice(index, 1);
    this.parentNode.remove();
  }
}
