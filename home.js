const validPin = 2246

document.getElementById('add-money-btn').addEventListener('click', function (e) {
    e.preventDefault()

    const bank = document.getElementById('bank').value
    const accountNumber = document.getElementById('add-account').value
    const amount = parseInt(document.getElementById('add-amount').value)

    const pin = document.getElementById('add-pin').value
    console.log(bank, accountNumber, amount, pin);

    const availableBalance = parseInt(document.getElementById('available-balance').innerText)
    console.log(availableBalance);

    if (accountNumber.length < 11) {
        alert('Please Provide valid account number')
        return;
    }

    if (pin != validPin) {
        alert('Please Provode Valid Pin')
        return;
    }
    const totalNewBalance = amount + availableBalance

    document.getElementById('available-balance').innerText = totalNewBalance

})


// toggling feature

document.getElementById('add-money-button').addEventListener('click', function(){
    document.getElementById('cash-out-parent').style.display = 'none'
    document.getElementById('add-money-parent').style.display = 'block'


})
document.getElementById('cash-out-button').addEventListener('click', function(){
    document.getElementById('add-money-parent').style.display = 'none'
    document.getElementById('cash-out-parent').style.display = 'block'


})