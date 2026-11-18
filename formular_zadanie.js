const nameField = document.getElementById("name");

const emailField = document.getElementById("email");
const courseField = document.getElementById("course");
const urovField = document.getElementsByName("urov");
const otherField = document.getElementById("other");

const nameOutput = document.getElementById("outname");
const emailOutput = document.getElementById("outemail");
const courseOutput = document.getElementById("outcourse");
const urovOutput = document.getElementById("outurov");
const otherOutput = document.getElementById("outother");

if (nameField && nameOutput) {
    nameField.addEventListener("input", () => {
        nameOutput.textContent = `Name: ${nameField.value} `;
    });
}



if (emailField && emailOutput) {
    emailField.addEventListener("input", () => {
        emailOutput.textContent = `Email: ${emailField.value} `;
    });
}



if (courseField && courseOutput) {
    courseField.addEventListener("change", () => {
        courseOutput.textContent = `Course: ${courseField.value} `;
    });
}

if (urovField && urovOutput) {
    urovField.forEach((radio) => {
        radio.addEventListener("change", () => {
            urovOutput.textContent = `Uroven: ${radio.value} `;
        });
    });
}

if (otherField && otherOutput) {
    otherField.addEventListener("input", () => {
        otherOutput.textContent = `Poznámka: ${otherField.value} `;
    });
}


const form = document.getElementById("myForm");
if (form) {
    form.addEventListener("submit", (event) => {
        event.preventDefault(); 
        form.style.display = "none";
        alert("Formulár bol úspešne odoslaný!");
    });
}