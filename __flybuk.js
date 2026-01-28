const script = document.currentScript
const target = script.dataset.target

const config = {
    debug: true,
    target,
    path: "",
    // path: "https://mojof.github.io/__flydget/",
    version: "0.1"
}

window.__flybuk = {
    hooks: {},
    fired: Object.create(null),
    pluginsRegistry: Object.create(null),

    on(e, fn) {
        if (e in this.fired) fn(this.fired[e])
        else (this.hooks[e] ||= []).push(fn)
    },
    emit(e, d) {
        this.fired[e] = d
            ; (this.hooks[e] || []).forEach(fn => fn(d))
    },
    once(e, fn) {
        if (e in this.fired) {
            fn(this.fired[e])
            return
        }
        const wrapper = (d) => {
            fn(d)
            this.off(e, wrapper)
        }
        this.on(e, wrapper)
    },
    when(e, fn) {
        if (e in this.fired) fn(this.fired[e])
        else this.on(e, fn)
    },
    off(e, fn) { this.hooks[e] = (this.hooks[e] || []).filter(f => f !== fn) },

    config,

    State: {},
    Settings: {
        currency: "RUB",
        categories: [
            "Жильё",
            "Продукты",
            "Транспорт",
            "Здоровье",
            "Связь",
            "Кредиты",
            "Развлечения",
            "Одежда",
            "Спорт",
            "Подарки"
        ],
        currencies: ["RUB", "USD", "EUR"],
        plugins: []
    },

    getState() { return this.State },
    setState(patch) {
        this.State = { ...this.State, ...patch }
        this.emit('state:changed', this.State)
    },

    getSettings() { return this.Settings },
    setSettings(patch) {
        this.Settings = { ...this.Settings, ...patch }
        this.emit('settings:changed', this.Settings)
    },

    api() {
        return Object.freeze({
            on: this.on.bind(this),
            emit: this.emit.bind(this),
            when: this.when.bind(this),
            once: this.once.bind(this),
            off: this.off.bind(this),
            getState: this.getState.bind(this),
            setState: this.setState.bind(this),
            getSettings: this.getSettings.bind(this),
            setSettings: this.setSettings.bind(this)
        })
    },

    use(plugin) {
        let plugins = this.getSettings().plugins
        if (plugins.find(plug => plugin.meta === plug)) {
            if (!plug?.id) {
                console.error("[ERROR] Плагин должен содержать id")
                return
            }
            plugin.install(this.api())
            this.emit('plugin:activated', plugin.meta)
        } else {
            plugins = [...plugins, plugin.meta]
            this.setSettings({ plugins })
            plugin.install(this.api())
            this.emit('plugin:installed', plugin.meta)
        }
    },

    load(src, cb = () => { }) {
        let s = document.createElement('script')
        s.src = this.config.path + src
        s.defer = true
        s.onload = cb
        s.onerror = (e) => console.error(e)
        document.body.appendChild(s)
    },

    loadPlugin(src, cb = () => { }) {
        let s = document.createElement('script')
        s.src = this.config.path + src
        s.defer = true
        s.onload = cb
        s.onerror = (e) => console.error(e)
        document.body.appendChild(s)
    },

    bootstrapPlugins() {
        this.getSettings().plugins.forEach(meta => {
            this.loadPlugin(meta.file)
        })
    },

    isInstalled(id) {
        const pluginsList = this.Settings.plugins
        if (!pluginsList) return false
        if (pluginsList.find(plug => plug.id === id)) return true
        return false
    },

    definePlugin({ meta, install }) {
        if (this.pluginsRegistry[meta.id]) return

        this.pluginsRegistry[meta.id] = { meta, install }

        if (this.isInstalled(meta.id)) {
            install(this.api())
            this.emit('plugin:installed')
        }
    },

    installPlugin(meta) {
        if (!this.isInstalled(meta.id)) {
            let plugins = this.Settings.plugins
            plugins = [...plugins, meta]
            this.setSettings({ plugins })
        }

        if (this.pluginsRegistry[meta.id]) {
            this.pluginsRegistry[meta.id].install(this.api())
            this.emit('plugin:installed', meta)
        }
    }
}

window.__flybuk.select = function (selector, multiply = false) {
    if (multiply) return document.querySelectorAll(selector)
    return document.querySelector(selector)
}

window.__flybuk.hide = function (selector) {
    const el = __flybuk.select(selector)
    if (!el) return
    el.style.display = 'none'
}

window.__flybuk.show = function (selector, mode = "flex") {
    const el = __flybuk.select(selector)
    if (!el) return
    el.style.display = mode
}

// Функция для дебага. Для того, чтобы очищать базу данных
window.__flybuk.clearData = function () {
    localforage.clear()
}


__flybuk.load('logger.js', () => __flybuk.emit('init:before'))

__flybuk.load('libs/localforage.min.js', async () => {
    localforage.config({
        name: "__flydgetApp",
        driver: localforage.INDEXEDDB
    })

    window.__flybuk.State = await localforage.getItem('state') || window.__flybuk.getState()
    window.__flybuk.Settings = await localforage.getItem('settings') || window.__flybuk.getSettings()

    __flybuk.emit('init')
})

// UI
__flybuk.load('ui/main_block.js')
__flybuk.load('ui/add_receive_block.js')
__flybuk.load('ui/first_run_block.js')
__flybuk.load('ui/add_spent_block.js')
__flybuk.load('ui/settings_block.js')
__flybuk.load('ui/plugins_block.js')

// Plugins
__flybuk.bootstrapPlugins()


__flybuk.on('init', () => {
    __flybuk.load('sync.js')
    __flybuk.load('initUI.js', () => {
        __flybuk.load('renderUI.js', () => {
            __flybuk.emit('ui:prepare')

            if (__flybuk.config.target) {
                const cont = document.querySelector(__flybuk.config.target)
                cont.innerHTML = __flybuk.html
            } else {
                document.body.innerHTML = __flybuk.html
            }

            __flybuk.emit('ui:render')
        })
    })
})
