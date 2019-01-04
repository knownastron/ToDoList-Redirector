console.log("YAAAAAAAAAAA");
console.log("YAAAAAAAAAAA");
console.log("YAAAAAAAAAAA");
console.log("YAAAAAAAAAAA");

let blackList = ["www.reddit.com", "slatestarcodex.com"];
let currentURL = String(window.location);

blackList.forEach(function(website) {
  if (currentURL.includes(website)) {
    console.log("TRU");
    window.location ="https://keep.google.com";
  }
});
