// ===============================
// Elements
// ===============================

const passwordInput = document.getElementById("password");
const copyBtn = document.getElementById("copyBtn");
const generateBtn = document.getElementById("generateBtn");

const lengthSlider = document.getElementById("length");
const lengthValue = document.getElementById("lengthValue");

const uppercase = document.getElementById("uppercase");
const lowercase = document.getElementById("lowercase");
const numbers = document.getElementById("numbers");
const symbols = document.getElementById("symbols");

const strengthFill = document.getElementById("strengthFill");
const strengthText = document.getElementById("strengthText");

// ===============================
// Character Sets
// ===============================

const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerChars = "abcdefghijklmnopqrstuvwxyz";
const numberChars = "0123456789";
const symbolChars = "!@#$%^&*()_+{}[]<>?/";

// ===============================
// Update Slider Value
// ===============================

lengthSlider.addEventListener("input", () => {
    lengthValue.textContent = lengthSlider.value;
});

// ===============================
// Generate Password
// ===============================

generateBtn.addEventListener("click", generatePassword);

function generatePassword() {

    let characters = "";

    if (uppercase.checked) {
        characters += upperChars;
    }

    if (lowercase.checked) {
        characters += lowerChars;
    }

    if (numbers.checked) {
        characters += numberChars;
    }

    if (symbols.checked) {
        characters += symbolChars;
    }

    if (characters === "") {
        alert("Please select at least one character type.");
        return;
    }

    let password = "";

    for (let i = 0; i < lengthSlider.value; i++) {

        const randomIndex = Math.floor(Math.random() * characters.length);

        password += characters[randomIndex];
    }

    passwordInput.value = password;

    checkStrength();
}

// ===============================
// Copy Password
// ===============================

copyBtn.addEventListener("click", () => {

    if (passwordInput.value === "") {
        alert("Generate a password first.");
        return;
    }

    navigator.clipboard.writeText(passwordInput.value);

    copyBtn.textContent = "Copied!";

    setTimeout(() => {
        copyBtn.textContent = "Copy";
    }, 1500);

});

// ===============================
// Password Strength
// ===============================

function checkStrength() {

    let score = 0;

    if (uppercase.checked) score++;
    if (lowercase.checked) score++;
    if (numbers.checked) score++;
    if (symbols.checked) score++;

    const length = Number(lengthSlider.value);

    if (length >= 12) score++;
    if (length >= 16) score++;

    if (score <= 2) {

        strengthFill.style.width = "30%";
        strengthFill.style.background = "#ef4444";
        strengthText.textContent = "Weak";

    } else if (score <= 4) {

        strengthFill.style.width = "65%";
        strengthFill.style.background = "#f59e0b";
        strengthText.textContent = "Medium";

    } else {

        strengthFill.style.width = "100%";
        strengthFill.style.background = "#22c55e";
        strengthText.textContent = "Strong";

    }

}

// ===============================
// Generate Password on Page Load
// ===============================

generatePassword();