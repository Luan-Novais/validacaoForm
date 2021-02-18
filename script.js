const fields = document.querySelectorAll("[required]"); // peguei todos os inputs


function validateField(field) {

    function verifyErrors() {

        let foundError = false;

        for(let error in field.validity) {
            if (field.validity[error] && !field.validity.valid) {
                foundError = error
            }
        } // Para cada campo do evento target.validity , vc vai verificar os campos direferentes de "customError" e 
        return foundError
    
    }

    function customMessage(typeError){
        const messages = {
            text: {
                valueMissing: "por favor, preencha este campo"
            },
            email: {
                valueMissing: "Email é obrigatorio",
                typeMismatch: "por favor, preencha um email válido"
            }
        }

        return messages[field.type][typeError]
    }

    function setCustomMessage(message) {
        const spanError = field.parentNode.querySelector('span.error')


        if(message) {
            spanError.classList.add('active');
            spanError.innerHTML = message
        } else {
            spanError.classList.remove("active");
            spanError.innerHTML = ""
        }

    }

    return function() {
        const error = verifyErrors()

        if(error) {
            const message = customMessage(error)
            field.style.borderColor = "red"
            setCustomMessage(message)
        } else {
            field.style.borderColor = "green"
            setCustomMessage()
        }
    }

}


function customValidation(event) { 
    const field = event.target  
    const validation = validateField(field)

    validation()
}


for( field of fields ){
    field.addEventListener("invalid", event => {
        event.preventDefault()
        customValidation(event)
    })
    field.addEventListener("blur", customValidation)
} // adc um evento de escuta , "invalid" e chamo a minha função como segundo parametro 


document.querySelector('form').addEventListener("submit", event => {
    console.log("enviar o form");
    event.preventDefault();
})

// não deixo a pagina da um reload 