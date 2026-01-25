__flybuk.on('ui:main-block', () => {
    __flybuk.show('.main-block')

    const d = new Date()
    const year = d.getFullYear()
    const month = d.getMonth() + 1
    renderers['simple']('#month-year', `${month}.${year}`)
    renderers['simple']('#summ-and-currency', `${__flybuk.getState().summ} ${__flybuk.getSettings().currency}`)

    if (__flybuk.getState().spents) {
        const spentSumm = __flybuk.getState().spents.reduce((accumulator, currentValue) => { return accumulator += currentValue }, 0)
        __flybuk.setState({ remaining_summ: spentSumm })
    } else {
        __flybuk.setState({ remaining_summ: __flybuk.getState().summ })
    }

    renderers['simple']('#remaining-summ', `${__flybuk.getState().remaining_summ} ${__flybuk.getSettings().currency}`)

    if (!__flybuk.getState().spents) {
        __flybuk.show('.main-block > .block > span.no-spents')
        __flybuk.hide('.main-block > .block > .table_header')
        __flybuk.hide('#spents')
    } else if (__flybuk.getState().spents) {
        __flybuk.hide('.main-block > .block > span.no-events')
        __flybuk.show('.main-block > .block > .table_header')
        __flybuk.show('#spents')
        renderers['spents']('#spents', __flybuk.getState().spents)
    }

    __flybuk.select('.main-block > .row > .block > .block__subblock > button.add-receive').onclick = () => {
        __flybuk.emit('ui:new-receive-block')
    }
})