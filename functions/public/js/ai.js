
// variable to store user info on the page
let loggedUser = {uid: null, email: null, userVoted: []};


// Function to add or delete upvotes and score
function upvoted(id){
    console.log(loggedUser.uid);
    let element = document.querySelector("#" + id);
    if (loggedUser.uid){
        // if user logged in send the server the data
        let datatosend = {
            remove: null, // what to remove
            add: null, // what to add
            score: 0 // score of that link
        }
        console.log(element.firstChild.style.borderColor)// == 'rgba(255, 0, 0, 0.822) transparent');
        if (element.firstChild.style.borderColor == 'rgba(255, 0, 0, 0.824) transparent'){
            // if arrow voted, then we need to remove the vote
            element.firstChild.style.borderColor = 'rgb(87, 87, 87) transparent';
            datatosend.remove = id;
            let score = parseInt(element.childNodes[1].textContent.split(' ')[2]);
            element.childNodes[1].textContent = 'Score : ' + (score - 1);
            datatosend.score = score - 1;
        }
        else {
            // else we need to add a vote
            element.firstChild.style.borderColor = 'rgba(255, 0, 0, 0.824) transparent'
            datatosend.add = id;
            let score = parseInt(element.childNodes[1].textContent.split(' ')[2]);
            element.childNodes[1].textContent = 'Score : ' + (score + 1);
            datatosend.score = score + 1;
        }
        $.ajax({
            // send the data as a POST request
            type: 'POST',
            url: 'changeVotes',
            data: datatosend,
            success: (res) => {
                console.log(res);
            }
        })
    }
    else {
        // Unlogged users can't use voting system
        alert('Log in first');
    }
}


// on page ready
$(document).ready(() => {
    $.ajax({
        type: 'POST',
        url: '/',
        success: (res) => {
            console.log(res.email);
            if (res.email){
                document.querySelector('#userstate').innerHTML = res.email;
            }
            else {
                document.querySelector('#userstate').innerHTML = "Login";
            }
        }
    })

    $.ajax({
        type: 'POST',
        url: 'ai.html',
        success: (res) => {
            console.log(res);
            // if user logged in
            if (res.uid){
                loggedUser.uid = res.uid;
                loggedUser.email = res.email;
                loggedUser.userVoted = res.voted;
            }
            let data = "";
            data += `<h3>Click any link below to study Artificial Intelligence</h3>`;
            links = res['links'];
            for (let i = 0; i < links.length; i++){
                data += `<div class="item" id="${links[i].key}">`;
                data += `<div class="up-arrow"></div>`;
                data += `<p class="score">Score : ${links[i].score}</p>`;
                data += `<a href="${links[i].link}" target="_blank" class="link">${links[i].title}</a>`
                data += `</div>`
            }
            document.querySelector('.topic').innerHTML = data;
        },
        // upon writing links now display upvoted posts
        complete: () => {

            if (loggedUser.uid != null){
                console.log(loggedUser.userVoted);
                for(let i = 0; i < loggedUser.userVoted.length; i++){
                    let element = document.getElementById(loggedUser.userVoted[i]);
                    if (element){
                        element.firstChild.style.borderColor = 'rgba(255, 0, 0, 0.824) transparent';
                    }
                }
            }

            // add vote event listener to all arrows
            // upon clicking an arrow, upvoted function is call with parent id
            let items = document.querySelectorAll('.up-arrow');
            for(let i = 0; i < items.length; i++){
                items[i].addEventListener('click', e => {
                    upvoted(e.target.parentElement.id);
                })
            }
        }
    })
})
