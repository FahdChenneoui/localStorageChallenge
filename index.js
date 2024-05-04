 const { LocalStorage } = require('node-localstorage');
const localStorage = new LocalStorage('./storage');

// Set item in local storage / expiry time by adding TTL (time-to-live) Ms
function setItemWithExpiry(key, value, ttl) {
    const now = new Date();
    const expiryTime = new Date(now.getTime() + ttl * 1000); 
    const item = {
        value: value,
        expiry: expiryTime
    };
    // Store the item 
    localStorage.setItem(key, JSON.stringify(item));
}

// Get item from local-storage with expiry
function getItemWithExpiry(key) {
    const itemString = localStorage.getItem(key);
    if (!itemString) {
        return "undefined";
    }
    const item = JSON.parse(itemString);
    const now = new Date().getTime();  
    const expiryTime = new Date(item.expiry).getTime();
    if (now > expiryTime) {
        localStorage.removeItem(key);
        return "undefined";
    }
    return item.value;
}

// Show Result
setItemWithExpiry("key1", "value", 1);
console.log(`Query within 1000 seconds: Answer -> "${getItemWithExpiry("key1")}"`);
// 2000 milliseconds to ensure the item has expired
setTimeout(() => {
    console.log(`Query after 1000 seconds: Answer -> "${getItemWithExpiry("key1")}"`);
}, 2000);
