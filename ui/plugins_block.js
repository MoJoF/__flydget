__flybuk.on('ui:plugins-block', () => {
    __flybuk.show('.plugins-block')



    const render = plugins => {
        const notInstalledPlugins = plugins.filter(plugin => !__flybuk.isInstalled(plugin.id));
        const installedPlugins = __flybuk.getSettings().plugins
        renderers['all-plugins']('.plugins', notInstalledPlugins)
    }
    
    fetch(atob('aHR0cHM6Ly9yZWQtZnJvZy0zNWFmLm9teXJhdWN5LndvcmtlcnMuZGV2Lw=='))
        .then(resp => resp.json())
        .then(data => render(data.plugins))

    __flybuk.select('.plugins-block > div > .buttons-row > button.to-settings').onclick = () => {
        __flybuk.hide('.plugins-block')
        __flybuk.emit('ui:main-block')
    }
})
