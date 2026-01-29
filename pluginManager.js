__flybuk.on('plugin:installed', (plugin) => {
    let plugins = __flybuk.getSettings().plugins
    plugins = [...plugins, { ...plugin, enabled: false }]
    __flybuk.setSettings({ plugins })
})