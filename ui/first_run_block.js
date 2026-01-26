__flybuk.on('ui:first-run', () => { // Настройка модуля первичного запуска приложения
    __flybuk.hide('.main-block')
    __flybuk.show('.first-run-block')

    // Проверка введённой суммы
    function firstRunValidate(v) {
        const value = Number(v)
        if (!value) {
            __flybuk.show('.first-run-block > .block > span.error')
            return false
        }
        __flybuk.hide('.first-run-block > .block > span.error')
        return true
    }

    // Загрузка списка валют
    const selectCurrency = __flybuk.select(".first-run-block > .block > .row > select")
    __flybuk.data.currencies.forEach(currency => {
        const optionEl = document.createElement('option')
        optionEl.value = currency
        optionEl.textContent = currency
        selectCurrency.appendChild(optionEl)
    })

    // Панель для ввода первоначальной суммы
    const inputEl = __flybuk.select(".first-run-block > .block > input")
    inputEl.focus()
    inputEl.oninput = (e) => {
        const value = e.target.value
        inputEl.value = value.replace(/[^0-9]/g, '')
    }
    inputEl.onkeyup = (e) => {
        if (e.key === "Enter") {
            const result = firstRunValidate(inputEl.value)
            if (result) {
                const currentCurrency = selectCurrency.value
                __flybuk.setState({ summ: inputEl.value, remaining_summ: inputEl.value })
                __flybuk.setSettings({ currency: currentCurrency })
                __flybuk.hide('.first-run-block')

                __flybuk.emit('ui:main-block')
            }
        }
    }

    // Нажатие кнопки "подтвердить"
    const submitBtn = __flybuk.select(".first-run-block > .block > button")
    submitBtn.onclick = () => {
        const result = firstRunValidate(inputEl.value)
        if (result) {
            const currentCurrency = selectCurrency.value
            __flybuk.setState({ summ: inputEl.value, remaining_summ: inputEl.value })
            __flybuk.setSettings({ currency: currentCurrency })
            __flybuk.hide('.first-run-block')

            __flybuk.emit('ui:main-block')
        }
    }
})