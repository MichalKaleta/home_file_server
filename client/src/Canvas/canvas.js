
export default function draw(a) {
   console.log(a);
   let b = a.current
   var ctx = b.getContext("2d");

   ctx.beginPath();
   ctx.rect(20, 40, 50, 50);
   ctx.fillStyle = "#FF0000";
   ctx.fill();
   ctx.closePath();
} 