__flybuk.on('ui:main-block', () => {
    __flybuk.show('.main-block')

    const d = new Date()
    const year = d.getFullYear()
    const month = d.getMonth() + 1
    renderers['simple']('#month-year', `${month}.${year}`)
    renderers['simple']('#summ-and-currency', `${__flybuk.getState().summ} ${__flybuk.getSettings().currency}`)

    if (__flybuk.getState().spents) {
        const spentSumm = __flybuk.getState().spents.reduce((accumulator, currentValue) => { return accumulator += currentValue.summ }, 0)
        const remaining_summ = Number(__flybuk.getState().summ) - spentSumm
        __flybuk.setState({ remaining_summ: remaining_summ })
    } else {
        __flybuk.setState({ remaining_summ: __flybuk.getState().summ })
    }

    renderers['simple']('#remaining-summ', `${__flybuk.getState().remaining_summ} ${__flybuk.getSettings().currency}`)

    if (!__flybuk.getState().spents.length) {
        __flybuk.show('.main-block > .block > span.no-spents', 'block')
        __flybuk.hide('table')
    } else {
        __flybuk.hide('.main-block > .block > span.no-spents')
        __flybuk.show('table', 'table')
        renderers['spents']('#spents', __flybuk.getState().spents)
    }

    __flybuk.select('.main-block > .row > .block > .block__subblock > button.add-receive').onclick = () => {
        __flybuk.hide('.main-block')
        __flybuk.emit('ui:add-receive-block')
    }

    __flybuk.select('.main-block > .block > button.add_spent').onclick = () => {
        __flybuk.hide('.main-block')
        __flybuk.emit('ui:add-spent-block')
    }
})