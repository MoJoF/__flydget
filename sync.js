__flybuk.on('state:changed', (state) => localforage.setItem('state', state))
__flybuk.on('settings:changed', (settings) => localforage.setItem('settings', settings))