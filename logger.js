if (__flybuk.config.debug) {
    const on_list = [
        'init:before',
        'init',
        'ui:prepare',
        'ui:render',
        'init:after',

        'currency:change',
        'spents:new-receive',
        'spents:new-spent',
        'spents:remove-spent',
        'categories:remove-category',
        'categories:add-category'
    ]
    
    on_list.forEach(event => {
        __flybuk.on(event, () => {
            console.log(`[Logger] Event: ${event} is emitted...`)
        })
    })

    __flybuk.on('plugin:installed', (data) => console.log(`[Logger] Plugin installed. Data: ${data}`))
}
