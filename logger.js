const on_list = [
    'init',
    'ui:prepare',
    'ui:render',
    'init:after'
]

on_list.forEach(event => {
    __flybuk.on(event, () => {
        console.log(`[Logger] Event: ${event} is emitted...`)
    })
})