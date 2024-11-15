let draggedItem = null;

const username = document.getElementById("username")
const judul = document.getElementById("judul");
const soal = document.getElementById("desc");
const answer = document.getElementById("answer");
const button1 = document.getElementById("button1");
const button2 = document.getElementById("button2");
const button3 = document.getElementById("button3");
const button4 = document.getElementById("button4");
let rectangles = answer.querySelectorAll('.rectangle');
const originalRectangles = ["rectangle1", "rectangle2", "rectangle3", "rectangle4", "rectangle5"];

const rectangle1 = document.getElementById("rectangle1");
const rectangle2 = document.getElementById("rectangle2");
const rectangle3 = document.getElementById("rectangle3");
const rectangle4 = document.getElementById("rectangle4");
const rectangle5 = document.getElementById("rectangle5");

const page = [
    {
        name:"tutorial",
        judul:"Tutorial",
        recText: ["B","A", "E", "C", "D"],
        answer:["rectangle2","rectangle1", "rectangle4", "rectangle5", "rectangle3"],
        soal: "Silahkan pindahkan kotak sehingga terurut sesuai abjad. Klik tombol konfirmasi jika sudah yakin dengan jawabanmu."
    },
    {
        name:"soal1",
        judul:"Soal 1 dari 5",
        recText: ["bagi manusia." ,"membawa", "tidak selalu", "Kemajuan teknologi", "dampak positif"],
        answer:["rectangle4","rectangle3", "rectangle2", "rectangle5", "rectangle1"],
        soal: 'Susunlah menjadi suatu kalimat dengan pola S-K-P-O-K!'
    },
    {
        name:"soal2",
        judul:"Soal 2 dari 5",
        recText: ["melalui uji klinis tahap ketiga" ,"vaksin COVID-19", "Para peneliti", "di laboratorium Pfizer.", "menemukan"],
        answer:["rectangle3","rectangle5", "rectangle2", "rectangle1", "rectangle4"],
        soal: 'Susunlah menjadi sebuah kalimat dengan pola S-P-O-K-K!'
    },
    {
        name:"soal3",
        judul:"Soal 3 dari 5",
        recText: ["masih banyak daerah terpencil" ,"Meskipun pemerintah telah berupaya", "meningkatkan mutu pendidikan,", "fasilitas memadai.", "yang belum mendapatkan"],
        answer:["rectangle2","rectangle3", "rectangle1", "rectangle5", "rectangle4"],
        soal: 'Susunlah menjadi sebuah kalimat utuh!'
    },
    {
        name:"soal4",
        judul:"Soal 4 dari 5",
        recText: ["ke kolam berenang" ,"Budiono Siregar ", "menjadi kapal laut.", "untuk berlatih", "pergi" ],
        answer:["rectangle2","rectangle5", "rectangle1", "rectangle4", "rectangle3"],
        soal: 'Susunlah menjadi sebuah kalimat utuh!'
    },
    {
        name:"soal5",
        judul:"Soal 5 dari 5",
        recText: ["sulit melintas." ,"sehingga kendaraan", "menjadi licin,", "jalan di desa", "Karena hujan turun deras,"],
        answer:["rectangle5","rectangle4", "rectangle3", "rectangle2", "rectangle1"],
        soal: 'Susunlah menjadi sebuah kalimat utuh!'
    },
    {
        name:"result",
        judul:"Selamat!",
        recText: ["GG","GG", "GG", "GG", "GG"],
        answer:["rectangle1","rectangle2", "rectangle3", "rectangle4", "rectangle5"],
        soal: "Selamat telah menyelesaikan aktivitas ini sampai akhir! Speller White mengapresiasi kerja kerasmu dan memiliki harapan besar atas rencananya berkat dirimu.\n Sebarkan laman ini untuk menjangkau lebih banyak orang untuk membantu menjalankan rencana Speller White!"
    }
]

answer.style.display = "none";
button2.style.display= "none";
button3.style.display= "none";
button4.style.display= "none";

button1.onclick = nextPage;

