
const errorMsg = document.getElementById('errorMsg');
const button = document.getElementById('button');


window.onload = () => {
    if(sessionStorage.name){
       location.href = '/' 
    }
}

const showError = (data) =>{
    errorMsg.innerHTML = data;
    errorMsg.style.opacity = 1;
    setTimeout(() => {
        errorMsg.style.opacity = 0;
    }, 3000);
}

const nama = document.querySelector('#name') || null;
const email = document.querySelector('#username');
const password = document.querySelector('#password');
const confPassword = document.getElementById('confPassword');
const submitBtn = document.querySelector('#button');

if (nama == null) {
    submitBtn.addEventListener('click', ()=>{
        fetch('/login-user',{
            method: 'post',
            headers: new Headers({'Content-Type':'application/json'}),
            body: JSON.stringify({
                email: email.value,
                password: password.value
            })
        })
        .then(res => res.json())
        .then(data =>{
            validateData(data);       
        })
    })
}else{
    submitBtn.addEventListener('click',()=>{
        fetch('/register-user', {
            method: 'post',
            headers: new Headers({'Content-Type':'application/json'}),
            body: JSON.stringify({
                name: nama.value,
                email: email.value,
                password: password.value,
                confPassword: confPassword.value
            })
        })
        .then(res => res.json())
        .then(data =>{
            if (!data.name){
                showError(data);
            }
            else {
                sessionStorage.name = data.name;
                sessionStorage.email = data.email;
                sessionStorage.act1 = 0;
                sessionStorage.act2 = 0;
                sessionStorage.act3 = 0;
                location.href = '/';
            }
        })
    })
}

const validateData = (data) => {
    if (!data.name){
        showError(data);
    }
    else {
        sessionStorage.name = data.name;
        sessionStorage.email = data.email;
        sessionStorage.act1 = data.act1;
        sessionStorage.act2 = data.act2;
        sessionStorage.act3 = data.act3;
        location.href = '/';
    }
}






// for canvas
const canvas = document.getElementById('alphabetCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size to window dimensions
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const letters = [];
const maxLetters = 100;

// Create Letter Object
function Letter(x, y, speed, char) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.char = char;

    this.draw = function () {
        ctx.fillStyle = "rgba(0, 0, 0, 0.25)"; // Black text with 50% opacity
        ctx.font = "20px Arial";
        ctx.fillText(this.char, this.x, this.y);
    };

    this.update = function () {
        this.y += this.speed;
        if (this.y > canvas.height) {
            this.y = -20; // Move it back to the top
        }
        this.draw();
    };
}

// Generate random letters and push them into the letters array
for (let i = 0; i < maxLetters; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const speed = Math.random()*0.5 + 0.5; // Adjusted speed for slower movement (0.5 to 2.5)
    const char = alphabet[Math.floor(Math.random() * alphabet.length)];
    letters.push(new Letter(x, y, speed, char));
}

// Animate the letters
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < letters.length; i++) {
        letters[i].update();
    }
    requestAnimationFrame(animate);
}

animate();

// Adjust canvas size on window resize
window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
