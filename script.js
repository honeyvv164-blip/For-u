/* ==========================================
   ELEMENTS
========================================== */

const envelope = document.getElementById("envelope");
const seal = document.getElementById("seal");
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

const text = `ถึงอ้วน 🤍

ถ้าอ้วนกำลังอ่านอยู่
แสดงว่าอ้วนเปิดซองนี้แล้วนะ

เค้าแค่อยากเขียนอะไรไว้ให้อ้วน
ถึงจะเป็นข้อความสั้น ๆ
แต่เค้าตั้งใจพิมพ์ทุกคำเลย

เค้าอยากให้อ้วนยิ้มเยอะ ๆ
กินข้าวให้ครบ
พักผ่อนให้พอ
แล้วก็อย่าหักโหมมากนะ

เค้าเป็นห่วงอ้วนเสมอ 🤍

แล้วก็…
อย่าลืมรักเค้าเยอะ ๆ ด้วยนะ

เพราะเค้าจะรักอ้วนแบบนี้ไปเรื่อย ๆ

🤍

– จากแฟนที่รักเธอมาก ๆ –`;

message.innerHTML = "";
/* ==========================================
   CANVAS SIZE
========================================== */

function resizeCanvas() {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);
/* ==========================================
   FLOATING HEARTS
========================================== */

function createHearts() {

    const rect = envelope.getBoundingClientRect();

    for (let i = 0; i < 18; i++) {

        const heart = document.createElement("div");

        heart.className = "heart";

        heart.innerHTML = Math.random() > 0.5 ? "❤️" : "🤍";

        heart.style.left =
            rect.left + rect.width / 2 + (Math.random() * 80 - 40) + "px";

        heart.style.top =
            rect.top + rect.height / 2 + "px";

        heart.style.setProperty(
            "--moveX",
            (Math.random() * 220 - 110) + "px"
        );

        heart.style.animationDuration =
            (2.5 + Math.random()).toFixed(1) + "s";

        hearts.appendChild(heart);

        setTimeout(() => {

            heart.remove();

        }, 3500);

    }

}
