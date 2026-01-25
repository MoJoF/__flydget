const renderers = {
    'simple': (sel, value) => { document.querySelector(sel).textContent = value },
    'spents': (sel, value) => { /* тут будет рендеринг расходов */ },
    'new-spent-category': (sel, value) => { /* тут будет рендеринг категорий расходов */ },
}

__flybuk.on('ui:render', () => {
    if (!__flybuk.getState().summ) {
        __flybuk.emit('ui:first-run')
    } else {
        __flybuk.emit('ui:main-block')
    }

    __flybuk.emit('init:after')
})

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

__flybuk.on('ui:main-block', () => {
    __flybuk.show('.main-block')

    const d = new Date()
    const year = d.getFullYear()
    const month = d.getMonth() + 1
    renderers['simple']('#month-year', `${month}.${year}`)
    renderers['simple']('#summ-and-currency', `${__flybuk.getState().summ} ${__flybuk.getSettings().currency}`)
    renderers['simple']('#remaining-summ', `${__flybuk.getState().remaining_summ} ${__flybuk.getSettings().currency}`)

    if (!__flybuk.getState().spents) {
        __flybuk.show('.main-block > .block > span.no-spents')
        __flybuk.hide('.main-block > .block > .table_header')
        __flybuk.hide('#spents')
    } else if (__flybuk.getState().spents) {
        __flybuk.hide('.main-block > .block > span.no-events')
        __flybuk.show('.main-block > .block > .table_header')
        __flybuk.show('#spents')
    }
})