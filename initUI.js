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
    --plugin-desc-font-size: 20px;
    --plugin-btn-font-size: 16px;
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

input {
    padding: 10px;
    background: var(--text-color);
    border: none;
    outline: none;
    border-radius: 10px;
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

.main-block > .block > .table_header {
    display: flex;
    gap: 10px;
}

table {
    border-collapse: separate; 
    border-spacing: 15px 10px;
    border: 1px solid var(--text-color); 
}

table > thead > tr,
table > tbody > tr {
    border: 1px solid var(--text-color);
}

table > tbody > tr > td > button {
    color: var(--text-color);
    background: var(--error-color);
    border: none;
    border-radius: 10px;
    padding: 10px;
    cursor: pointer;
    transition: .5s;
}

table > tbody > tr > td > button:hover {
    color: var(--error-color);
    background: var(--text-color);
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
    <table>
        <thead class="table_header">
            <tr>
                <th>Описание</th>
                <th>Сумма</th>
                <th>Категория</th>
                <th>Дата и время</th>
                <th></th>
            <tr>
        </thead>
        <tbody id="spents"></tbody>
    </table>
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
<style>
.new-spent-block {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 90vh;
}

.new-spent-block > div {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 20px;
    border: 2px solid var(--secondary-color);
    border-radius: 10px;
}

.new-spent-block > div > h2 {
    font-size: var(--big-font-size);
    color: var(--secondary-color);
    line-height: 10%;
}

.new-spent-block > div > .row {
    display: flex;
    gap: 20px;
    align-items: center;
}

.new-spent-block > div > .row > input {
    outline: none;
    padding: 10px;
    background: var(--text-color);
    color: var(--bg-color);
    border: none;
}

.new-spent-block > div > .btn-cont {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 20px;
}

button#add-spent-button {
    width: fit-content;
    color: var(--bg-color);
    background: var(--secondary-color);
    border: none;
    border-radius: 10px;
    cursor: pointer;
    padding: 10px;
}
</style>

<div class="new-spent-block" style="display: none;">
    <div>
        <h2>Новый расход:</h2>
        <div class="row">
            <span>Сумма:</span>
            <input type="number" id="new-spent-summ" />
        </div>
        <div class="row">
            <span>Описание:</span>
            <input id="add-spent-desc" />
        </div>
        <div class="row">
            <span>Категория:</span>
            <select id="add-spent-category"></select>
        </div>
        <span class="error" style="display: none;">Сумма не может быть пустой</span>
        <div class="btn-cont">
            <button id="add-spent-button">Добавить расход</button>
        </div>
    </div>
</div>
`

const settingsBlock = `
<style>
.settings-block {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 90vh;
  margin-top: 20px;
}

.settings-block > div {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 30%;
}

.settings-block > div > h2,
.settings-block > div > .block > h3{
  line-height: 10%;
}

.settings-block > div > .buttons-row {
  display: flex;
  justify-content: space-between;
}

.settings-block > div > .buttons-row > button,
.settings-block > div > .block > .row > div > button {
  border: none;
  border: 1px solid var(--secondary-color);
  border-radius: 10px;
  padding: 10px;
  color: var(--bg-color);
  background: var(--secondary-color);
  cursor: pointer;
  transition: .5s;
}

.settings-block > div > .buttons-row > button:hover,
.settings-block > div > .block > .row > div > button:hover {
  color: var(--secondary-color);
  background: var(--bg-color);
}

.settings-block > div > .row {
  display: inline;
}

.settings-block > div > .row > select {
  margin-left: 20px;
  outline: none;
}

.settings-block > div > .block {
  display: flex;
  flex-direction: column;
  margin-top: 10px;
}

#categories-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
    overflow-y: scroll;
    height: 200px;
    outline: none;
}

#categories-container > .cat-item {
    display: flex;
    gap: 10px;
    align-items: center;
}

#categories-container > .cat-item > .del-cat {
    padding: 10px;
    border: 1px solid var(--error-color);
    border-radius: 10px;
    background: var(--error-color);
    color: var(--text-color);
    transition: .5s;
    cursor: pointer;
}

