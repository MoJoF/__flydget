__flybuk.on('plugin:installed', (plugin) => {
    let plugins = __flybuk.getSettings().plugins
    plugins = [...plugins, { ...plugin, enabled: false }]
    __flybuk.setSettings({ plugins })
})

__flybuk.on('plugin:uninstall', (plugin) => {
    let pluginObject = __flybuk.getSettings().plugins.find(plug => plug.id === plugin.id)
    let plugins = __flybuk.getSettings().plugins
    plugins = plugins.filter(p => p.id !== pluginObject.id)
    __flybuk.setSettings({ plugins })
})

__flybuk.on('plugin:activate', (plugin) => { })

__flybuk.on('plugin:deactivate', (plugin) => {
    let pluginObject = __flybuk.getSettings().plugins.find(plug => plug.id === plugin.id) // Ищем объект плагина в настройках
    pluginObject = { ...pluginObject, enabled: false } // В настройках ставим плагин выключенным
    let plugins = __flybuk.getSettings().plugins // Получаем список плагинов из настроек
    plugins = plugins.filter(plug => plug.id !== pluginObject.id) // Удаляем объект плагина, чтобы заменить другим (с выключенным состоянием)
    plugins = [...plugins, pluginObject] // Перезаписываем объект с плагином
    delete __flybuk.pluginsRegistry[plugin.id] // Стираем плагин из регистра
    __flybuk.setSettings({ plugins })
})