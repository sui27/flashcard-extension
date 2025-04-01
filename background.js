chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.get("words", (data) => {
        if (!data.words) {
            chrome.storage.local.set({ words: [] });
        }
    });

    chrome.alarms.create("flashcardAlarm", { periodInMinutes: 1 });
});

chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === "flashcardAlarm") {
        showFlashcard();
    }
});

function showFlashcard() {
    chrome.storage.local.get("words", (data) => {
        if (data.words && data.words.length > 0) {
            const words = data.words;
            const index = Math.floor(Math.random() * words.length);
            const word = words[index];

            chrome.notifications.create({
                type: "basic",
                iconUrl: "icons/icon128.png",
                title: word.word + " (" + word.type + ")",
                message: word.meaning + "\nExample: " + word.example,
                priority: 2
            });
        }
    });
}
