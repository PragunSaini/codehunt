// Check if user logged in or not and dispay user email if logged in
$(document).ready(() => {
    $.ajax({
        type: 'POST',
        url: '/',
        success: (res) => {
            console.log(res.email);
            if (res.email){
                document.querySelector('#userstate').innerHTML = `<a href="login.html" target="_blank" class="nav-link">${res.email}</a>`;
            }
            else {
                document.querySelector('#userstate').innerHTML = `<a href="login.html" target="_blank" class="nav-link">Login</a>`;
            }
        }
    })

    // add mobile bars icon
    document.querySelector("#bars").addEventListener('click', function(){
        if (document.querySelector("#nav-links").style.display == 'grid'){
            document.querySelector("#nav-links").style.display = 'none';
        }
        else {
            document.querySelector("#nav-links").style.display = 'grid';
        }
    })

})





















































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