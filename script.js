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