#categories-container > .cat-item > .del-cat:hover {
    background: var(--text-color);
    color: var(--error-color);
}
</style>
<div class="settings-block" style="display: none;">
    <div>
        <div class="buttons-row">
            <button class="back-to-main">Назад</button>
            <button class="to-plugins">Плагины</button>
        </div>
        <h2>Настройки</h2>
        <div class="row">
            <span>Текущая валюта</span>
            <select id="settings-currency"></select>
        </div>
        <div class="block">
            <h3>Список категорий</h3>
            <div class="row">
                <h3>Создать новую категорию</h3>
                <div>
                    <input id="create-category" />
                    <button>+</button>
                </div>
                <span class="error" style="display: none;">Название категории не может быть пустым.</span>
            </div>
        </div>
        <div class="block" id="categories-container"></div>
    </div>
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

const pluginsBlock = `
<style>
.plugins-block {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 90vh;
}

.plugins-block > div {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.plugins-block > div > h2,
.plugins-block > div > .block > h3{
  line-height: 10%;
}

.plugins-block > div > .buttons-row {
  display: flex;
  justify-content: space-between;
}

.plugins-block > div > .buttons-row > button {
  border: none;
  border: 1px solid var(--secondary-color);
  border-radius: 10px;
  padding: 10px;
  color: var(--bg-color);
  background: var(--secondary-color);
  cursor: pointer;
  transition: .5s;
}

.plugins-block > div > .buttons-row > button:hover {
  color: var(--secondary-color);
  background: var(--bg-color);
}

.plugins-block > div > .plugins-cont {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.plugins-block > div > .plugins-cont > .plugins-installed,
.plugins-block > div > .plugins-cont > .plugins {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.plugins-block > div > .row > select {
  margin-left: 20px;
}

.plugins-block > div > .block {
  display: flex;
  flex-direction: column;
  margin-top: 10px;
}

.plugin-item {
    display: flex;
    gap: 10px;
    padding: 10px;
    border-radius: 10px;
    border: 2px solid var(--secondary-color);
    width: 400px;
}

.plugin-item > img {
    object-fit: contain;
}

.plugin-item > .plugin-text-block {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.plugin-item > .plugin-text-block > span.plugin-title {
    font-size: var(--text-font-size);
}

.plugin-item > .plugin-text-block > span.plugin-desc {
    font-size: var(--plugin-desc-font-size);
}

.plugin-item > .plugin-text-block > button.plugin-install,
.plugin-item > .plugin-text-block > button.plugin-activate,
.plugin-item > .plugin-text-block > button.plugin-deactivate {
    padding: 10px;
    width: fit-content;
    border: 1px solid var(--secondary-color);
    border-radius: 10px;
    background: var(--secondary-color);
    transition: .5s;
    cursor: pointer;
    font-size: var(--plugin-btn-font-size);
}

.plugin-item > .plugin-text-block > button.plugin-install:hover,
.plugin-item > .plugin-text-block > button.plugin-activate:hover,
.plugin-item > .plugin-text-block > button.plugin-deactivate:hover {
    background: var(--bg-color);
    color: var(--secondary-color);
}
</style>
<div class="plugins-block" style="display: none;">
    <div>
        <div class="buttons-row">
            <button class="to-settings">В настройки</button>
        </div>
        <h2>Плагины</h2>
        <span>К сожалению, сумма расхода не может быть больше оставшихся денег.</span>
        <div class="plugins-cont">
            <h2>Установленные</h2>
            <span class="no-plugins" style="display: none;">Вы пока не установили ни одного плагина.</span>
            <div class="plugins-installed"></div>
        </div>
        <div class="plugins-cont">
            <h2>Все плагины</h2>
            <div class="plugins"></div>
        </div>
    </div>
</div>
`

const ui = {
    mainBlock,
    firstRunBlock,
    newSpentBlock,
    settingsBlock,
    newReceiveBlock,
    pluginsBlock
}

__flybuk.html = ""
Object.values(ui).forEach(el => __flybuk.html += el)