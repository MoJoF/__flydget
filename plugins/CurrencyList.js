(function () {
    const meta = {
        id: 'currency.list',
        title: 'Набор валют',
        version: '0.5',
        author: 'flybuk',
        file: 'plugins/CurrencyList.js'
    }

    function install(api) {
        api.when('init', () => {
            console.log('Плагин активирован')
        })
    }
})()