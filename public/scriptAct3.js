const username = document.getElementById("username")
const judul = document.getElementById("judul");
const soal = document.getElementById("desc");
const answer = document.getElementById("answer");
const button1 = document.getElementById("button1");
const button2 = document.getElementById("button2");
const button3 = document.getElementById("button3");
const button4 = document.getElementById("button4");

button2.style.display= "none";
button3.style.display= "none";
button4.style.display= "none";

const q1 = document.getElementById("q1");
const q1left = document.getElementById("q1left");
let input1 = document.getElementById("input1");
const q1right = document.getElementById("q1right");

const page= [
    {
        question : "Lengkapi kalimat berikut!",
        qleft : 'Matahari sudah tinggi, namun Ani belum juga ',
        qright:' dari tidurnya.',
        hint : 'Kata lain dari bangkit; berdiri (dari duduk, tidur, dan sebagainya).',
        answer:'bangun'
    },
    {
        question : "Lengkapi kalimat berikut!",
        qleft : 'Ibunya sudah ',
        qright:' kali memanggil, tetapi Ani tetap tidak bergeming. dari tidurnya.',
        hint : 'Definisi kata : dilakukan lebih dari satu kali',
        answer:'berulang'
    },
    {
        question : "Lengkapi kalimat berikut!",
        qleft : 'Akhirnya, ibu ',
        qright:' Ani ke kamarnya dan membangunkannya secara langsung.',
        hint : 'Kata ini berimbuhan men-i',
        answer:'mendatangi'
    },
    {
        question : "Lengkapi kalimat berikut!",
        qleft : '"Ani, sudah ',
        qright:' ! Ayo cepat bangun!" kata ibu dengan nada tegas.',
        hint : 'Definisi kata : waktu setelah matahari terbit hingga menjelang siang hari.',
        answer:'pagi'
    },
    {
        question : "Lengkapi kalimat berikut!",
        qleft : 'Dengan Malas, Ani bangkit dari tempat tidurnya dan ',
        qright:' ke kamar mandi untuk mencuci muka.',
        hint : 'Definisi kata: melangkahkan kaki bergerak maju',
        answer:'berjalan'
    },
]

let currentPage = 0;
let inputValue = "";

button1.onclick = nextPage;
answer.style.display = "none";


function nextPage(){
    if (Number(sessionStorage.act3) == page.length){
        judul.innerHTML = "Selamat!!!";
        soal.innerHTML = "Selamat telah menyelesaikan aktivitas ini sampai akhir! Speller White mengapresiasi kerja kerasmu dan memiliki harapan besar atas rencananya berkat dirimu.\n Sebarkan laman ini untuk menjangkau lebih banyak orang untuk membantu menjalankan rencana Speller White!";
        button1.style.display = "none";
        button2.style.display = "block";
        button3.style.display = "none";
        button4.style.display = "none";
        answer.style.display = "none";
    }
    else{
        input1.value = '';
        input1.disabled = false;
        judul.innerHTML = "Soal " + (Number(sessionStorage.act3)+1) + " dari 5"
        soal.innerHTML = page[Number(sessionStorage.act3)].question;
        answer.style.display = "block";
        q1left.innerHTML = page[Number(sessionStorage.act3)].qleft;
        q1right.innerHTML = page[Number(sessionStorage.act3)].qright;

        button1.innerHTML = "Konfirmasi";
        button3.style.display= "block";
        button4.style.display= "block";
        button1.onclick = check;
        button3.onclick = reset;
        button4.onclick = hint;
    }
    fetch('/completion-status-3', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email:sessionStorage.email, page:Number(sessionStorage.act3)})
      })
      .then(response => {
        if (response.ok) {
          console.log('Completion status sent successfully');
        } else {
          console.error('Error sending completion status');
        }
      })
      .catch(error => {
        console.error('Error sending completion status:', error);
      });
}

function check() {
    // Get the value of the input field
    inputValue = input1.value.trim();

    if (inputValue.toLowerCase()===page[Number(sessionStorage.act3)].answer){
        soal.innerHTML = "Jawabanmu Benar!!!"
        input1.disabled = true;
        sessionStorage.act3++;
        button1.onclick = nextPage;
        button3.onclick = null;
        button4.onclick = null;
    }
    else{
        soal.innerHTML = "Jawabanmu Salah!!!, silahkan gunakan tombol hint untuk mendapatkan bantuan."
        input1.value = '';
    }

};

function reset() {
    // Get the value of the input field
    input1.value = '';

};

function hint() {
    // Get the value of the input field
    soal.innerHTML = page[Number(sessionStorage.act3)].question;
    soal.innerText+= "\n\nHint: " + page[Number(sessionStorage.act3)].hint;

};



const nav1 = document.getElementById('navigation1');
const nav2 = document.getElementById('navigation2');
const nav3 = document.getElementById('navigation3');

window.onload = () => {
    if(sessionStorage.name){
        username.innerHTML = sessionStorage.name;
        nav1.style.display = "none";
        nav2.style.display = "none";
    }
    else {
        location.href = '/login';
        nav3.style.display = "none";
    }

}

nav3.onclick = () => {
    sessionStorage.clear();
    location.href = '/';
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