__flybuk.on('ui:add-receive-block', () => {
    __flybuk.show('.add-receive-block')

    // Проверка введённой суммы
    function validate(v) {
        const value = Number(v)
        if (!value) {
            __flybuk.show('.add-receive-block > div > span.error')
            return false
        }
        __flybuk.hide('.add-receive-block > div > span.error')
        return true
    }

    const addReceiveInput = __flybuk.select(".add-receive-block > div > input")
    addReceiveInput.focus()
    addReceiveInput.oninput = (e) => {
        const value = e.target.value
        addReceiveInput.value = value.replace(/[^0-9]/g, '')
    }
    addReceiveInput.onkeyup = (e) => {
        if (e.key === "Enter") {
            const result = validate(addReceiveInput.value)
            if (result) {
                const addReceiveSumm = Number(addReceiveInput.value)
                __flybuk.emit('spents:new-receive', { receive: addReceiveSumm })
                const newSumm = Number(__flybuk.getState().summ) + addReceiveSumm
                const newRemainingSumm = Number(__flybuk.getState().remaining_summ) + addReceiveSumm
                __flybuk.setState({ summ: newSumm, remaining_summ: newRemainingSumm })
                addReceiveInput.value = ''
                __flybuk.emit('ui:main-block')
            }
        }
    }

    const addReceiveBtn = __flybuk.select(".add-receive-block > div > button")
    addReceiveBtn.onclick = () => {
        const result = validate(addReceiveInput.value)
        if (result) {
            const addReceiveSumm = Number(addReceiveInput.value)
            __flybuk.emit('spents:new-receive', { receive: addReceiveSumm })
            const newSumm = Number(__flybuk.getState().summ) + addReceiveSumm
            const newRemainingSumm = Number(__flybuk.getState().remaining_summ) + addReceiveSumm
            __flybuk.setState({ summ: newSumm, remaining_summ: newRemainingSumm })
            addReceiveInput.value = ''
            __flybuk.hide('.add-receive-block')
            __flybuk.emit('ui:main-block')
        }
    }
})