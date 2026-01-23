const renderers = {
    'simple': (sel, value) => { document.querySelector(sel).textContent = value },
    'spents': (sel, value) => { /* тут будет рендеринг расходов */ },
    'new-spent-category': (sel, value) => { /* тут будет рендеринг категорий расходов */ },
}


__flybuk.on('init', function() {
    const d = new Date()
    const year = d.getFullYear()
    const month = d.getMonth() + 1
    renderers['simple']('#month-year', `${month}.${year}`)
    renderers['simple']('#summ-and-currency', `${__flybuk.State.summ} ${__flybuk.Settings.currency}`)
})
