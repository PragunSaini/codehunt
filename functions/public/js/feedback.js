// Check if user logged in or not and dispay user email if logged in
$(document).ready(() => {
    $.ajax({
        type: 'POST',
        url: '/',
        success: (res) => {
            console.log(res.email);
            if (res.email){
                document.querySelector('#userstate').textContent = res.email;
            }
            else {
                document.querySelector('#userstate').textContent = "Login";
            }
        }
    })
})



function validate()
{
    var email = document.getElementById('email').value;
    var mobile = document.getElementById('phone').value;
    var name = document.getElementById('name').value;
    var feedback = document.getElementById('feedback');

    if(name == ""){
        alert("Please provide your name.");
        return false;
    }
    if(email == ""){
        alert("Please provide your email.");
        return false;
    }
    if(mobile == ""){
        alert("Please provide your phone number.");
        return false;
    }
    if(feedback.value == ""){
        alert("Please provide some feedback.");
        return false;
    }
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        alert("Please enter a valid email.");
        return false;
    }
    if(isNaN(mobile) || mobile<1000000000 || mobile>9999999999){
        alert("Mobile number must contain exactly 10 digits");
        return false;
    }

    return true;
}






// let menuVisible = 0;
// let toggleButton = document.querySelector(".fa-bars");
// let subMenu = document.querySelector("#nav-links");

// toggleButton.addEventListener('click', function(){
//     if (menuVisible){
//         menuVisible = 0;
//         subMenu.style.display = 'none';
//         subMenu.style.height = '0em';
//         toggleButton.classList.add('fa-bars');
//         toggleButton.classList.remove('fa-times');
//     }
//     else{
//         menuVisible = 1;
//         subMenu.style.display = 'grid';
//         subMenu.style.height = '6em';
//         toggleButton.classList.remove('fa-bars');
//         toggleButton.classList.add('fa-times');
//     }
// })