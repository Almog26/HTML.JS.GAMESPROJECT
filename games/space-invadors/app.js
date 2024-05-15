// הגדרת קבועים ומשתנים
const grid = document.querySelector('.grid'); // בחירת אלמנט ה-HTML שיש לו class "grid"
const scoreDisplay = document.querySelector('.result'); // בחירת אלמנט ה-HTML שיש לו class "result"
const width = 15; // רוחב הלוח
let squares = []; // מערך שיכיל את כל ריבועי המשבצות בלוח
let currentShooterIndex = 202; // האינדקס הנוכחי של החייל
let result = 0; // התוצאה הנוכחית של המשחק
let aliensRemoved = []; // מערך שיכיל את החייזרים שהושמדו
let direction = 1; // כיוון התנועה של החייזרים
let invaderId; // מזהה המשחק של החייזרים

// מערך שיכיל את האינדקסים של החייזרים בלוח
const alienInvaders = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
    30, 31, 32, 33, 34, 35, 36, 37, 38, 39
];

// יצירת הלוח
function createBoard() {
    for (let i = 0; i < width * width; i++) {
        const square = document.createElement('div'); // יצירת אלמנט div
        grid.appendChild(square); // הוספת האלמנט ללוח
        squares.push(square); // הוספת האלמנט למערך של הריבועים
    }
}

// הוספת החייזרים ללוח
function addInvaders() {
    alienInvaders.forEach(invader => squares[invader].classList.add('invader'));
}

// הוספת החייל הראשי ללוח
function addShooter() {
    squares[currentShooterIndex].classList.add('shooter');
}

// תזוזת החייל הראשי
function moveShooter(e) {
    squares[currentShooterIndex].classList.remove('shooter'); // הסרת החייל הנוכחי
    switch (e.key) {
        case 'ArrowLeft':
            if (currentShooterIndex % width !== 0) currentShooterIndex -= 1; // בדיקה האם החייל לא נמצא בקצה השמאלי של הלוח
            break;
        case 'ArrowRight':
            if (currentShooterIndex % width < width - 1) currentShooterIndex += 1; // בדיקה האם החייל לא נמצא בקצה הימני של הלוח
            break;
    }
    squares[currentShooterIndex].classList.add('shooter'); // הוספת החייל הנוכחי למיקום החדש
}

// תזוזת החייזרים
function moveInvaders() {
    const leftEdge = alienInvaders[0] % width === 0; // האם החייזרים מגיעים לקצה השמאלי של הלוח
     // האם החייזרים מגיעים לקצה הימני של הלוח
    const rightEdge = alienInvaders[alienInvaders.length - 1] % width === width - 1;
    if ((leftEdge && direction === -1) || (rightEdge && direction === 1)) {
        direction = width; // שינוי כיוון תנועה כאשר מגיעים לקצה של הלוח
    } else if (direction === width) {
        if (leftEdge) direction = 1; // שינוי כיוון כאשר החייזרים מגיעים לקצה השמאלי של הלוח
        else direction = -1; // שינוי כיוון כאשר החייזרים מגיעים לקצה הימני של הלוח
    }
    for (let i = 0; i <= alienInvaders.length - 1; i++) {
        squares[alienInvaders[i]].classList.remove('invader'); // הסרת החייזר הנוכחי מהמיקום הקודם
        alienInvaders[i] += direction; // תנועה של החייזר למיקום הבא
    }
    for (let i = 0; i <= alienInvaders.length - 1; i++) {
        if (!aliensRemoved.includes(i)) {
            squares[alienInvaders[i]].classList.add('invader'); // הוספת החייזר למיקום החדש
        }
    }

    // בדיקות לסיום המשחק
    if (squares[currentShooterIndex].classList.contains('invader', 'shooter')) {
        scoreDisplay.innerHTML = 'GAME OVER'; // הצגת הודעת סיום המשחק
        clearInterval(invaderId); // הפסקת התנועה של החייזרים
        squares[currentShooterIndex].classList.remove('shooter'); // הסרת החייל הנוכחי
    }

    if (aliensRemoved.length === alienInvaders.length) {
        scoreDisplay.innerHTML = 'YOU WIN'; // הצגת הודעת ניצחון
        clearInterval(invaderId); // הפסקת התנועה של החייזרים
    }

 
}

// הפעלת הירי
function shoot(e) {
    let laserId; // מזהה עבור הלייזר
    let currentLaserIndex = currentShooterIndex; // המיקום הנוכחי של הלייזר
    function moveLaser() {
        squares[currentLaserIndex].classList.remove('laser'); // הסרת הלייזר מהמיקום הנוכחי
        currentLaserIndex -= width; // תנועה למעלה של הלייזר
        if (currentLaserIndex >= 0) {
            squares[currentLaserIndex].classList.add('laser'); // הוספת הלייזר למיקום החדש
            if (squares[currentLaserIndex].classList.contains('invader')) {
                squares[currentLaserIndex].classList.remove('laser', 'invader'); // הסרת הלייזר והחייזר שנפגע
                squares[currentLaserIndex].classList.add('boom'); // הוספת אנימציה של פיצוץ
                // הסרת האנימציה של פיצוץ
                setTimeout(() => squares[currentLaserIndex].classList.remove('boom'), 300); 
                clearInterval(laserId); // הפסקת תנועת הלייזר
                const alienRemovedIndex = alienInvaders.indexOf(currentLaserIndex); // מציאת החייזר שנפגע
                aliensRemoved.push(alienRemovedIndex); // הוספת החייזר לרשימה של החייזרים שנפגעו
                result++; // עדכון התוצאה
                scoreDisplay.innerHTML = result; // הצגת התוצאה
            }
        } else {
            clearInterval(laserId); // הפסקת תנועת הלייזר כאשר מגיעים לקצה העליון של הלוח
        }
    }
    switch (e.key) {
        case 'ArrowUp':
            laserId = setInterval(moveLaser, 100); // הפעלת תנועת הלייזר
            break;
    }
}

// התחלת המשחק
function gamesraction() {
    createBoard(); // יצירת הלוח
    addInvaders(); // הוספת החייזרים ללוח
    addShooter(); // הוספת החייל הראשי ללוח
    invaderId = setInterval(moveInvaders, 500); // הפעלת תנועת החייזרים
    document.addEventListener('keydown', moveShooter); // הפעלת תנועת החייל הראשי
    document.addEventListener('keydown', shoot); // הפעלת הירי
}

gamesraction(); // התחלת המשחק
