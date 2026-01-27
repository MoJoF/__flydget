(function () {
    const plugin = {
        meta: {
            id: 'currency.list',
            title: 'Набор валют',
            version: '0.5',
            description: 'Расширяет количество валют',
            author: 'flybuk',
            file: 'plugins/CurrencyList.js'
        },
        install(api) {
            api.when('init', () => {
                console.log('[CurrencyList] activate')
            })
        }
    }

    if (__flybuk) {
        __flybuk.use(plugin)
    } else {
        console.log('[ERROR] Объект __flybuk не найден.')
    }
})()