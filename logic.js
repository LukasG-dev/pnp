'use strict'

document.getElementById("pdfUpload").addEventListener("change", function(event) {
    const file = event.target.files[0];
    if (file) {
        const url = URL.createObjectURL(file);
        document.getElementById("pdfViewer").setAttribute("src", url);
    }
});

function updateCheckboxes() {
    document.querySelectorAll("tr").forEach(row => {
        const input = row.querySelector(".maxValue");
        const container = row.querySelector(".checkbox-container");
        if (!input || !container) return;
        container.innerHTML = ""; // Löscht die alten Checkboxen
        let max = input.value;
        if (row.querySelector("th").innerText === "Hunger") {
            // Für Hunger erstellen wir genau so viele Checkboxes wie der Wert in max
            for (let i = 0; i < max; i++) {
                const box = document.createElement("div");
                box.classList.add("checkbox");
                box.dataset.state = "0"; // Standardzustand
                box.addEventListener("click", function() {
                    let state = parseInt(this.dataset.state);
                    state = (state + 1) % 2; // Nur zwei Zustände für Hunger: 0 und 1
                    this.dataset.state = state;
                    this.classList.remove('blood');
                    if (state === 1) {
                        this.classList.add("blood");
                        this.textContent = "🩸";
                    } else {
                        this.textContent = "";
                    }
                });
                container.appendChild(box);
            }
        } else if (row.querySelector("th").innerText === "Resonanz") {
            // Für Resonanz immer genau 3 Checkboxen erstellen
            for (let i = 0; i < 3; i++) {
                const box = document.createElement("div");
                box.classList.add("checkbox");
                box.dataset.state = "0"; // Standardzustand
                box.addEventListener("click", function() {
                    let state = parseInt(this.dataset.state);
                    state = (state + 1) % 2; // Nur zwei Zustände für Resonanz: Leer oder Kreuz
                    this.dataset.state = state;
                    this.classList.remove('cross');
                    if (state === 1) {
                        this.classList.add("cross");
                    }
                });
                container.appendChild(box);
            }
        } else {
            // Für andere Zeilen (Gesundheit, Willenskraft, etc.) normale Checkboxen
            for (let i = 0; i < max; i++) {
                const box = document.createElement("div");
                box.classList.add("checkbox");
                box.dataset.state = "0"; // Standardzustand
                box.addEventListener("click", function() {
                    let state = parseInt(this.dataset.state);
                    state = (state + 1) % 3; // Drei Zustände für andere Zeilen
                    this.dataset.state = state;
                    this.classList.remove('strike1', 'strike2', 'cross');
                    if (state === 1) this.classList.add("strike1");
                    if (state === 2) this.classList.add("cross");
                });
                container.appendChild(box);
            }
        }
    });
}

function autoResize(textarea) {
    textarea.style.height = "auto"; // Setzt die Höhe zurück
    textarea.style.height = (textarea.scrollHeight) + "px"; // Passt die Höhe an den Inhalt an
}

document.querySelectorAll(".maxValue").forEach(input => {
    input.addEventListener("input", updateCheckboxes);
});

updateCheckboxes();
