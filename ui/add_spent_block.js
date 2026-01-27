__flybuk.on('ui:add-spent-block', () => {
    function spentSummValidate(v) {
        const value = Number(v)
        if (!value) {
            __flybuk.select('.new-spent-block > div > span.error').textContent = "Сумма не может быть пустой"
            __flybuk.show('.new-spent-block > div > span.error')
            return false
        }
        if (value > Number(__flybuk.getState().remaining_summ)) {
            __flybuk.select('.new-spent-block > div > span.error').textContent = "Сумма расхода не может быть больше оставшейся суммы на балансе. Пожалуйста, добавьте доход."
            __flybuk.show('.new-spent-block > div > span.error')
            return false

        }
        __flybuk.hide('.new-spent-block > div > span.error')
        return true
    }

    __flybuk.show('.new-spent-block')
    // Отрисовка категорий в select
    renderers['add-spent-categories']('select#add-spent-category', __flybuk.getSettings().categories)

    const addSpentInput = __flybuk.select('#new-spent-summ')
    addSpentInput.oninput = (e) => {
        const value = e.target.value
        addSpentInput.value = value.replace(/[^0-9]/g, '')
    }
    addSpentInput.onkeyup = (e) => {
        if (e.key === 'Enter') {
            const result = spentSummValidate(addSpentInput.value)
            if (result) {
                let spent = {}
                const now = new Date()
                spent.id = __flybuk.getState()?.spents?.length || 0
                spent.summ = Number(addSpentInput.value)
                spent.title = __flybuk.select('input#add-spent-desc').value
                spent.category = __flybuk.select('select#add-spent-category').value
                spent.time = now.toLocaleString()

                __flybuk.emit('spents:new-spent', spent)

                let spents = __flybuk.getState().spents || []
                spents = [...spents, spent]

                const summ = Number(__flybuk.getState().summ)
                let spentsTotalSumm = 0
                if (__flybuk.getState().spents) {
                    spentsTotalSumm = __flybuk.getState().spents.reduce((accumulator, currentValue) => { return accumulator += currentValue.summ }, 0)
                }
                const remaining_summ = summ - spentsTotalSumm

                addSpentInput.value = ""
                addSpentDesc.value = ""

                __flybuk.setState({ spents, remaining_summ })

                __flybuk.hide('.new-spent-block')
                __flybuk.emit('ui:main-block')
            }
        }
    }

    const addSpentDesc = __flybuk.select('input#add-spent-desc')
    addSpentDesc.onkeyup = (e) => {
        if (e.key === 'Enter') {
            const result = spentSummValidate(addSpentInput.value)
            if (result) {
                let spent = {}
                const now = new Date()
                spent.id = __flybuk.getState()?.spents?.length || 0
                spent.summ = Number(addSpentInput.value)
                spent.title = __flybuk.select('input#add-spent-desc').value
                spent.category = __flybuk.select('select#add-spent-category').value
                spent.time = now.toLocaleString()

                __flybuk.emit('spents:new-spent', spent)

                let spents = __flybuk.getState().spents || []
                spents = [...spents, spent]

                const summ = Number(__flybuk.getState().summ)
                let spentsTotalSumm = 0
                if (__flybuk.getState().spents) {
                    spentsTotalSumm = __flybuk.getState().spents.reduce((accumulator, currentValue) => { return accumulator += currentValue.summ }, 0)
                }
                const remaining_summ = summ - spentsTotalSumm

                addSpentInput.value = ""
                addSpentDesc.value = ""

                __flybuk.setState({ spents, remaining_summ })

                __flybuk.hide('.new-spent-block')
                __flybuk.emit('ui:main-block')
            }
        }
    }

    const addSpentButton = __flybuk.select('button#add-spent-button')
    addSpentButton.onclick = () => {
        const result = spentSummValidate(addSpentInput.value)
        if (result) {
            let spent = {}
            const now = new Date()
            spent.id = __flybuk.getState()?.spents?.length || 0
            spent.summ = Number(addSpentInput.value)
            spent.title = __flybuk.select('input#add-spent-desc').value
            spent.category = __flybuk.select('select#add-spent-category').value
            spent.time = now.toLocaleString()

            __flybuk.emit('spents:new-spent', spent)

            let spents = __flybuk.getState().spents || []
            spents = [...spents, spent]

            const summ = Number(__flybuk.getState().summ)
            let spentsTotalSumm = 0
            if (__flybuk.getState().spents) {
                spentsTotalSumm = __flybuk.getState().spents.reduce((accumulator, currentValue) => { return accumulator += currentValue.summ }, 0)
            }
            const remaining_summ = summ - spentsTotalSumm

            addSpentInput.value = ""
            addSpentDesc.value = ""

            __flybuk.setState({ spents, remaining_summ })

            __flybuk.hide('.new-spent-block')
            __flybuk.emit('ui:main-block')
        }
    }
})