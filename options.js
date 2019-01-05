let blackListDisplay;
let blackList = [];

window.onload = function() {

  chrome.storage.sync.get('websites', function(data) {
    if (data !== undefined) {
      blackList = data['websites'];
    }

    initializePage();
  })
}





function updateBlackListDisplay() {
  console.log("Updating display");
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

function initializePage() {
  blackListDisplay = document.getElementById("blackListDisplay");
  updateBlackListDisplay();

  let addButton = document.getElementById("addButton");
  addButton.onclick = function() {
    website = document.getElementById("website").value.toLowerCase();
    if (website.trim() != '') {
      blackList.push(website);
      console.log(blackList);
      updateBlackListDisplay();
      saveToStorage(website);
    }
  }

  let getButton = document.getElementById("getButton");
  getButton.onclick = function() {
    chrome.storage.sync.get('websites', function(data) {
      console.log("data", data);
      console.log("data['websites']", data['websites']);
    })
  }

  let clearButton = document.getElementById("clearButton");
  clearButton.onclick = function() {
    blackList = [];
    chrome.storage.sync.clear();
  }
}

function saveToStorage(website) {
  chrome.storage.sync.set({'websites': blackList}, function() {
  });
}
