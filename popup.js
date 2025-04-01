document.addEventListener("DOMContentLoaded", function () {
    loadFlashcard();

    document.getElementById("addWordBtn").addEventListener("click", function () {
        const word = document.getElementById("wordInput").value.trim();
        const type = document.getElementById("typeInput").value.trim();
        const meaning = document.getElementById("meaningInput").value.trim();
        const example = document.getElementById("exampleInput").value.trim();

        if (word && type && meaning && example) {
            chrome.storage.local.get("words", (data) => {
                const words = data.words || [];
                words.push({ word, type, meaning, example });

                chrome.storage.local.set({ words: words }, () => {
                    console.log("New word added!");
                    alert("Word added successfully!");
                    loadFlashcard();
                });
            });
        } else {
            alert("Please fill in all fields!");
        }
    });
});

// Load một từ vựng theo thứ tự và lặp lại khi hết danh sách
function loadFlashcard() {
    chrome.storage.local.get(["words", "currentIndex"], (data) => {
        const words = data.words || [];
        let currentIndex = data.currentIndex || 0;

        if (words.length > 0) {
            const word = words[currentIndex];

            document.querySelector(".word").textContent = word.word;
            document.querySelector(".type").textContent = "(" + word.type + ")";
            document.querySelector(".meaning").textContent = word.meaning;
            document.querySelector(".example").textContent = "Example: " + word.example;

            // Cập nhật chỉ số cho lần tiếp theo
            currentIndex = (currentIndex + 1) % words.length;
            chrome.storage.local.set({ currentIndex: currentIndex });
        } else {
            document.querySelector(".word").textContent = "No words yet!";
            document.querySelector(".type").textContent = "";
            document.querySelector(".meaning").textContent = "Add some words!";
            document.querySelector(".example").textContent = "";

            // Đặt lại chỉ số nếu danh sách trống
            chrome.storage.local.set({ currentIndex: 0 });
        }
    });
}
