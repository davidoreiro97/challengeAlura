// Para el evento onChange del textArea
let inputTextIsValid = false;
let inputText = "";
const regexInput = /^[a-z\s]+$/;
const alertContainer = document.getElementsByClassName(
	"mainContainer__inputs__warning"
);
const testInput = (e) => {
	inputText = e.target.value;
	if (inputText.trim().length > 0) {
		inputTextIsValid = regexInput.test(inputText);
		inputTextIsValid
			? alertContainer[0].classList.remove("alert")
			: alertContainer[0].classList.add("alert");
	} else {
		alertContainer[0].classList.add("alert");
		inputTextIsValid = false;
	}
};
const textArea = document.getElementById("textInput");
textArea.addEventListener("input", (e) => testInput(e));

// Codificacion - Decodificacion.
const acciones = {
	ENCRYPT: "ENCRYPT",
	DECRYPT: "DECRYPT",
};
const codificaciones = {
	a: "ai",
	e: "enter",
	i: "imes",
	o: "ober",
	u: "ufat",
};
const decodificaciones = {
	ai: "a",
	enter: "e",
	imes: "i",
	ober: "o",
	ufat: "u",
};

function encode(letter) {
	switch (letter) {
		case decodificaciones.ai:
			return codificaciones[decodificaciones.ai];
		case decodificaciones.enter:
			return codificaciones[decodificaciones.enter];
		case decodificaciones.imes:
			return codificaciones[decodificaciones.imes];
		case decodificaciones.ober:
			return codificaciones[decodificaciones.ober];
		case decodificaciones.ufat:
			return codificaciones[decodificaciones.ufat];
		default:
			return letter;
	}
}
function decode(inputText) {
	let decodedInputText = inputText.replace(/ai/g, decodificaciones.ai);
	decodedInputText = decodedInputText.replace(/enter/g, decodificaciones.enter);
	decodedInputText = decodedInputText.replace(/imes/g, decodificaciones.imes);
	decodedInputText = decodedInputText.replace(/ober/g, decodificaciones.ober);
	decodedInputText = decodedInputText.replace(/ufat/g, decodificaciones.ufat);
	return decodedInputText;
}

function encryptDecrypt(accion, inputText) {
	let response = "";
	switch (accion) {
		case acciones.ENCRYPT: {
			response = Array.from(inputText).map((letra) => encode(letra));
			response = response.join("");
			break;
		}
		case acciones.DECRYPT: {
			response = decode(inputText);
			break;
		}
	}
	return response.trim();
}

// Para los eventos click de los botones encritar-desencriptar
const $copyButton = document.getElementById("copyButton");
const animation = document.getElementById("animation");
const msg2 = document.getElementById("msg2");
const msg1 = document.getElementById("msg1");
const $respuesta = document.getElementById("respuesta");
const formTextArea = document.getElementById("textAreaForm");
formTextArea.addEventListener("submit", (e) => {
	e.preventDefault();
	let botonPresionado = e.submitter.name;
	let respuesta = "";
	switch (botonPresionado) {
		case "decryptButton": {
			if (inputTextIsValid) {
				respuesta = encryptDecrypt(acciones.DECRYPT, inputText);
			} else {
				alert("Hubo un problema con la desencriptación, revise su texto.");
			}
			break;
		}
		case "encryptButton": {
			if (inputTextIsValid) {
				respuesta = encryptDecrypt(acciones.ENCRYPT, inputText);
			} else {
				alert("Hubo un problema con la encriptación, revise su texto.");
			}
		}
	}
	if (respuesta) {
		animation.classList.add("invisible");
		msg2.classList.add("invisible");
		msg1.classList.add("invisible");
		$respuesta.innerText = respuesta;
		$containerRespuesta.classList.add("containerRespuesta");
		$copyButton.classList.remove("invisible");
	}
});
// Evento copiar
const $containerRespuesta = document.getElementById("containerRespuesta");
$copyButton.addEventListener("click", () => {
	if ("clipboard" in navigator) {
		let texto = $respuesta.innerText;
		navigator.clipboard.writeText(texto).then(
			() => {
				alert("Texto copiado");
			},
			(error) => {
				console.error("Error al copiar el texto:", error);
			}
		);
	} else {
		console.warn("La API Clipboard no está disponible en este navegador.");
	}
});
