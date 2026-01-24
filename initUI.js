const targetCont = __flybuk.config.target

const mainBlock = `
<style>
@import url('https://fonts.googleapis.com/css2?family=Jura:wght@300..700&display=swap');

:root {
    --bg-color: #1b1b1b;
    --text-color: #E6D5B8;
    --error-color: red;
    --header-font-size: 32px;
    --text-font-size: 24px;
}

* {
    font-family: Jura;
    font-size: var(--text-font-size);
    font-weight: bold;
}

body {
    background: var(--bg-color);
    color: var(--text-color);
}

.main-block {
    padding: 50px 17.7vw;
    display: flex;
    flex-direction: column;
    gap: 20px;
}
</style>

<div class="main-block">
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
<div class="first-run-block" style="display: none;">
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
    <div>
        <h2>Новый расход:</h2>
        <div class="row">
            <span>Сумма:</span>
            <input type="number" id="new-spent-summ" />
        </div>
        <div class="row">
            <span>Описание:</span>
            <input id="new-spent-desc" />
        </div>
        <div class="row">
            <span>Категория:</span>
            <select id="new-spent-category"></select>
        </div>
        <span class="error" style="display: none;">К сожалению, сумма расхода не может быть больше оставшегося бюджета</span>
    </div>
</div>
`

const settingsBlock = `
<div class="settings-block" style="display: none;">
    <button>Назад</button>
    <h2>Настройки</h2>
    <div class="row">
        <h3>Текущая валюта</h3>
        <select id="settings-currency">
            <option value="RUB">RUB</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
        </select>
    </div>
    <div class="block">
        <h3>Список категорий</h3>
        <div class="row">
            <input id="create-category" />
            <button>+</button>
        </div>
    </div>
    <div class="block"></div>
</div>
`

const newReceiveBlock = `
<div class="new-receive-block" style="display: none;">
    <div>
        <h2>Введите сумму нового дохода:</h2>
        <input type="number" />
        <span class="error" style="display: none;">Число не может быть отрицательным</span>
        <button>Подтвердить</button>
    </div>
</div>
`

const ui = {
    mainBlock,
    firstRunBlock,
    newSpentBlock,
    settingsBlock,
    newReceiveBlock
}

let html = ""
Object.values(ui).forEach(el => html += el)
