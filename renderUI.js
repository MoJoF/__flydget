const renderers = {
    'simple': (sel, value) => { document.querySelector(sel).textContent = value },
    'spents': (sel, value) => {
        const container = __flybuk.select(sel)
        container.innerHTML = ''
        value.forEach(spent => {
            const spentItem = document.createElement("div")
            spentItem.className = "spent-item"
            
            // { id, title, summ, category, time }
            const idEl = document.createElement('span')
            idEl.textContent = spent.id

            const titleEl = document.createElement('span')
            titleEl.textContent = spent.title

            const summEl = document.createElement('span')
            summEl.textContent = spent.summ

            const categoryEl = document.createElement('span')
            categoryEl.textContent = spent.category

            const timeEl = document.createElement('span')
            timeEl.textContent = spent.time

            const btnDel = document.createElement('button')
            btnDel.textContent = "Удалить"
            btnDel.setAttribute("data-id", spent.id)

            spentItem.appendChild(idEl)
            spentItem.appendChild(titleEl)
            spentItem.appendChild(summEl)
            spentItem.appendChild(categoryEl)
            spentItem.appendChild(timeEl)
            container.appendChild(spentItem)
        })
    },
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