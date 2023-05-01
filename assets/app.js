
const form = document.querySelector("form"),
	nameInput = document.querySelector("#name"),
	emailInput = document.querySelector("#email"),
	passwordInput = document.querySelector("#password");

const modal = document.querySelector("#success-modal");
const openModal = document.querySelector(".open-modal");
const closeModal = document.querySelector(".close-btn");
const mobileInput = document.querySelector("#phone")
const passwordRepeat = document.querySelector("#password-rpt") 

function checkEmail() {
	// console.log(emailInput.validity);
	// if (emailInput.validity.valueMissing) {
	// 	emailInput.parentElement.querySelector(".message").innerText =
	// 		"email is required";
	// } else if (emailInput.validity.typeMismatch) {
	// 	emailInput.parentElement.querySelector(".message").innerText =
	// 		"not correct format";
	// } else {
	// 	emailInput.parentElement.querySelector(".message").innerText = "";
	// }

	if (emailInput.validity.valueMissing) {
		emailInput.parentElement.querySelector(".message").innerText =
			"email is required";
		return false;
	} else if (!/@gmail.com$/.test(emailInput.value)) {
		emailInput.parentElement.querySelector(".message").innerText =
			"email must be gmail";
		return false;
	} else {
		emailInput.parentElement.querySelector(".message").innerText = "";
		return true;
	}
}

function checkMobile(){
    const mobileValue = mobileInput.value;
    if (mobileInput.validity.valueMissing) {
		mobileInput.parentElement.querySelector(".message").innerText =
			"mobile number is required";
    }
    else if (!/[0-9]/.test(mobileInput.value)) {
		mobileInput.parentElement.querySelector(".message").innerText =
			"not correct format";
		return false;
	} 
    else if (mobileValue.length < 9) {
		mobileInput.parentElement.querySelector(".message").innerText =
			"number number is too short";
		return false;
	}
    else if (mobileValue.length > 9) {
		mobileInput.parentElement.querySelector(".message").innerText =
			"number number is too long";
		return false;
	}
    else {
		mobileInput.parentElement.querySelector(".message").innerText = "";
		return true;
	}
}

function checkPassword() {
    const passValue = passwordInput.value;
    const repeatPassValue = passwordRepeat.value

	if (passValue.length < 5) {
		passwordInput.parentElement.querySelector(".message").innerText =
			"weak password";
		passwordInput.classList.remove("normal");
		passwordInput.classList.remove("strong");
		passwordInput.classList.add("weak");
		return false;
	} else if (passValue.length >= 5 && passValue.length < 8) {
		passwordInput.parentElement.querySelector(".message").innerText =
			"normal password";
		passwordInput.classList.remove("weak");
		passwordInput.classList.remove("strong");
		passwordInput.classList.add("normal");
		return false;
	} else {
		passwordInput.parentElement.querySelector(".message").innerText = "";
		passwordInput.classList.remove("weak");
		passwordInput.classList.remove("normal");
		passwordInput.classList.add("strong");
		// return passValue;
	}
    
    if (passValue !== repeatPassValue) {
        passwordRepeat.parentElement.querySelector(".message").innerText = "Passwords do not match";
        passwordRepeat.classList.remove("strong");
        passwordRepeat.classList.add("weak");
        return false;
    } else {
        passwordRepeat.parentElement.querySelector(".message").innerText = "";
        passwordRepeat.classList.remove("weak");;
        passwordRepeat.classList.add("strong");
        return passValue;
    }
}

emailInput.addEventListener("input", checkEmail);
passwordInput.addEventListener("input", checkPassword);
mobileInput.addEventListener("input", checkMobile);
passwordRepeat.addEventListener("input", checkPassword)

form.addEventListener("submit", (e) => {
	e.preventDefault();
	// validations

	const isEmailValid = checkEmail();
	const isPasswordValid = checkPassword();
    const isMobileValid = checkMobile();
    
	console.log(isEmailValid, isPasswordValid);
	if (isEmailValid && isPasswordValid) {
		console.log("submit form");
		form.submit()
		showModal("#success-modal");
		form.reset();
	}
});

openModal.addEventListener("click", (e) => {
	modal.classList.add("active");
});

closeModal.addEventListener("click", (e) => {
	modal.classList.remove("active");
});

function showModal(selector) {
	const modal = document.querySelector(selector);
	if (modal) {
		const closeBtn = modal.querySelector(".close-btn");

		modal.classList.add("active");
		closeBtn.addEventListener("click", (e) => {
			modal.classList.remove("active");
		});
		modal.addEventListener("click", (e) => {
			// console.log(e.target);
			if (e.target.classList.contains("modal")) {
				modal.classList.remove("active");
			}
		});
	}
}

openModal.addEventListener("click", (e) => {
	showModal("#error-modal");
	// console.log("open modal");
});