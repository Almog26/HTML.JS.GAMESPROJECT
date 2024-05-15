// מערך שמכיל את המדינות שנבחרו כמועדפות
let likedCountries = [];

// פונקציה לקבלת המידע מהאחסון המקומי (local storage)
const getData = () => {
    // משתנה לאחסון המידע המוצג מהאחסון המקומי
    let data = localStorage.getItem('favouriteCountries');
    // בדיקה האם יש מידע באחסון המקומי ואם לא, יוצרים מידע ריק באחסון
    if (!data) {
        // קבלת הערך 
        localStorage.setItem('favouriteCountries', JSON.stringify(likedCountries));
        //  to save the information 
        data = localStorage.getItem('favouriteCountries');
    }
    // המרת המידע ממחרוזת JSON למערך JavaScript
    likedCountries = JSON.parse(data);
}

// פונקציה לעדכון המידע באחסון המקומי לגבי המדינה המסוימת שנבחרה כמועדפת או לא
const updateData = (countryName) => {
    // בדיקה האם המדינה כבר ברשימת המדינות המועדפות, ואם כן - הסרתה מהרשימה
    if (likedCountries.includes(countryName)) {
        likedCountries = likedCountries.filter((item) => item !== countryName);
    }
    // אם המדינה לא ברשימת המדינות המועדפות, מוסיפים אותה לרשימה
    else {
        likedCountries.push(countryName);
    }
    // עדכון המידע באחסון המקומי
    localStorage.setItem('favouriteCountries', JSON.stringify(likedCountries));
}

// ייצוא הפונקציות והמשתנה לשימוש במקומות אחרים בקוד
export { getData, updateData, likedCountries };
