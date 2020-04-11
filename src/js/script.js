(function () {
    let NumberLimit = document.querySelectorAll(".num-limit input")
    let NumberLimitErrorValidation = document.querySelectorAll(".num-limit p")
    let NumberDrawn = document.querySelector(".num-drawn input")
    let NumberDrawnValidation = document.querySelector(".num-drawn p")
    let btnDraw = document.querySelector(".btn-draw")
    let result = document.querySelector(".result")
    let numRandom = []
    let number

    btnDraw.addEventListener("click", () => {
        drawNumber(NumberLimit[0].value, NumberLimit[1].value, NumberDrawn.value)
    })

    // Função para sortear os números

    function drawNumber(valueInitial, valueFinal, NumberDrawn) {
        let valueMin = parseFloat(valueInitial)
        let valueMax = parseFloat(valueFinal)
        let numDraw = parseFloat(NumberDrawn)

        result.innerHTML = ""
        NumberDrawnValidation.innerHTML = ""

        NumberLimitErrorValidation.forEach((e, i) => {
            if (validateFields(i) !== undefined) {
                e.innerHTML = validateFields(i)
                return
            }
        })

        if(Number.isNaN(numDraw)){
            NumberDrawnValidation.innerHTML = "Informe quantos números deve ser sorteados."
            return
        }

        if (Number.isNaN(valueMin) || Number.isNaN(valueMax)) {
            return
        }

        if (valueMin > valueMax) {
            NumberLimitErrorValidation[0].innerHTML = "Valor inicial é maior que o valor final"
            return
        }

        if (numDraw > ((valueMax - valueInitial) + 1)) {
            NumberDrawnValidation.innerHTML = "<strong>Obs: </strong> O valor inicial ao valor final é menor que a quantidade de números que deve ser sorteados"
            return
        }

        let min = Math.ceil(valueMin)
        let max = Math.floor(valueMax)

        numRandom = []
        for (let i = 1; i <= numDraw; i++) {
            generateRandomNumber(min, max)
            numRandom.push(number)
        }

        numRandom.forEach((e, i) => {
            result.innerHTML += `<span>${e}</span>`
        })
    }

    // Nesta função é gerado o número aleatório

    function generateRandomNumber(min, max) {
        number = Math.floor(Math.random() * (max - min + 1) + min);
        for (let i = 0; i < numRandom.length; i++) {
            if (numRandom[i] === number) {
                generateRandomNumber(min, max)
            }
        }
    }

    NumberLimit.forEach((e, i) => {
        e.addEventListener("input", () => {
            NumberLimitErrorValidation[i].innerHTML = "";
            if (e.value === "") {
                NumberLimitErrorValidation[i].innerHTML = "Campo vazio! Preencha este campo para prosseguir"
            }
        })
    })

    NumberDrawn.addEventListener("input", () => {
        NumberDrawnValidation.innerHTML = ""
        if (NumberDrawn.value === "") {
            NumberDrawnValidation.innerHTML = "Informe quantos números deve ser sorteados."
        }
    })

    // Função para validarmos os campos
    function validateFields(index) {
        if (NumberLimit[index].value === "") {
            return "Campo vazio! Preencha este campo para prosseguir"
        }
    }
})()