const targetCont = __flybuk.config.target

const mainBlock = `
<style>
@import url('https://fonts.googleapis.com/css2?family=Jura:wght@300..700&display=swap');

:root {
    --bg-color: #1b1b1b;
    --text-color: #E6D5B8;
    --secondary-color: #F0A500;
    --error-color: red;
    --header-font-size: 36px;
    --text-font-size: 24px;
    --big-font-size: 48px;
}

::selection {
    color: var(--secondary-color);
    background: var(--bg-color);
}

* {
    font-family: Jura;
    font-size: var(--text-font-size);
    font-weight: bold;
}

.error {
    color: var(--error-color);
}

h2 {
    font-size: var(--header-font-size);
}

body {
    background: var(--bg-color);
    color: var(--text-color);
    height: 100%;
    width: 100%;
    overflow: hidden;
}

input[type=number]::-webkit-outer-spin-button,
input[type=number]::-webkit-inner-spin-button {
    display: none;
    margin: 0;
}

.main-block {
    padding: 50px 17.7vw;
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.main-block > header > .row {
    display: flex;
    gap: 20px;
    align-items: center;
}

#month-year {
    font-size: var(--header-font-size);
}

.main-block > .row {
    display: flex;
    gap: 30px;
}

.main-block > .row > .block {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.main-block > .row > .block > .block__subblock {
    display: flex;
    gap: 20px;
}

button.add-receive,
button.add_spent,
button.to_settings {
    background: var(--secondary-color);
    padding: 10px;
    color: var(--bg-color);
    border: 1px solid var(--secondary-color);
    border-radius: 10px;
    cursor: pointer;
    transition: .5s;
}

button.add-receive:hover,
button.add_spent:hover,
button.to_settings:hover {
    background: var(--bg-color);
    color: var(--secondary-color);
}

.add_spent {
    margin-top: 20px;
}

.main-block > .row > .block > .block__title {
    font-size: var(--header-font-size);
}

.main-block > .row > .block > .block__subblock > .block__summ,
#remaining-summ {
    font-size: var(--big-font-size);
    color: var(--secondary-color);    
}
</style>

<div class="main-block">
<header>
    <div class="row">
        <span id="month-year"></span>
        <button class="to_settings">Настройки</button>
    </div>
</header>
<div class="row">
    <div class="block">
        <span class="block__title">Доход</span>
        <div class="block__subblock">
            <span id="summ-and-currency" class="block__summ"></span>
            <button class="add-receive">+</button>
        </div>
    </div>
    <div class="block">
        <span class="block__title">Оставшаяся сумма</span>
        <span id="remaining-summ" class="block__summ"></span>
    </div>
</div>
<div class="block">
    <h2>Расходы</h2>
    <div class="table_header">
        <span>Дата и время</span>
        <span>Описание</span>
        <span>Категория</span>
        <span>Сумма</span>
    </div>
    <div id="spents"></div>
    <span class="no-spents" style="display: none;">Вы еще ничего не потратили. Чтобы создать расход, нажмите кнопку "Добавить"</span>
    <button class="add_spent">Добавить</button>
</div>
</div>
`

const firstRunBlock = `
<style>
.first-run-block {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 90vh;
}

.first-run-block > .block {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
}

.first-run-block > .block > input {
    background: var(--text-color);
    color: var(--bg-color);
    width: 40%;
    outline: none;
    border: none;
    border-radius: 10px;
    padding: 10px;
}

.first-run-block > .block > .row {
    display: flex;
    gap: 20px;
}

.first-run-block > .block > .row > select {
    padding: 10px;
    outline: none;
}

.first-run-block > .block > button {
    outline: none;
    background: var(--secondary-color);
    color: var(--bg-color);
    border: none;
    border-radius: 10px;
    cursor: pointer;
}
</style>
<div class="first-run-block" style="display: none;">
    <div class="block">
        <h2>Введите сумму вашего бюджета:</h2>
        <input type="number" />
        <div class="row">
            <span>Валюта:</span>
            <select class="select-currency">
            </select>
        </div>
        <span class="error" style="display: none;">Значение не может быть пустым.</span>
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
    <button>Плагины</button>
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
<style>
.add-receive-block {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 90vh;
}

.add-receive-block > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
}

.add-receive-block > div > input {
    outline: none;
    border: none;
    border-radius: 10px;
    background: var(--text-color);
    padding: 10px;
}

.add-receive-block > div > button {
    background: var(--secondary-color);
    padding: 10px;
    color: var(--bg-color);
    border: 1px solid var(--secondary-color);
    border-radius: 10px;
    cursor: pointer;
    transition: .5s;
}

.add-receive-block > div > button:hover {
    background: var(--bg-color);
    color: var(--secondary-color);
}
</style>

<div class="add-receive-block" style="display: none;">
    <div>
        <h2>Введите сумму нового дохода:</h2>
        <input type="number" />
        <span class="error" style="display: none;">Введите число</span>
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

__flybuk.html = ""
Object.values(ui).forEach(el => __flybuk.html += el)