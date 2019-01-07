chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status == 'loading') {
    let blackList = [];
    let currentURL = '';
    let myURL = "https://keep.google.com";

    chrome.storage.sync.get('blocked-websites', function(data) {
      if (data !== undefined) {
        blackList = data['blocked-websites'];
      }
      console.log("BLOCKED WEBSITES");
      console.log("BLOCKED WEBSITES");
      console.log("BLOCKED WEBSITES");
      urlCheck();
    });

    // checks if the current URL is in the black list
    function urlCheck() {
      chrome.tabs.getSelected(null, function(tab) {
        currentURL = tab.url.toLowerCase();
        blackList.forEach(function(website) {
          if (currentURL.includes(website)) {
            chrome.tabs.query({currentWindow: true, active: true}, function (tab) {
              console.log("TRUUUUUUU background");
              chrome.tabs.update(tab.id, {url: myURL});
            });
          }
        });
    });
    }
  }
});

chrome.browserAction.setPopup({popup:''});  //disable browserAction's popup

// opens options page when icon is clicked
chrome.browserAction.onClicked.addListener(()=>{
    chrome.tabs.create({url:'options.html'});
});
