(function () {
    const meta = {
        id: 'currency.list',
        title: 'Набор валют',
        version: '0.5',
        author: 'flybuk',
        file: 'plugins/CurrencyList.js'
    }

    let additionalCurrencies = ["AUD", "AZN", "RUP", "AED", "CNY", "TRY"]

    function activate(api) {
        api.when('init', () => {
            let currencyList = api.getSettings().currencies
            if (currencyList.length === 3) {
                currencyList = [...currencyList, ...additionalCurrencies]
                api.setSettings({ currencies: currencyList })
            }
        })
    }

    function deactivate(api) {
        let currencyList = api.getSettings().currencies.filter(cur => !additionalCurrencies.includes(cur))
        api.setSettings({ currencies: currencyList })
    }

    __flybuk.registerPlugin({ meta, activate, deactivate })
})()