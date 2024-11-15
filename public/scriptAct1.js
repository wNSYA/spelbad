
const username = document.getElementById("username")
const judul = document.getElementById("judul");
const soal = document.getElementById("desc");
const answer = document.getElementById("answer");
const button1 = document.getElementById("button1");
const button2 = document.getElementById("button2");

button2.style.display= "none";

const option1 = document.getElementById("option1");
const option2 = document.getElementById("option2");
const option3 = document.getElementById("option3");
const option4 = document.getElementById("option4");

option1.style.display ="none";
option2.style.display ="none";
option3.style.display ="none";
option4.style.display ="none";

const page= [
    {
        question: "Manakah pernyataan yang benar mengenai fungsi bahasa Indonesia sebagai bahasa resmi?",
        answers: [
            "Bahasa Indonesia hanya digunakan dalam lingkup pendidikan",
            "Bahasa Indonesia hanya dipakai dalam lingkungan rumah tangga",
            "Bahasa Indonesia digunakan sebagai bahasa administrasi negara dan pemerintahan",
            "Bahasa Indonesia hanya dipakai untuk komunikasi internasional",
        ],
        correct:2,
        hint:"Pikirkan tentang fungsi bahasa Indonesia yang diatur dalam undang-undang dan digunakan dalam komunikasi formal di seluruh wilayah Indonesia."
    },
    {
        question: "Apakah yang dimaksud dengan diksi dalam penulisan karya ilmiah?",
        answers: [
            "Gaya penulisan dalam menyampaikan ide dan gagasan",
            "Pemilihan kata yang tepat untuk mengungkapkan gagasan",
            "Pola pengembangan paragraf dalam teks",
            "Struktur kalimat yang sesuai dengan tata bahasa",
        ],
        correct:1,
        hint:"Diksi berkaitan dengan bagaimana kata dipilih secara hati-hati agar dapat mengekspresikan gagasan dengan tepat dan jelas dalam tulisan."
    },
    {
        question: "Struktur utama dalam teks eksposisi terdiri atas:",
        answers: [
            "Pernyataan umum, argumen, dan penutup",
            "Orientasi, komplikasi, dan resolusi",
            "Abstraksi, krisis, dan evaluasi",
            "Identifikasi, deskripsi, dan simpulan",
        ],
        correct:0,
        hint:"Teks eksposisi bertujuan untuk memberikan informasi dan argumentasi logis kepada pembaca, bukan untuk menyajikan cerita."
    },
    {
        question: "Apakah ciri utama bahasa ragam ilmiah?",
        answers: [
            "Menggunakan bahasa yang santai dan tidak formal",
            "Banyak menggunakan kata-kata emotif dan kiasan",
            "Menyajikan fakta secara objektif dan sistematis",
            "Menggunakan kalimat percakapan sehari-hari",
        ],
        correct:2,
        hint:"Bahasa ilmiah memiliki ciri khusus yang menekankan pada ketepatan dan objektivitas."
    },
    {
        question: "Manakah yang merupakan contoh kalimat efektif dalam penulisan ilmiah?",
        answers: [
            "Keadaan di lapangan pada saat ini sungguh sangat memprihatinkan.",
            "Studi ini meneliti dampak negatif urbanisasi terhadap lingkungan.",
            "Sesungguhnya permasalahan ini tidaklah terlalu besar dampaknya.",
            "Penelitian ini mungkin bisa jadi memberikan hasil yang tidak signifikan.",
        ],
        correct:1,
        hint:"Kalimat efektif dalam penulisan ilmiah bersifat ringkas, jelas, dan langsung pada inti informasi tanpa kata-kata berlebihan."
    },
];

button1.onclick = nextPage;
let currentPage = sessionStorage.act1;
let clickedAnswer = 0;
let completed = false;
// let draggedItem = null;

function nextPage(){
    if (Number(sessionStorage.act1) == page.length){
        judul.innerHTML = "Selamat!!!";
        soal.innerHTML = "Selamat telah menyelesaikan aktivitas ini sampai akhir! Speller White mengapresiasi kerja kerasmu dan memiliki harapan besar atas rencananya berkat dirimu.\n Sebarkan laman ini untuk menjangkau lebih banyak orang untuk membantu menjalankan rencana Speller White!";
        option1.style.display ="none";
        option2.style.display ="none";
        option3.style.display ="none";
        option4.style.display ="none";
        button1.style.display = "none";
        button2.style.display = "block";
    }
    else{
        option1.style.display ="block";
        option2.style.display ="block";
        option3.style.display ="block";
        option4.style.display ="block";
        button1.innerHTML = "Hint";
    
        judul.innerHTML = "Soal " + (Number(sessionStorage.act1)+1) + " dari 5"
    
        let question = page[Number(sessionStorage.act1)];
        soal.innerHTML = question.question;
    
        option1.innerHTML = question.answers[0];
        option2.innerHTML = question.answers[1];
        option3.innerHTML = question.answers[2];
        option4.innerHTML = question.answers[3];
        option1.onclick = function(){
            clickedAnswer = 0;
            jawab();   
        }
        option2.onclick = function(){
            clickedAnswer = 1;
            jawab();   
        }
        option3.onclick = function(){
            clickedAnswer = 2; 
            jawab();  
        }
        option4.onclick = function(){
            clickedAnswer = 3;
            jawab();   
        }
    
        button1.onclick = hint;
    }
    fetch('/completion-status-1', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email:sessionStorage.email, page:Number(sessionStorage.act1)})
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

function hint(){
    soal.innerHTML = page[Number(sessionStorage.act1)].hint;
}

function jawab(){
    if (clickedAnswer == page[Number(sessionStorage.act1)].correct){
        soal.innerHTML = page[Number(sessionStorage.act1)].question;
        soal.innerText+= "\n\nJawabanmu Benar!!\nSilahkan klik tombol dibawah untuk melanjutkan"
        option1.onclick = null;
        option2.onclick = null;
        option3.onclick = null;
        option4.onclick = null;

        button1.innerHTML = "Lanjutkan"
        sessionStorage.act1++;
        button1.onclick = nextPage;


    }
    else {
        soal.innerHTML = page[Number(sessionStorage.act1)].question;
        soal.innerText+= "\n\nJawabanmu salah!!"
    }
}




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