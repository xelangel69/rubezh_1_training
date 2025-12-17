let currentX, currentY;

function seededRandom(seed) {
    let x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}

function generateTask() {
    const variant = document.getElementById('variant').value;
    if (!variant || variant < 0) {
        alert("Неккоректно введен номер варианта!");
    return;
}

let seed = parseInt(variant);
            
let rand1 = seededRandom(seed);
currentX = Math.floor(rand1 * 64000) - 32000;
            
let rand2 = seededRandom(seed + 1);
currentY = Math.floor(rand2 * 64000) - 32000;

document.getElementById('numX').innerText = currentX;
document.getElementById('numY').innerText = currentY;
            
document.getElementById('ansX').value = '';
document.getElementById('ansY').value = '';
document.getElementById('ansR').value = '';
document.getElementById('resultOutput').innerHTML = '';
            
document.getElementById('taskArea').classList.remove('hidden');
}