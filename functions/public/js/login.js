
// Login Handler Code

// Display either logout or login option
$(document).ready(() => {
    $.ajax({
        type: 'POST',
        url: '/',
        success: (res) => {
            console.log(res.email);
            if (res.email){
                document.querySelector('#logged').style.display = "none";
                document.querySelector('#logout').style.display = "grid";
                document.querySelector('#useremail').textContent = "Logged in : " + res.email;
            }
            else {
                document.querySelector('#logged').style.display = "grid";
                document.querySelector('#logout').style.display = "none";
            }
        }
    })
})

// Register button click evennt - register a user
document.querySelector("#regbtn").addEventListener('click', e => {
    if (validate()){
        const email = document.getElementById('email').value;
        const pass = document.getElementById('pass').value;
        const auth = firebase.auth();

        let promise = auth.createUserWithEmailAndPassword(email, pass);

        promise.catch(e => alert(e.message));
    }
})

// Login a user
document.querySelector("#logbtn").addEventListener('click', e => {
    if (validate()){
        const email = document.getElementById('email').value;
        const pass = document.getElementById('pass').value;
        const auth = firebase.auth();

        let promise = auth.signInWithEmailAndPassword(email, pass);

        promise.catch(e => alert("Please register first."));
    }
})

// Logout any logged user
document.querySelector("#logobtn").addEventListener('click', e => {
    firebase.auth().signOut();
})


// Event that fires whenever someone logs in or out
firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser){
        console.log(firebaseUser);
        // send user details to server
        $.ajax({
            type:'POST',
            url:'login.html',
            data:{
                email: firebaseUser.email,
                uid: firebaseUser.uid
            },
            success: (res) => {
                // show logout page
                document.querySelector('#logged').style.display = "none";
                document.querySelector('#logout').style.display = "grid";
                document.querySelector('#useremail').textContent = "Logged in : " + res.email;
            }
        })
    }
    else{
        console.log(firebaseUser);
        $.ajax({
            type:'POST',
            url:'login.html',
            // send empty data to server
            data: {uid: null},
            success: (res) => {
                // show empty login page
                document.querySelector('#logged').style.display = "grid";
                document.querySelector('#logout').style.display = "none";
                let inputs = document.querySelectorAll('.inputs');
                for(let i = 0; i < inputs.length; i++){
                    inputs[i].value = "";
                }
            }
        })
    }
})



// Input Validation Function
function validate(){
    var email = document.getElementById("email");
    var password = document.getElementById("pass");
    var passw =  /^[A-Za-z]\w{7,14}$/;

    if(email.value == ""){
        alert("Please enter your email.");
        return false;
    }

    if(password.value == ""){
        alert("Please enter a password.");
        return false;
    }

    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value)) {
        alert("Please enter a valid email.");
        return false;
    }

    if(!email.checkValidity()){
        alert(email.validationMessage);
        return false;
    }

    if(!password.checkValidity()){
        alert(password.validationMessage);
        return false;
    }

    if (!password.value.match(passw)) {
        alert('Password must have letters as well as numbers.');
        return false;
    }

    return true;
}