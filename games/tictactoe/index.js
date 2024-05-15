const cells = document.querySelectorAll('.cell'); // מציין את כל התאים בלוח המשחק על פי קבוצת האלמנטים שיש להם קלאס cell
const statusText = document.querySelector('#statusText'); // מציין את הטקסט שמציג את המצב הנוכחי של המשחק
const restartButton = document.querySelector('#restartButton'); // מציין את הכפתור המאפשר איפוס של המשחק

const winConditions = [ // מציין את כל תנאי הניצחון האפשריים במשחק
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let options = ['', '', '', '', '', '', '', '', '']; // מציין את המצב הנוכחי של כל תא בלוח המשחק, התאים מאותחלים לריקים בתחילת המשחק
let currentPlayer = 'X'; // מציין את השחקן הנוכחי - X מתחיל
let running = true; // מציין אם המשחק פועל כרגע - בתחילת המשחק יהיה true

initializeGame(); // קריאה לפונקציה להתחלת המשחק

function initializeGame() { // פונקציה להתחלת המשחק
    cells.forEach((cell, index) => { // לכל תא בלוח המשחק
        cell.addEventListener('click', () => cellClicked(index)); // מוסיף מאזין ללחיצה על התא המקושר לפונקציה cellClicked עם האינדקס של התא כארגומנט
    });
    restartButton.addEventListener('click', restartGame); // מוסיף מאזין ללחיצה על כפתור האיפוס, המקושר לפונקציה restartGame
    updateGameDisplay(); // עדכון תצוגת המשחק
}

function cellClicked(index) { // פונקציה המופעלת כאשר מתבצעת לחיצה על תא בלוח המשחק
    if (options[index] !== '' || !running) { // בודק אם התא במיקום index אינו ריק או שהמשחק אינו פועל
        return; // אם אחד מהתנאים מתקיים, יש ביצוע חזרה ולא נמשיך בביצוע הפונקציה
    }

    options[index] = currentPlayer; // מעדכן את המערך options במיקום index להיות השחקן הנוכחי
    checkWinner(); // בדיקה אם יש ניצחון
    changePlayer(); // מחליף את השחקן הנוכחי
    updateGameDisplay(); // עדכון תצוגת המשחק
}

function checkWinner() { // פונקציה לבדיקת ניצחון
  winConditions.forEach(condition => {
    const [a, b, c] = condition;
    if (options[a] && options[a] === options[b] && options[a] === options[c]) {
        statusText.textContent = `${currentPlayer} ניצח את המשחק`;
        running = false;
    }
});
    if (!options.includes('') && running) { // בדיקה אם יש תיקו
        statusText.textContent = 'תיקו';
        running = false;
    }
}

function changePlayer() { // פונקציה לשינוי השחקן הנוכחי
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // מחליף בין השחקנים X ו-O
}

function restartGame() { // פונקציה לאיפוס המשחק
    currentPlayer = 'X'; // איפוס השחקן הנוכחי
    options = ['', '', '', '', '', '', '', '', '']; // איפוס המערך שמייצג את מצב כל התאים בלוח
    running = true; // המשחק מתחיל מחדש
    statusText.textContent = `${currentPlayer} לשחק`; // עדכון תוצאת המשחק
    updateGameDisplay(); // עדכון תצוגת המשחק
}

function updateGameDisplay() { // פונקציה לעדכון תצוגת המשחק
    cells.forEach((cell, index) => { // לכל תא בלוח המשחק
        cell.textContent = options[index]; // מעדכן את תוכן התא בהתאם למצב הנוכחי
    });
    statusText.textContent = running ? `תור של ${currentPlayer}` : statusText.textContent; // עדכון תיבת הטקסט שמציגה את המצב הנוכחי של המשחק
}

function saveGameState() { // פונקציה לשמירת מצב המשחק
    localStorage.setItem('ticTacToeOptions', JSON.stringify(options)); // שמירת מערך האפשרויות בלוקל סטורז'
    localStorage.setItem('ticTacToeCurrentPlayer', currentPlayer); // שמירת השחקן הנוכחי בלוקל סטורז'
    localStorage.setItem('ticTacToeRunning', running); // שמירת מצב המשחק בלוקל סטורז'
}

window.onload = () => { // בעת טעינת העמוד
    const savedOptions = JSON.parse(localStorage.getItem('ticTacToeOptions')); // טעינת מערך האפשרויות מלוקל סטורז'
    if (savedOptions) { // אם קיימים אפשרויות שמורות
        options = savedOptions; // עדכון מערך האפשרויות
    }
    const savedCurrentPlayer = localStorage.getItem('ticTacToeCurrentPlayer'); // טעינת השחקן הנוכחי מלוקל סטורז'
    if (savedCurrentPlayer) { // אם קיים שחקן נוכחי שמור
        currentPlayer = savedCurrentPlayer; // עדכון השחקן הנוכחי
    }
    const savedRunning = localStorage.getItem('ticTacToeRunning'); // טעינת מצב המשחק מלוקל סטורז'
    if (savedRunning !== null) { // אם קיים מצב משחק שמור
        running = savedRunning === 'true'; // עדכון מצב המשחק
    }
    updateGameDisplay(); // עדכון תצוגת המשחק למצב השמור
};

window.onbeforeunload = saveGameState; // בעת יציאת המשתמש מהעמוד, שמירת מצב המשחק בלוקל סטורז'
