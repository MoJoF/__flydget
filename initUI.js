const targetCont = __flybuk.config.target

const mainBlock = `
<div class="main-block" style="display: none;">
<header>
    <div class="row">
        <span id="month-year"></span>
    </div>
</header>
<div class="row">
    <div class="block">
        <span class="block__title">Доход</span>
        <div class="block__subblock">
            <span id="summ-and-currency" class="block__summ"></span>
            <button>+</button>
        </div>
    </div>
    <div class="block">
        <span class="block__title">Оставшаяся сумма</span>
        <span id="remaining_summ" class="block__summ"></span>
    </div>
</div>
<div class="row">
    <h2>Расходы</h2>
    <div class="table_header">
        <span>Дата и время</span>
        <span>Сумма</span>
        <span>Описание</span>
        <span>Категория</span>
    </div>
    <div id="spents"></div>
    <span style="display: none;">Вы еще ничего не потратили. Чтобы создать расход, нажмите кнопку "Добавить"</span>
</div>
</div>
`

const firstRunBlock = `
<div class="first-run-block">
    <div class="block">
        <h2>Введите сумму ваш бюджет:</h2>
        <input type="number" />
        <span class="error" style="display: none;">Число не может быть отрицательным.</span>
        <button>Подтвердить</button>
    </div>
</div>
`

const newSpentBlock = `
<div class="new-spent-block" style="display: none;">
    <button>Назад</button>
    <h2>Настройки</h2>
    <div class="row">
        <h3>Текущая валюта</h3>
        <select></select>
    </div>
</div>
`

const ui = {
    mainBlock,
    firstRunBlock,
    newSpentBlock
}

let html = ""
Object.values(ui).forEach(el => html += el)

if (targetCont) { document.querySelector(targetCont).innerHTML = html }
else { document.body.innerHTML = html + document.body.innerHTML }

__flybuk.emit('init:after')

__flybuk.emit('ui:before-render')

load('renderUI.js')

