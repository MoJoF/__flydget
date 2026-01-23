const targetCont = __flybuk.config.target

const UI = `
<div class="main-block">
<h1>Главный блок</h1>
</div>
<div class="first-run">Введите сумму вашей заработной платы</div>
`

if (targetCont) { document.querySelector(targetCont).innerHTML = UI }
else { document.body.innerHTML = UI }



__flybuk.emit('init:after')