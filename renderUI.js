const removeSpent = id => {
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
}

__flybuk.on('ui:render', () => {
    if (!__flybuk.getState().summ) {
        __flybuk.emit('ui:first-run')
    } else {
        __flybuk.emit('ui:main-block')
    }

    __flybuk.emit('init:after')
})

__flybuk.on('spents:new-receive', (data) => console.log(data))

__flybuk.on('spents:new-spent', (data) => console.log(data))

__flybuk.on('spents:remove-spent', (data) => console.log(data))