__flybuk.on('state:changed', (state) => localforage.setItem('state', state))
__flybuk.on('seggins:changed', (settings) => localforage.setItem('settings', settings))