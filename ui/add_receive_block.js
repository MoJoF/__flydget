__flybuk.on('ui:add-receive-block', () => {
    __flybuk.show('.add-receive-block')

    const inputEl = __flybuk.select(".add-receive-block > div > input")
    inputEl.oninput = (e) => {
        const value = e.target.value
        inputEl.value = value.replace(/[^0-9]/g, '')
    }
})