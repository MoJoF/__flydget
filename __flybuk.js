const script = document.currentScript
const target = script.dataset.target

const config = {
    debug: true,
    target,
    path: "https://github.com/MoJoF/__flydget/",
    version: "0.1"
}

window.__flybuk = {
    hooks: {},
    fired: Object.create(null),

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
        this.Settings.plugins.push(plugin)
        plugin(this.api())
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

window.__flybuk.data = {}
window.__flybuk.data.currencies = ["RUB", "USD", "EUR"]

// UI
__flybuk.load('ui/main_block.js')
__flybuk.load('ui/add_receive_block.js')
__flybuk.load('ui/first_run_block.js')
__flybuk.load('ui/add_spent_block.js')
__flybuk.load('ui/settings_block.js')

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
