document.getElementById('loginButton').addEventListener('click', function (e) {
    e.preventDefault();

    const mobileNumber = 12345678910;
    const pinNumber = 2246;

    const mobileNumberValue = document.getElementById('mobile-number').value;
    const mobileNumberValueConverted = parseInt(mobileNumberValue);

    const pinNumberValue = document.getElementById('pin-number').value;
    const pinNumberValueConverted = parseInt(pinNumberValue);

    console.log(mobileNumberValueConverted, pinNumberValueConverted);

    if (mobileNumberValueConverted === mobileNumber && pinNumberValueConverted === pinNumber){
        window.location.href="./Home.html"
    }

       else{
            alert('invalid Cradential')
       }
});
