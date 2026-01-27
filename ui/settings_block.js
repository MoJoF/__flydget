__flybuk.on('ui:settings-block', () => {
    __flybuk.show('.settings-block')
    renderers['settings-categories']('#categories-container', __flybuk.getSettings().categories)
    renderers['settings-currencies']('select#settings-currency', __flybuk.getSettings().currencies)

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