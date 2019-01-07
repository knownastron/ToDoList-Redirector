let blackListDisplay;
let blackList = [];
let redirectWebsite = "something";

window.onload = function() {
  //initializes chrome storage
  chrome.storage.sync.get('blocked-websites', function(data) {
    console.log(data['blocked-websites']);
    if (data['blocked-websites'] !== undefined) {
      blackList = data['blocked-websites'];
    }

    initializePage();
  });
}

function initializePage() {
  console.log("initializing page function");
  blackListDisplay = document.getElementById("black-list-display");
  updateBlackListDisplay();
  updateCurrentRedirectMessage();



  // set up the handling of the submit blocked website button
  let blockButton = document.getElementById("block-submit");
  blockButton.onclick = function() {
    console.log("BUTTON CLICKED");
    let website = document.getElementById("input-block-website").value.toLowerCase();
    console.log(website);
    if (website.trim() != '') {
      console.log(blackList);
      blackList.push(website);
      updateBlackListDisplay();
      saveBlacklistToStorage();
    }
  }

  // set up the handling of the submit redirect website button
  let redirectButton = document.getElementById("redirect-submit");
  redirectButton.onclick = function() {
    let website = document.getElementById("input-redirect-website").value.toLowerCase();
    if (website.trim() != '') {
      redirectWebsite = website;
      saveRedirectToStorage(website);
      updateCurrentRedirectMessage();
    }
  }
}

function updateBlackListDisplay() {
  console.log("Updating display");
  blackListDisplay = document.getElementById('black-list-display');
  blackListDisplay.innerHTML = '';
  for (let i = 0; i < blackList.length; i++) {
    // sets up row
    let newRow = document.createElement("div");
    newRow.setAttribute("class", "row");

    // sets up button column
    let buttonCol = document.createElement("div");
    buttonCol.setAttribute("value", "X");
    buttonCol.setAttribute("class", "col-1 my-col align-items-center");

    // sets up button
    let removeButton = document.createElement("button");
    removeButton.setAttribute("type", "button");
    removeButton.setAttribute("class", "btn-xs btn-light x-button");
    removeButton.innerHTML = "&times";

    setUpRemoveButton(removeButton);
    buttonCol.appendChild(removeButton);

    // sets up website column
    let websiteCol = document.createElement("div");
    websiteCol.setAttribute("class", "col align-items-center");

    // sets up website paragraph
    let websiteP = document.createElement("p");
    websiteP.appendChild(document.createTextNode(blackList[i]));
    websiteCol.appendChild(websiteP);

    newRow.appendChild(buttonCol);
    newRow.appendChild(websiteCol);
    blackListDisplay.appendChild(newRow);
  }
}

function updateCurrentRedirectMessage() {
  chrome.storage.sync.get('redirect-website', function(data) {
    redirectWebsite = data['redirect-website'];
    let currentRedirectMessage = document.getElementById("current-redirect");
    currentRedirectMessage.innerHTML = "Currently redirecting to: " + redirectWebsite;
  });


}

// sets up event listener for remove button click
function setUpRemoveButton(button) {
  button.onclick = function() {

    website = this.parentNode.parentNode.children[1].children[0].innerHTML;
    index = blackList.indexOf(website);
    blackList.splice(index, 1);
    this.parentNode.parentNode.remove();
    saveBlacklistToStorage();
    console.log(blackList);
  }
}



function saveBlacklistToStorage() {
  chrome.storage.sync.set({'blocked-websites': blackList}, function() {
  });
}

function saveRedirectToStorage(website) {
  chrome.storage.sync.set({'redirect-website': website}, function() {
  });
}
