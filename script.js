/* ==========================================
   ELEMENTS
========================================== */

const envelope = document.getElementById("envelope");
const seal = document.getElementById("seal");
const letter = document.getElementById("letter");
const message = document.getElementById("message");
const sound = document.getElementById("openSound");
const hearts = document.getElementById("heartContainer");
const canvas = document.getElementById("petalCanvas");
const ctx = canvas.getContext("2d");

/* ==========================================
   STATE
========================================== */

let opened = false;

/* ==========================================
   MESSAGE
========================================== */

const text = `ขอบคุณที่เปิดซองจดหมายนี้ ❤️

ขอให้ทุกวันของเธอเต็มไปด้วยรอยยิ้ม

ไม่ว่าจะเหนื่อยแค่ไหน

ก็อย่าลืมว่า...

ยังมีคนคนหนึ่ง

คอยเป็นกำลังใจให้เสมอ 🌸`;

message.innerHTML = "";

/* ==========================================
   CANVAS SIZE
========================================== */

function resizeCanvas(){

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);

/* ==========================================
   OPEN ENVELOPE
========================================== */

seal.addEventListener("click", openEnvelope);

function openEnvelope(){

    if(opened) return;

    opened = true;

    envelope.classList.add("open");

    if(sound){

        sound.currentTime = 0;

        sound.play().catch(()=>{});

    }

    seal.animate(
        [
            {
                transform:"translate(-50%,-50%) scale(1)",
                opacity:1
            },
            {
                transform:"translate(-50%,-50%) scale(1.8) rotate(30deg)",
                opacity:0
            }
        ],
        {
            duration:500,
            fill:"forwards"
        }
    );

    setTimeout(typeMessage,900);

    setTimeout(createHearts,600);

}
/* ==========================================
   TYPEWRITER
========================================== */

function typeMessage(){

    message.innerHTML = "";

    let index = 0;

    function typing(){

        if(index >= text.length) return;

        if(text[index] === "\n"){

            message.innerHTML += "<br>";

        }else{

            message.innerHTML += text[index];

        }

        index++;

        setTimeout(typing, 35);

    }

    typing();

}

/* ==========================================
   HEARTS
========================================== */

function createHearts(){

    for(let i = 0; i < 20; i++){

        const heart = document.createElement("div");

        heart.className = "heart";

        heart.textContent = "❤️";

        heart.style.left =
            (window.innerWidth / 2 + (Math.random()*220 - 110)) + "px";

        heart.style.top =
            (window.innerHeight / 2 + 80) + "px";

        heart.style.setProperty(
            "--moveX",
            (Math.random()*180 - 90) + "px"
        );

        heart.style.animationDelay =
            (Math.random() * .4) + "s";

        hearts.appendChild(heart);

        setTimeout(() => {

            heart.remove();

        }, 3500);

    }

}
/* ==========================================
   PETAL CANVAS
========================================== */

const petals = [];

class Petal{

    constructor(){

        this.reset(true);

    }

    reset(first = false){

        this.x = Math.random() * canvas.width;

        this.y = first
            ? Math.random() * canvas.height
            : -20;

        this.size = 8 + Math.random() * 12;

        this.speed = 0.6 + Math.random() * 1.2;

        this.swing = Math.random() * Math.PI * 2;

        this.rotate = Math.random() * 360;

        this.rotateSpeed = -2 + Math.random() * 4;

    }

    update(){

        this.y += this.speed;

        this.swing += 0.02;

        this.x += Math.sin(this.swing) * 0.8;

        this.rotate += this.rotateSpeed;

        if(this.y > canvas.height + 30){

            this.reset();

        }

    }

    draw(){

        ctx.save();

        ctx.translate(this.x, this.y);

        ctx.rotate(this.rotate * Math.PI / 180);

        ctx.font = `${this.size}px serif`;

        ctx.fillText("🌸", 0, 0);

        ctx.restore();

    }

}

/* ==========================================
   CREATE PETALS
========================================== */

for(let i = 0; i < 35; i++){

    petals.push(new Petal());

}

/* ==========================================
   ANIMATION LOOP
========================================== */

function animatePetals(){

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    petals.forEach(petal => {

        petal.update();

        petal.draw();

    });

    requestAnimationFrame(animatePetals);

}

animatePetals();
/* ==========================================
   WAX SEAL PARTICLES
========================================== */

function breakSeal(){

    const rect = seal.getBoundingClientRect();

    for(let i = 0; i < 24; i++){

        const piece = document.createElement("div");

        piece.style.position = "fixed";
        piece.style.left = rect.left + rect.width / 2 + "px";
        piece.style.top = rect.top + rect.height / 2 + "px";

        piece.style.width = "8px";
        piece.style.height = "8px";

        piece.style.borderRadius = "50%";

        piece.style.background = "#d92b67";

        piece.style.pointerEvents = "none";
        piece.style.zIndex = "9999";

        document.body.appendChild(piece);

        const angle = Math.random() * Math.PI * 2;
        const distance = 40 + Math.random() * 60;

        piece.animate(
            [
                {
                    transform: "translate(0,0) scale(1)",
                    opacity: 1
                },
                {
                    transform: `translate(${Math.cos(angle)*distance}px, ${Math.sin(angle)*distance}px) scale(0)`,
                    opacity: 0
                }
            ],
            {
                duration: 700,
                easing: "ease-out",
                fill: "forwards"
            }
        );

        setTimeout(() => piece.remove(), 700);

    }

}

/* ==========================================
   REPLACE OPEN FUNCTION
========================================== */

seal.removeEventListener("click", openEnvelope);

seal.addEventListener("click", () => {

    if(opened) return;

    opened = true;

    breakSeal();

    envelope.classList.add("open");

    if(sound){

        sound.currentTime = 0;

        sound.play().catch(()=>{});

    }

    seal.animate(
        [
            {
                transform:"translate(-50%,-50%) scale(1)",
                opacity:1
            },
            {
                transform:"translate(-50%,-50%) scale(1.8)",
                opacity:0
            }
        ],
        {
            duration:500,
            fill:"forwards"
        }
    );

    setTimeout(typeMessage,900);

    setTimeout(createHearts,600);

});

/* ==========================================
   SMALL PARALLAX
========================================== */

document.addEventListener("mousemove",(e)=>{

    const x=(e.clientX/window.innerWidth-.5)*8;
    const y=(e.clientY/window.innerHeight-.5)*8;

    envelope.style.transform=
        `rotateY(${x}deg) rotateX(${-y}deg)`;

});

/* ==========================================
   MOBILE TOUCH
========================================== */

document.addEventListener("touchmove",(e)=>{

    const t=e.touches[0];

    if(!t) return;

    const x=(t.clientX/window.innerWidth-.5)*6;
    const y=(t.clientY/window.innerHeight-.5)*6;

    envelope.style.transform=
        `rotateY(${x}deg) rotateX(${-y}deg)`;

},{passive:true});

/* ==========================================
   END
========================================== */

console.log("Surprise Letter Loaded ❤️");
