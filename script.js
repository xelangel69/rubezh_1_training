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

function toHex(num) {
    let val = num & 0xFFFF; 
    let hex = val.toString(16).toUpperCase();
    while (hex.length < 4) hex = "0" + hex;
    return hex;
}

function checkAnswer() {
    const getHex = (id) => document.getElementById(id).value.trim().toUpperCase();
    const getSelect = (id) => document.getElementById(id).value;

    const answers = {
        X: getHex('ansX'),
        Y: getHex('ansY'),
        R: getHex('ansR'),
        V: getSelect('ansOverflow'),
        C: getSelect('ansCarry')
    };

    const sum = currentX + currentY;
    const isV = sum > 32767 || sum < -32768;
    const isC = ((currentX & 0xFFFF) + (currentY & 0xFFFF)) > 0xFFFF;

    const correct = {
        X: toHex(currentX),
        Y: toHex(currentY),
        R: toHex(sum),
        V: isV ? 'yes' : 'no',
        C: isC ? 'yes' : 'no'
    };

    const isAllCorrect = Object.keys(correct).every(key => answers[key] === correct[key]);

    const rows = [
        { label: 'X', ans: answers.X, ref: correct.X },
        { label: 'Y', ans: answers.Y, ref: correct.Y },
        { label: 'R', ans: answers.R, ref: correct.R },
        { label: 'Переполнение', ans: answers.V === 'yes' ? 'Да' : 'Нет', ref: isV ? 'Да' : 'Нет', raw: answers.V === correct.V },
        { label: 'Перенос', ans: answers.C === 'yes' ? 'Да' : 'Нет', ref: isC ? 'Да' : 'Нет', raw: answers.C === correct.C }
    ];

    let correctCount = 0;

    const resultHTML = rows.map(row => {
        const isOk = row.raw !== undefined ? row.raw : row.ans === row.ref;
        if (isOk) {
            correctCount++;
        }
        return `<p>${row.label}: <b>${row.ans}</b> | Правильный ответ: <b>${row.ref}</b> ${isOk ? '✅' : '❌'}</p>`;
    }).join('');

    document.getElementById('resultOutput').innerHTML = `
        <div class="result-box ${isAllCorrect ? 'success' : 'error'}">
            <h3>Результат проверки (${correctCount}/5 решено верно):</h3>
            ${resultHTML}
            ${isV ? `<br><i>Объяснение переполнения: сумма ${sum} не влезает в диапазон [-32768, 32767].</i></br>` : ''}
        </div>`;
}