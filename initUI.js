const targetCont = __flybuk.config.target

const mainBlock = `
<div class="main-block">
<header>
    <div class="row">
        <span id="month-year"></span>
    </div>
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
    </div>
    
</header>
</div>
`

const ui = {
    mainBlock
}

console.log(Object.values(ui).join())

if (targetCont) { document.querySelector(targetCont).innerHTML = Object.values(ui).join() }
else { document.body.innerHTML = Object.values(ui).join() + document.body.innerHTML }


__flybuk.emit('init:after')