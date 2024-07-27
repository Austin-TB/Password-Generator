const passwordBox=document.querySelector("#password");
const copyButton=document.querySelector("#copy");
const passLength=document.querySelector("#length");
const wantNumbers=document.querySelector("#numbers");
const wantLetters=document.querySelector("#letters");
const wantMixedCase=document.querySelector("#mixedcase");
const wantPunc=document.querySelector("#punctuation");
const lengthSpan=document.querySelector('span');

passwordBox.value = generatePassword();

//function to generate a random password
function generatePassword() {
    copyButton.innerHTML="Copy Password";

    const length = parseInt(passLength.value);
    const useNumbers = wantNumbers.checked;
    const useLetters = wantLetters.checked;
    const useMixedCase = wantMixedCase.checked;
    const usePunc = wantPunc.checked;

    lengthSpan.innerHTML=length;

    let chars = '';
    let password = '';
    
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const punctuation = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

    if (useLetters) {
        chars += lowercase;
        password += lowercase.charAt(Math.floor(Math.random() * lowercase.length));
    }
    if (useMixedCase) {
        chars += uppercase;
        password += uppercase.charAt(Math.floor(Math.random() * uppercase.length));
    }
    if (useNumbers) {
        chars += numbers;
        password += numbers.charAt(Math.floor(Math.random() * numbers.length));
    }
    if (usePunc) {
        chars += punctuation;
        password += punctuation.charAt(Math.floor(Math.random() * punctuation.length));
    }

    // Fill the rest of the password
    for (let i = password.length; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    // Shuffle the password
    password = shuffleString(password);

    return password;
}

function shuffleString(str) {
    let array = str.split('');
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array.join('');
}

//event listeners to update the password when options change
passLength.addEventListener('change', updatePassword);
wantNumbers.addEventListener('change', updatePassword);
wantLetters.addEventListener('change', updatePassword);
wantMixedCase.addEventListener('change', updatePassword);
wantPunc.addEventListener('change', updatePassword);

function updatePassword() {
    passwordBox.value = generatePassword();
}

copyButton.addEventListener('click', function() {
    navigator.clipboard.writeText(passwordBox.value).then(function() {
        copyButton.innerHTML="Password Copied!";
        console.log('Password copied successfully');
    }).catch(function(err) {
        console.error('Failed to copy password: ', err);
    });
});
