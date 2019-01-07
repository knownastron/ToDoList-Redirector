console.log("CONTENT.JS");
console.log("CONTENT.JS");
console.log("CONTENT.JS");
console.log("CONTENT.JS");

let blacklist = [];
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

// checks if the current URL is in the black list
function urlCheck() {
  let currentURL = String(window.location).toLowerCase();
  console.log(currentURL);

  console.log("yaya", blackList);
  blackList.forEach(function(website) {
    if (currentURL.includes(website)) {
      console.log("TRU");
      window.location = redirectWebsite;
    }
  });
}
