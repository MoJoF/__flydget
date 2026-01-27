__flybuk.on('ui:plugins-block', () => {
    __flybuk.show('.plugins-block')

    __flybuk.select('.plugins-block > div > .buttons-row > button.to-settings').onclick = () => {
        __flybuk.hide('.plugins-block')
        __flybuk.emit('ui:main-block')
    }
})