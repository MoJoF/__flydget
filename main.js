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
    config
}

function load(link, cb = () => { }) {
    let s = document.createElement('script')
    s.src = link
    s.defer = true
    s.onload = cb
    s.onerror = (e) => console.error(e)
    document.body.appendChild(s)
}

__flybuk.emit('init:before')

load('https://unpkg.com/localforage/dist/localforage.min.js', async () => {
    localforage.config({
        name: "__flydgetApp",
        driver: localforage.INDEXEDDB
    })

    window.__flybuk.State = {}
    window.__flybuk.Settings = {}

    localforage.getItem('data')
        .then(v => { if (v) window.__flybuk.State = v })
    localforage.getItem('data')
        .then(v => { if (v) window.__flybuk.Settings = v })

    __flybuk.emit('init')
})

load("initUI.js")