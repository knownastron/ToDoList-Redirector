chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status == 'loading') {
    let blackList = [];
    let currentURL = '';
    let myURL = "https://google.com";
    let redirectWebsite = '';

    chrome.storage.sync.get('blocked-websites', function(data) {
      if (data !== undefined) {
        blackList = data['blocked-websites'];
      }

      chrome.storage.sync.get('redirect-website', function(data) {
        if (data['redirect-website'] !== undefined) {
          redirectWebsite = String(data['redirect-website']);
        }
        urlCheck();
      });
    });

    /**
     * checks if the currentURL is in the blacklist, redirects to myURL if true
     */
    function urlCheck() {
      currentURL = String(tab.url).toLowerCase();
      blackList.forEach(function(website) {
        if (currentURL.includes(website)) {
            console.log("TRUUUUUUU background");
            chrome.tabs.update(tab.id, {url: redirectWebsite});
        }
      });
    }
  }
});

//disable browserAction's popup
chrome.browserAction.setPopup({popup:''});

// opens options page when icon is clicked
chrome.browserAction.onClicked.addListener(()=>{
    chrome.tabs.create({url:'options.html'});
});
