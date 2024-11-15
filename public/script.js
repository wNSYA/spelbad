const username = document.getElementById('username');
const nav1 = document.getElementById('navigation1');
const nav2 = document.getElementById('navigation2');
const nav3 = document.getElementById('navigation3');
const resetActivity = document.getElementById('resetActivity');


window.onload = () => {
    if(sessionStorage.name){
        username.innerHTML = sessionStorage.name;
        nav1.style.display = "none";
        nav2.style.display = "none";
    }
    else {
        nav3.style.display = "none";
    }

}

nav3.onclick = () => {
    sessionStorage.clear();
    location.reload();
}

resetActivity.onclick = () => {
    sessionStorage.act1 = '0';
    sessionStorage.act2 = '0';
    sessionStorage.act3 = '0';

    fetch('/activity-reset', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: sessionStorage.email })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
    })
    .then(data => {
        console.log('Activities reset successfully:', data);
        // You might want to update the UI or show a success message here
        return data;
    })
    .catch(error => {
        console.error('Error resetting activities:', error);
        // Handle the error appropriately (e.g., show an error message to the user)
        throw error;
    });
    location.reload();
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