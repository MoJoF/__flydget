const removeSpent = (id) => {
    let spents = __flybuk.getState().spents
    spents = spents.filter(spent => spent.id !== id)
    const spentContainer = __flybuk.select('.spent-item[data-id="' + id + "\"]")
    spentContainer.remove()

    if (!spents) {
        __flybuk.setState({ spents, remaining_summ: __flybuk.getState().summ })
        return true
    }
    const spentSumm = __flybuk.getState().spents.reduce((accumulator, currentValue) => { return accumulator += currentValue.summ }, 0)
    const remaining_summ = Number(__flybuk.getState().summ) - spentSumm

    __flybuk.setState({ spents, remaining_summ })

    __flybuk.emit('spents:remove-spent', { id })

    return true
}

const removeCategory = (title) => {
    let categories = __flybuk.getSettings().categories
    categories = categories.filter(cat => cat !== title)
    __flybuk.emit("categories:remove-category", title)
    __flybuk.setSettings({ categories })
    __flybuk.select(".cat-item", true).forEach(el => {
        if (el.querySelector('span').textContent === title) {
            el.remove()
        }
    })
}

const renderers = {
    'simple': (sel, value) => { document.querySelector(sel).textContent = value },
    'spents': (sel, value) => {
        const container = __flybuk.select(sel)
        container.innerHTML = ''
        value.forEach(spent => {
            const spentItem = document.createElement("tr")
            spentItem.className = "spent-item"
            spentItem.setAttribute("data-id", spent.id)

            // { title, summ, category, time }

            const titleEl = document.createElement('td')
            titleEl.textContent = spent.title || '-'

            const summEl = document.createElement('td')
            summEl.textContent = Number(spent.summ) + " " + __flybuk.getSettings().currency

            const categoryEl = document.createElement('td')
            categoryEl.textContent = spent.category

            const timeEl = document.createElement('td')
            timeEl.textContent = spent.time

            const btnContainer = document.createElement('td')
            const btnDel = document.createElement('button')
            btnDel.className = "del-spent"
            btnDel.textContent = "Удалить"
            btnDel.onclick = () => {
                if (removeSpent(spent.id)) __flybuk.emit('ui:main-block')
            }
            btnContainer.appendChild(btnDel)

            spentItem.appendChild(titleEl)
            spentItem.appendChild(summEl)
            spentItem.appendChild(categoryEl)
            spentItem.appendChild(timeEl)
            spentItem.appendChild(btnContainer)

            container.appendChild(spentItem)
        })
    },
    'add-spent-categories': (sel, cats) => {
        const selectCont = __flybuk.select(sel)
        cats.forEach(cat => {
            const categoryEl = document.createElement('option')
            categoryEl.value = cat
            categoryEl.textContent = cat
            selectCont.appendChild(categoryEl)
        })
    },
    'settings-categories': (sel, cats) => {
        const categoriesCont = __flybuk.select(sel)
        cats.forEach((cat) => {
            const catEl = document.createElement('div')
            catEl.className = "cat-item"

            const catTitle = document.createElement('span')
            catTitle.textContent = cat

            const catDelete = document.createElement('button')
            catDelete.className = "del-cat"
            catDelete.textContent = "Удалить"
            catDelete.onclick = () => {
                removeCategory(cat)
            }

            catEl.appendChild(catTitle)
            catEl.appendChild(catDelete)
            categoriesCont.appendChild(catEl)
        })
    },
    'settings-currencies': (sel, currencies) => {
        const currenciesCont = __flybuk.select(sel)
        currencies.forEach(c => {
            const currencyOption = document.createElement('option')
            currencyOption.value = c
            currencyOption.textContent = c
            currenciesCont.appendChild(currencyOption)
        })
    },
    'all-plugins': (sel, plugins) => {
        const pluginsCont = __flybuk.select(sel)
        pluginsCont.innerHTML = ''

        plugins?.forEach(plugin => {
            const pluginItemEl = document.createElement('div')
            pluginItemEl.className = "plugin-item"

            const pluginLogoEl = document.createElement('img')
            pluginLogoEl.src = plugin?.icon || __flybuk.config.path + "images/no-photo.png"

            const pluginTextBlock = document.createElement('div')
            pluginTextBlock.className = "plugin-text-block"

            const pluginTitle = document.createElement('span')
            pluginTitle.className = "plugin-title"
            pluginTitle.textContent = plugin.title

            const pluginDescription = document.createElement('span')
            pluginDescription.className = "plugin-desc"
            pluginDescription.textContent = plugin.description

            const installPluginButton = document.createElement('button')
            installPluginButton.className = "plugin-install"
            installPluginButton.textContent = "Установить"
            installPluginButton.onclick = () => __flybuk.installPluginFromCatalog({
                author: plugin.author,
                description: plugin.description,
                enabled: false,
                file: plugin.file,
                id: plugin.id,
                title: plugin.title,
                version: plugin.version
            })

            pluginTextBlock.appendChild(pluginTitle)
            pluginTextBlock.appendChild(pluginDescription)
            pluginTextBlock.appendChild(installPluginButton)

            pluginItemEl.appendChild(pluginLogoEl)
            pluginItemEl.appendChild(pluginTextBlock)
            pluginsCont.appendChild(pluginItemEl)
        })
    },
    'installed-plugins': (sel, plugins) => {
        const pluginsCont = __flybuk.select(sel)
        pluginsCont.innerHTML = ''

        plugins?.forEach(plugin => {
            const pluginItemEl = document.createElement('div')
            pluginItemEl.className = "plugin-item"

            const pluginLogoEl = document.createElement('img')
            pluginLogoEl.src = plugin?.icon || __flybuk.config.path + "images/no-photo.png"

            const pluginTextBlock = document.createElement('div')
            pluginTextBlock.className = "plugin-text-block"

            const pluginTitle = document.createElement('span')
            pluginTitle.className = "plugin-title"
            pluginTitle.textContent = plugin.title

            const pluginDescription = document.createElement('span')
            pluginDescription.className = "plugin-desc"
            pluginDescription.textContent = plugin.description

            pluginTextBlock.appendChild(pluginTitle)
            pluginTextBlock.appendChild(pluginDescription)

            if (!plugin.enabled) {
                const activatePluginButton = document.createElement('button')
                activatePluginButton.className = "plugin-activate"
                activatePluginButton.textContent = "Активировать"
                activatePluginButton.onclick = () => __flybuk.activatePlugin(plugin)
                pluginTextBlock.appendChild(activatePluginButton)

                const deletePluginButton = document.createElement('button')
                deletePluginButton.className = "plugin-delete"
                deletePluginButton.textContent = "Удалить"
                deletePluginButton.onclick = () => __flybuk.deletePlugin(plugin)
                pluginTextBlock.appendChild(deletePluginButton) 
            } else if (plugin.enabled) {
                const deactivatePluginButton = document.createElement('button')
                deactivatePluginButton.className = "plugin-deactivate"
                deactivatePluginButton.textContent = "Деактивировать"
                deactivatePluginButton.onclick = () => __flybuk.deactivatePlugin(plugin)
                pluginTextBlock.appendChild(deactivatePluginButton)
            }

            pluginItemEl.appendChild(pluginLogoEl)
            pluginItemEl.appendChild(pluginTextBlock)
            pluginsCont.appendChild(pluginItemEl)
        })
    },
}

__flybuk.on('ui:render', () => {
    if (!__flybuk.getState().summ) {
        __flybuk.emit('ui:first-run')
    } else {
        __flybuk.emit('ui:main-block')
    }

    __flybuk.emit('init:after')
})