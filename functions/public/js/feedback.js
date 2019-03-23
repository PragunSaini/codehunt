let menuVisible = 0;
let toggleButton = document.querySelector(".fa-bars");
let subMenu = document.querySelector("#nav-links");

toggleButton.addEventListener('click', function(){
    if (menuVisible){
        menuVisible = 0;
        subMenu.style.display = 'none';
        subMenu.style.height = '0em';
        toggleButton.classList.add('fa-bars');
        toggleButton.classList.remove('fa-times');
    }
    else{
        menuVisible = 1;
        subMenu.style.display = 'grid';
        subMenu.style.height = '6em';
        toggleButton.classList.remove('fa-bars');
        toggleButton.classList.add('fa-times');
    }
})