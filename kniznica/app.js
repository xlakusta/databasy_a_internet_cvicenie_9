fetch("topbar.html")
.then(response => response.text())
.then(html => {
    document.body.insertAdjacentHTML("afterbegin",html);
})
.catch(error => {
    console.error("Can't load topbar", error);
});

const adderButton = document.getElementById("adder");
if (adderButton) {
    adderButton.addEventListener("click", () => {
        window.location.href = "form.html";
    });
}

const button = document.getElementById("changer");
const message = document.getElementById("message");

if (button && message) {
    button.addEventListener("click", () => {
        message.textContent = "Button clicked!";
    });
}

const inputField = document.getElementById("inputField");
const outputField = document.getElementById("outputField");

if (inputField && outputField) {
    inputField.addEventListener("input", () => {
        const inputValue = inputField.value;
        outputField.textContent = `HELLO, ${inputValue}`;
    });
}

function applyTheme(theme) {
    document.body.classList.toggle("dark", theme === "dark");
    try { localStorage.setItem("theme", theme); } catch (e) {}
}

let savedTheme = "light";
try { savedTheme = localStorage.getItem("theme") || "light"; } catch (e) {}
applyTheme(savedTheme);

document.addEventListener("click", (event) => {
    if (event.target.id === "moon") applyTheme("dark");
    if (event.target.id === "sun") applyTheme("light");
});