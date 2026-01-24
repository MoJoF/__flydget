const renderers = {
    'simple': (sel, value) => { document.querySelector(sel).textContent = value },
    'spents': (sel, value) => { /* тут будет рендеринг расходов */ },
    'new-spent-category': (sel, value) => { /* тут будет рендеринг категорий расходов */ },
}


__flybuk.on('ui:render', () => {
    if (!__flybuk.getState().summ) {
        document.querySelector('.main-block').style.display = "none"
        document.querySelector('.first-run-block').style.display = "flex"
    } else {
        const d = new Date()
        const year = d.getFullYear()
        const month = d.getMonth() + 1
        renderers['simple']('#month-year', `${month}.${year}`)
        renderers['simple']('#summ-and-currency', `${__flybuk.State.summ} ${__flybuk.Settings.currency}`)
    }

    __flybuk.emit('init:after')
})
