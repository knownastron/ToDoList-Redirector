chrome.browserAction.setPopup({popup:''});  //disable browserAction's popup

// opens options page when icon is clicked
chrome.browserAction.onClicked.addListener(()=>{
    chrome.tabs.create({url:'options.html'});
});
