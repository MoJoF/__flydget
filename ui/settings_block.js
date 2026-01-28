__flybuk.on('ui:settings-block', () => {
    __flybuk.show('.settings-block')
    renderers['settings-categories']('#categories-container', __flybuk.getSettings().categories)
    renderers['settings-currencies']('select#settings-currency', __flybuk.getSettings().currencies)

    // При загрузке страницы валюта должна быть такая же, как в локалке
    const currencySelect = __flybuk.select('select#settings-currency')
    currencySelect.value = __flybuk.getSettings().currency
    
    // Старая валюта. Используется при смене валюты
    const oldCurrency = currencySelect.value
    
    __flybuk.on('currency:change', (data) => __flybuk.setSettings({ currency: data.newCurrency }))

    // При смене валюты, её смена в настройках
    currencySelect.onchange = (e) => {
        const newCurrency = e.target.value
        __flybuk.emit('currency:change', { oldCurrency, newCurrency })
    }

    // Нажатие кнопки "Назад"
    __flybuk.select('.settings-block > div > .buttons-row > .back-to-main').onclick = () => {
        __flybuk.select('#categories-container').innerHTML = ""
        __flybuk.select('select#settings-currency').innerHTML = ""
        __flybuk.hide('.settings-block')
        __flybuk.emit('ui:main-block')
    }

    // Нажатие кнопки "Плагины"
    __flybuk.select('.settings-block > div > .buttons-row > button.to-plugins').onclick = () => {
        __flybuk.hide('.settings-block')
        __flybuk.emit('ui:plugins-block')
    }

    // Проверка текста категории. Если текст пустой, return false
    const validateCategory = (title) => {
        if (!title) {
            __flybuk.show('.settings-block > div > .block > .row > span.error')
            return false
        }
        return true
    }

    // Добавление категории и перерендер
    __flybuk.on('categories:add-category', () => {
        __flybuk.select('#categories-container').innerHTML = ""
        renderers['settings-categories']('#categories-container', __flybuk.getSettings().categories)
    })

    // Строка ввода новой категории
    const inputCreateCategory = __flybuk.select('.settings-block > div > .block > .row > div > input#create-category')
    inputCreateCategory.onkeyup = (e) => {
        if (e.key === "Enter") {
            const value = e.target.value
            if (validateCategory(value)) {
                let categories = __flybuk.getSettings().categories
                categories = [...categories, value]
                __flybuk.setSettings({ categories })
                inputCreateCategory.value = ""

                __flybuk.emit('categories:add-category', { category: value })
            }
        }
    }

    // Клик по кнопке для добавления категории
    __flybuk.select('.settings-block > div > .block > .row > div > button').onclick = () => {
        const value = inputCreateCategory.value
        if (validateCategory(value)) {
            let categories = __flybuk.getSettings().categories
            categories = [...categories, value]
            __flybuk.setSettings({ categories })
            inputCreateCategory.value = ''

            __flybuk.emit('categories:add-category', { category: value })
        }
    }
})