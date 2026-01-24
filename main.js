const script = document.currentScript
const key = script.dataset.key
const target = script.dataset.target

const config = {
    target
}

window.__flybuk = {
    hooks: {},
    on(e, fn) { (this.hooks[e] ||= []).push(fn) },
    emit(e, d) { (this.hooks[e] || []).forEach(fn => fn(d)) },
    config,

    State: {},
    Settings: { currency: "RUB" },
    plugins: [],

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
        return {
            on: this.on.bind(this),
            emit: this.emit.bind(this),
            getState: this.getState.bind(this),
            setState: this.setState.bind(this),
            getSettings: this.getSettings.bind(this),
            setSettings: this.setSettings.bind(this)
        }
    },

    use(plugin) {
        this.plugins.push(plugin)
        plugin(this.api())
    },

    load(src, cb = () => { }) {
        let s = document.createElement('script')
        s.src = src
        s.defer = true
        s.onload = cb
        s.onerror = (e) => console.error(e)
        document.body.appendChild(s)
    },

    loadPlugin(src, cb = () => { }) {
        let s = document.createElement('script')
        s.src = src
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

__flybuk.emit('init:before')

__flybuk.load('https://unpkg.com/localforage/dist/localforage.min.js', async () => {
    localforage.config({
        name: "__flydgetApp",
        driver: localforage.INDEXEDDB
    })

    __flybuk.load('logger.js')

    window.__flybuk.State = await localforage.getItem('state') || window.__flybuk.getState()
    window.__flybuk.Settings = await localforage.getItem('settings') || window.__flybuk.getSettings()

    __flybuk.emit('init')
})

__flybuk.on('init', () => {
    __flybuk.load('sync.js')
    __flybuk.load('initUI.js', () => {
        __flybuk.emit('ui:prepare')
        document.body.innerHTML = html
    })

    __flybuk.emit('init:after')
})
