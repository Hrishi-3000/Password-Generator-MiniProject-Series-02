document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const passwordEl = document.getElementById('password');
    const copyBtn = document.getElementById('copy-btn');
    const lengthEl = document.getElementById('length');
    const lengthValue = document.getElementById('length-value');
    const uppercaseEl = document.getElementById('uppercase');
    const lowercaseEl = document.getElementById('lowercase');
    const numbersEl = document.getElementById('numbers');
    const symbolsEl = document.getElementById('symbols');
    const generateBtn = document.getElementById('generate-btn');
    const strengthBar = document.getElementById('strength-bar');
    const notification = document.getElementById('notification');

    // Character sets
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+~`|}{[]\\:;?><,./-=';

    // Update length display
    lengthEl.addEventListener('input', () => {
        lengthValue.textContent = lengthEl.value;
    });

    // Generate password on button click
    generateBtn.addEventListener('click', () => {
        const length = +lengthEl.value;
        const hasUpper = uppercaseEl.checked;
        const hasLower = lowercaseEl.checked;
        const hasNumber = numbersEl.checked;
        const hasSymbol = symbolsEl.checked;

        const password = generatePassword(length, hasUpper, hasLower, hasNumber, hasSymbol);
        passwordEl.value = password;
        
        // Update strength meter
        updateStrengthMeter(password);
        
        // Add animation to generate button
        generateBtn.innerHTML = '<i class="fas fa-check"></i> Generated!';
        setTimeout(() => {
            generateBtn.innerHTML = '<i class="fas fa-sync-alt"></i> Generate Password';
        }, 2000);
    });

    // Copy password to clipboard
    copyBtn.addEventListener('click', () => {
        if (!passwordEl.value) return;

        navigator.clipboard.writeText(passwordEl.value).then(() => {
            // Show notification
            notification.classList.add('show');
            setTimeout(() => {
                notification.classList.remove('show');
            }, 2000);
            
            // Change copy button icon temporarily
            copyBtn.innerHTML = '<i class="fas fa-check"></i>';
            setTimeout(() => {
                copyBtn.innerHTML = '<i class="far fa-copy"></i>';
            }, 2000);
        });
    });

    // Generate password function
    function generatePassword(length, upper, lower, number, symbol) {
        let generatedPassword = '';
        let allowedChars = '';

        if (!upper && !lower && !number && !symbol) {
            return 'Please select at least one option';
        }

        if (upper) allowedChars += uppercaseChars;
        if (lower) allowedChars += lowercaseChars;
        if (number) allowedChars += numberChars;
        if (symbol) allowedChars += symbolChars;

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * allowedChars.length);
            generatedPassword += allowedChars[randomIndex];
        }

        return generatedPassword;
    }

    // Password strength meter
    function updateStrengthMeter(password) {
        const length = password.length;
        let strength = 0;
        
        // Criteria checks
        const hasUpper = /[A-Z]/.test(password);
        const hasLower = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSymbol = /[^A-Za-z0-9]/.test(password);
        
        // Length contributes up to 50% of strength
        strength += Math.min(length / 32 * 50, 50);
        
        // Character variety contributes the other 50%
        const varietyScore = (hasUpper ? 10 : 0) + (hasLower ? 10 : 0) + 
                          (hasNumber ? 15 : 0) + (hasSymbol ? 15 : 0);
        strength += varietyScore;
        
        // Update the strength bar
        strength = Math.min(strength, 100); // Cap at 100%
        strengthBar.style.width = `${strength}%`;
        
        // Update color based on strength
        if (strength < 30) {
            strengthBar.style.backgroundColor = '#ff4d4d'; // Red
        } else if (strength < 60) {
            strengthBar.style.backgroundColor = '#ffa64d'; // Orange
        } else if (strength < 80) {
            strengthBar.style.backgroundColor = '#70db70'; // Light green
        } else {
            strengthBar.style.backgroundColor = '#33cc33'; // Green
        }
    }

    // Generate initial password on page load
    generateBtn.click();
});
