console.log("CONTENT.JS");
console.log("CONTENT.JS");
console.log("CONTENT.JS");
console.log("CONTENT.JS");

let blackList = [];

chrome.storage.sync.get('websites', function(data) {
  if (data !== undefined) {
    blackList = data['websites'];
  }

  urlCheck();
});

// checks if the current URL is in the black list
function urlCheck() {
  let currentURL = String(window.location);

  console.log("yaya", blackList);
  blackList.forEach(function(website) {
    if (currentURL.includes(website)) {
      console.log("TRU");
      window.location ="https://keep.google.com";
    }
  });
}