rectangles.forEach(rectangle => {
    rectangle.addEventListener('dragstart', (e) => {
        draggedItem = rectangle;
        rectangle.style.opacity = '0.5';
    });

    rectangle.addEventListener('dragend', () => {
        draggedItem = null;
        rectangle.style.opacity = '';
    });

    rectangle.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    rectangle.addEventListener('drop', (e) => {
        e.preventDefault();

        if (draggedItem !== rectangle) {
            const allRectangles = Array.from(answer.children);
            const draggedIndex = allRectangles.indexOf(draggedItem);
            const dropIndex = allRectangles.indexOf(rectangle);

            if (draggedIndex < dropIndex) {
                rectangle.parentNode.insertBefore(draggedItem, rectangle.nextSibling);
            } else {
                rectangle.parentNode.insertBefore(draggedItem, rectangle);
            }
        }
    });

        // Mobile touch events
    rectangle.addEventListener('touchstart', (e) => {
        draggedItem = rectangle;
        rectangle.style.opacity = '0.5'; // Make it semi-transparent during touch
    });

    rectangle.addEventListener('touchmove', (e) => {
        e.preventDefault(); // Prevent scrolling while dragging
        const touchLocation = e.targetTouches[0];
        // Move the dragged item with the finger
        rectangle.style.position = 'absolute';
        rectangle.style.left = `${touchLocation.pageX}px`;
        rectangle.style.top = `${touchLocation.pageY}px`;
    });

    rectangle.addEventListener('touchend', (e) => {
        rectangle.style.position = ''; // Reset the position
        rectangle.style.opacity = ''; // Reset opacity
        const allRectangles = Array.from(answer.children); // Get all rectangles
        const dropTarget = document.elementFromPoint(e.changedTouches[0].clientX, e.changedTouches[0].clientY); // Element where the touch ended

        if (draggedItem !== dropTarget && dropTarget && dropTarget.classList.contains('rectangle')) {
            const dropIndex = allRectangles.indexOf(dropTarget); // Get the index of drop target
            const draggedIndex = allRectangles.indexOf(draggedItem); // Get the index of dragged item

            if (draggedIndex < dropIndex) {
                dropTarget.parentNode.insertBefore(draggedItem, dropTarget.nextSibling);
            } else {
                dropTarget.parentNode.insertBefore(draggedItem, dropTarget);
            }
        }
        draggedItem = null; // Clear the dragged item
    });

    // Mobile touch events
    rectangle.addEventListener('touchstart', (e) => {
        draggedItem = rectangle;
        rectangle.style.opacity = '0.5'; // Make it semi-transparent during touch
    });

    rectangle.addEventListener('touchmove', (e) => {
        e.preventDefault(); // Prevent default touch behavior (like scrolling)
        
        const touchLocation = e.targetTouches[0]; // Get the first touch point
        
        // Get half of the rectangle's dimensions (width and height)
        const offsetX = rectangle.offsetWidth / 2;
        const offsetY = rectangle.offsetHeight / 2;
    
        // Set the rectangle's position to ensure it's centered at the touch point
        rectangle.style.position = 'absolute';
        rectangle.style.left = `${touchLocation.pageX - offsetX}px`;
        rectangle.style.top = `${touchLocation.pageY - offsetY}px`;
    });

    rectangle.addEventListener('touchend', (e) => {
        rectangle.style.position = ''; // Reset the position
        rectangle.style.opacity = ''; // Reset opacity
        const allRectangles = Array.from(answer.children); // Get all rectangles
        const dropTarget = document.elementFromPoint(e.changedTouches[0].clientX, e.changedTouches[0].clientY); // Element where the touch ended

        if (draggedItem !== dropTarget && dropTarget && dropTarget.classList.contains('rectangle')) {
            const dropIndex = allRectangles.indexOf(dropTarget); // Get the index of drop target
            const draggedIndex = allRectangles.indexOf(draggedItem); // Get the index of dragged item

            if (draggedIndex < dropIndex) {
                dropTarget.parentNode.insertBefore(draggedItem, dropTarget.nextSibling);
            } else {
                dropTarget.parentNode.insertBefore(draggedItem, dropTarget);
            }
        }
        draggedItem = null; // Clear the dragged item
    });
});

function nextPage(){
    resetList();
    if (Number(sessionStorage.act2)===page.length-1){       
        answer.style.display = "none";
        button1.style.display = "none";
        button4.style.display = "none";
        button3.style.display = "none";
        button2.style.display = "block";
    }
    else{
        answer.style.display = "flex";
        button1.innerText = "Konfirmasi";
        button1.onclick = konfirmasi;
        button4.style.display = "block";
        button3.style.display = "block";
        button3.onclick = resetList;
        button4.onclick = hint;
    }
    judul.innerText = page[Number(sessionStorage.act2)].judul;
    rectangle1.innerText = page[Number(sessionStorage.act2)].recText[0];
    rectangle2.innerText = page[Number(sessionStorage.act2)].recText[1];
    rectangle3.innerText = page[Number(sessionStorage.act2)].recText[2];
    rectangle4.innerText = page[Number(sessionStorage.act2)].recText[3];
    rectangle5.innerText = page[Number(sessionStorage.act2)].recText[4];

    fetch('/completion-status-2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email:sessionStorage.email, page:Number(sessionStorage.act2)})
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

function toggle(rec){
    if(rec.style.display === "none"){
        rec.style.display = "block";
    }
    else{
        rec.style.display = "none";
    }
}

function getAnswerSequence() {
    rectangles = answer.getElementsByClassName('rectangle'); // Get all <li> elements with class 'rectangle'

    let sequence = [];
    for (let i = 0; i < rectangles.length; i++) {
        sequence.push(rectangles[i].id);
    }
    return sequence;
}

function konfirmasi(){
    let input = getAnswerSequence();
    let benar = true ;
    for (let i=0;i<5;i++){
        if(input[i]!==page[Number(sessionStorage.act2)].answer[i]){
            benar = false;
        }

    }
    if (benar){
        soal.innerText = page[Number(sessionStorage.act2)].soal;
        soal.innerText += "\n\nJawabanmu benar! Silahkan klik tombol lanjut untuk pindah ke soal berikutnya.";
        button1.innerText = "Lanjut";
        button3.onclick = null;
        button4.onclick = null;
        sessionStorage.act2++;
        button1.onclick = nextPage;
    }
    else if (!benar){  
        soal.innerText = page[Number(sessionStorage.act2)].soal;
        soal.innerText+= "\n\nJawabanmu masih kurang tepat. Ayo kamu pasti bisa!";
        button1.onclick = konfirmasi;
    }
}

function resetList() {

    while (answer.firstChild) {
        answer.removeChild(answer.firstChild);
    }

    answer.appendChild(rectangle1);
    answer.appendChild(rectangle2);
    answer.appendChild(rectangle3);
    answer.appendChild(rectangle4);
    answer.appendChild(rectangle5);

    soal.innerText = page[Number(sessionStorage.act2)].soal;
}

function hint(){
    let input = getAnswerSequence();
    let count = 0;
    for (let i=0;i<5;i++){
        if(input[i]===page[Number(sessionStorage.act2)].answer[i]){
            count++;
        }
    }
    soal.innerText = page[Number(sessionStorage.act2)].soal;
    soal.innerText += "\n\nHint: Sudah terdapat " + count + " jawaban yang sesuai.";
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

