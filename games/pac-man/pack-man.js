document.addEventListener('DOMContentLoaded', function() {
    // הגדרת משתנים וקבועים:
    const scoreDisplay = document.querySelector('#score');
    const width = 28;
    let score = 0;
    const grid = document.querySelector('.grid');
    const layout = [
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
        1, 3, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 3, 1,
        1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
        1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 2, 2, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
        4, 4, 4, 4, 4, 4, 0, 0, 0, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 0, 0, 0, 4, 4, 4, 4, 4, 4,
        1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
        1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
        1, 3, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 3, 1,
        1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1,
        1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1,
        1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
        1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
    ];

    const squares = [];

    // פונקציה ליצירת לוח המשחק
    function createBoard() {
        for (let i = 0; i < layout.length; i++) {
            const square = document.createElement('div');
            square.setAttribute('data-id', i);
            grid.appendChild(square);
            squares.push(square);
            // הוספת המאפיינים הנכונים לכל תא בלוח המשחק בהתאם לתוכן של המערך layout
            if (layout[i] === 0) {
                squares[i].classList.add('pac-dot');
            }
            if (layout[i] === 1) {
                squares[i].classList.add('wall');
            }
            if (layout[i] === 2) {
                squares[i].classList.add('ghost-lair');
            }
            if (layout[i] === 3) {
                squares[i].classList.add('power-pellet');
            }
        }
    }

    createBoard();

    // הגדרת מיקום הפקמן ההתחלתי והוספת הקלאס שלו
    let pacmanCurrentIndex = 490;
    squares[pacmanCurrentIndex].classList.add('pac-man');

    // פונקציה לתנועת הפקמן
    function movePacman(e) {
        squares[pacmanCurrentIndex].classList.remove('pac-man');
        // בדיקת המקש שנלחץ והעברת הפקמן למקום המתאים בהתאם לתנאי
        switch (e.key) {
            case 'ArrowUp':
                if (
                    pacmanCurrentIndex - width >= 0 &&
                    !squares[pacmanCurrentIndex - width].classList.contains('wall') &&
                    !squares[pacmanCurrentIndex - width].classList.contains('ghost-lair')
                )
                    pacmanCurrentIndex -= width;
                break;
            case 'ArrowDown':
                if (
                    pacmanCurrentIndex + width < width * width &&
                    !squares[pacmanCurrentIndex + width].classList.contains('wall') &&
                    !squares[pacmanCurrentIndex + width].classList.contains('ghost-lair')
                )
                    pacmanCurrentIndex += width;
                break;
            case 'ArrowLeft':
                if (
                    pacmanCurrentIndex % width !== 0 &&
                    !squares[pacmanCurrentIndex - 1].classList.contains('wall') &&
                    !squares[pacmanCurrentIndex - 1].classList.contains('ghost-lair')
                )
                    pacmanCurrentIndex -= 1;
                if (pacmanCurrentIndex === 364) {
                    pacmanCurrentIndex = 391;
                }
                break;
            case 'ArrowRight':
                if (
                    pacmanCurrentIndex % width < width - 1 &&
                    !squares[pacmanCurrentIndex + 1].classList.contains('wall') &&
                    !squares[pacmanCurrentIndex + 1].classList.contains('ghost-lair')
                )
                    pacmanCurrentIndex += 1;
                if (pacmanCurrentIndex === 391) {
                    pacmanCurrentIndex = 364;
                }
                break;
        }
        // הוספת הפקמן במיקום החדש ללוח המשחק
        squares[pacmanCurrentIndex].classList.add('pac-man');
        // בדיקה אם הפקמן אכל פלטפורמה (פק-דוט)
        pacDotEaten();
        // בדיקה אם הפקמן אכל כוח (פלטפורמה מיוחדת)
        powerPelletEaten();
        // בדיקה אם המשחק נגמר
        checkForGameOver();
        // בדיקה אם המשחק נגמר בניצחון
        checkForWin();
    }

    document.addEventListener('keydown', movePacman);

    // פונקציה לטיפול במצב בו הפקמן אכל פלטפורמה (פק-דוט)
    function pacDotEaten() {
        if (squares[pacmanCurrentIndex].classList.contains('pac-dot')) {
            squares[pacmanCurrentIndex].classList.remove('pac-dot');
            score++;
            scoreDisplay.textContent = score;
        }
    }

    // פונקציה לטיפול במצב בו הפקמן אכל כוח (פלטפורמה מיוחדת)
    function powerPelletEaten() {
        if (squares[pacmanCurrentIndex].classList.contains('power-pellet')) {
           score += 10;
           scoreDisplay.textContent = score;
           // הופעת הפונקציה לחרדת הרוחות למשך 10 שניות
           ghosts.forEach(ghost => {
               ghost.isScared = true;
           })
           setTimeout(unScareGhosts, 10000);
           squares[pacmanCurrentIndex].classList.remove('power-pellet');
        }
    }
    
    // פונקציה לביטול חרדת הרוחות
    function unScareGhosts() {
        ghosts.forEach(ghost => ghost.isScared = false);
    }

    // בדיקה אם המשחק הסתיים כתוצאה מהתנגשות של הפקמן עם רוח
    function checkForGameOver() {
        if (squares[pacmanCurrentIndex].classList.contains('ghost') && !squares[pacmanCurrentIndex].classList.contains('scared-ghost')) {
            
            document.removeEventListener('keydown', movePacman);
            setTimeout(function() {alert('GAME OVER!');}, 500);
        }
    }

    // בדיקה אם המשחק הסתיים בניצחון
    function checkForWin() {
        if (score === 274) {
            ghosts.forEach(ghost => clearInterval(ghost.timerId));
            document.removeEventListener('keydown', movePacman);
            setTimeout(function() {alert('YOU WIN!');}, 500);
        }
    }

    // קלאס לקריאת נתוני הרוחות
    class Ghost {
        constructor(className, startIndex, speed) {
            this.className = className;
            this.startIndex = startIndex;
            this.speed = speed;
            this.currentIndex = startIndex;
        }
    }

    // רשימת רוחות
    let ghosts = [
        new Ghost('blinky', 348, 250),
        new Ghost('pinky', 376, 400),
        new Ghost('inky', 351, 300),
        new Ghost('clyde', 379, 500)
    ];

    // רשימת רוחות מקבלות מיקום ונראות בלוח המשחק
    ghosts.forEach(ghost => {
        squares[ghost.startIndex].classList.add(ghost.className);
        squares[ghost.startIndex].classList.add('ghost');
    });

    // פונקציה לתנועת הרוחות
    ghosts.forEach(ghost => moveGhost(ghost));

    // פונקציה לתנועת כל רוח
    function moveGhost(ghost) {
        const directions = [-1, +1, width, -width];
        let direction = directions[Math.floor(Math.random() * directions.length)];

        ghost.timerId = setInterval(function() {
            // אם הרוח נתקלה בקיר או ברוח אחרת, היא משנה כיוון
            if (
                !squares[ghost.currentIndex + direction].classList.contains('wall') &&
                !squares[ghost.currentIndex + direction].classList.contains('ghost')
            ) {
                squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost');
                ghost.currentIndex += direction;
                squares[ghost.currentIndex].classList.add(ghost.className, 'ghost');
            } else direction = directions[Math.floor(Math.random() * directions.length)];

            // בדיקה האם הרוח התנגשה בפקמן
            if (ghost.isScared) {
                squares[ghost.currentIndex].classList.add('scared-ghost');
            }

            // בדיקה האם הרוח סיימה את הפלטפורמה שהיא חולפת עליה והפוך לאכולה
            if (squares[ghost.currentIndex].classList.contains('pac-man')) {
                squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost');
                ghost.currentIndex = ghost.startIndex;
                score += 100;
                scoreDisplay.textContent = score;
                squares[ghost.currentIndex].classList.add(ghost.className, 'ghost');
            }

            // בדיקת סיום המשחק
            checkForGameOver();
        }, ghost.speed);
    }
});
