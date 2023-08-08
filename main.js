// Этап 1. В HTML файле создайте верстку элементов, которые будут статичны(неизменны).

// Этап 2. Создайте массив объектов студентов.Добавьте в него объекты студентов, например 5 студентов.

const table = document.querySelector('.st-tabel');
const formContainer = document.querySelector('.form-container');

let nowDate = new Date();

const studentsList = [
    { fullName: "Ivan Ivan Ivan", faculty: "Math", birthDate: "2000-02-01", yearsOfEducation: "2018" },
    { fullName: "Andrey Andrey Andrey", faculty: "Geometry", birthDate: "2005-11-01", yearsOfEducation: "2019" },
    { fullName: "MiEgor Egor Egor", faculty: "Math", birthDate: "2001-11-11", yearsOfEducation: "2020" },
    { fullName: "Mila Mila Mila", faculty: "English", birthDate: "2001-12-12", yearsOfEducation: "2023" },
    { fullName: "Wolf Wolf Wolf", faculty: "Math", birthDate: "2019-18-5", yearsOfEducation: "2016" },
]

// Этап 3. Создайте функцию вывода одного студента в таблицу, по аналогии с тем, как вы делали вывод одного дела в модуле 8. Функция должна вернуть html элемент с информацией и пользователе.У функции должен быть один аргумент - объект студента.

function getStudentItem(studentObj) {
    const oneRow = document.createElement('tr');
    oneRow.classList.add('st-row');


    const Column1 = document.createElement('td');
    Column1.textContent = studentObj.fullName
        .replace(/ +/g, ' ')
        .trim()
        .split(" ")
        .map(elem => elem[0])
        .join(".");

    const Column2 = document.createElement('td');
    Column2.textContent = studentObj.faculty
        .replace(/ +/g, ' ')
        .trim();

    const Column3 = document.createElement('td');
    Column3.textContent = studentObj.birthDate
        .split('-')
        .reverse()
        .join(".") +
        " (" + (nowDate.getFullYear() - Number(studentObj.birthDate.split('-')[0])) + ")";

    const Column4 = document.createElement('td');
    let howLongStudy = nowDate.getFullYear() - studentObj.yearsOfEducation;
    Column4.textContent = studentObj.yearsOfEducation + "-" + (Number(studentObj.yearsOfEducation) + 4) +
        " (" +
        (howLongStudy <= 4 ? howLongStudy == 0 ? 1 : howLongStudy : "закончил ") + "курс)";


    oneRow.append(Column1);
    oneRow.append(Column2);
    oneRow.append(Column3);
    oneRow.append(Column4);
    //возвращаем tr с td
    return oneRow;
}

// Этап 4. Создайте функцию отрисовки всех студентов. Аргументом функции будет массив студентов.Функция должна использовать ранее созданную функцию создания одной записи для студента.Цикл поможет вам создать список студентов.Каждый раз при изменении списка студента вы будете вызывать эту функцию для отрисовки таблицы.

function renderStudentsTable(studentsArray) {

    //удаляем все из таблицы
    let oldStudentsList = document.querySelectorAll('.st-row');
    for (let oldST of oldStudentsList) {
        table.removeChild(oldST);
    }

    //заново загружаем все из таблицы
    for (let student of studentsArray) {
        let tr = getStudentItem(student);
        table.append(tr);
    }

}





function start() {

    const btn = document.querySelector(".form-btn");
    //клик по кнопке формы
    btn.addEventListener('click', (e) => {

        const inpFullname = document.querySelector('.inp-name');
        const inpFuculty = document.querySelector('.inp-fuculty');


        const inpBirthDate = document.querySelector('.inp-birth');
        const inpYearsOfEducation = document.querySelector('.inp-edu');
        const formMistake = document.querySelector('.form-mistake');

        e.preventDefault();
        //если все поля корректы 
        let isRealBirth = Number(inpBirthDate.value.split('-')[0]) >= 1900 && Number(inpBirthDate.value.split('-')[0]) <= 2023;
        let isRealYearsOfEducation = Number(inpYearsOfEducation.value) >= 2000 && Number(inpYearsOfEducation.value) <= 2023;

        if (inpFullname.value.trim().length > 0 && inpFuculty.value.trim().length > 0 && isRealBirth && isRealYearsOfEducation) {
            studentsList.push({ fullName: inpFullname.value, faculty: inpFuculty.value, birthDate: inpBirthDate.value, yearsOfEducation: inpYearsOfEducation.value });
            renderStudentsTable(studentsList);
            formMistake.textContent = "Данные успешно отправлены";
            formMistake.style.color = "black";
            document.querySelectorAll('input').forEach(el => el.value = '');

        } else {

            const formMistake = document.querySelector('.form-mistake');
            formMistake.textContent = "Ошибка при вводе данных!";
            formMistake.style.color = "red";
        }
    })

    //сортировка по ФИО
    const fullNameColumn = document.querySelector('.fullName');
    fullNameColumn.addEventListener('click', () => {


        function rebuild(name) {
            return name
                .replace(/ +/g, ' ')
                .trim()
                .split(" ")
                .map(elem => elem[0])
                .join("");

            //получаем строку ФИО
        }
        studentsList.sort((a, b) => rebuild(a.fullName) > rebuild(b.fullName) ? 1 : -1)
        renderStudentsTable(studentsList);

    })

    //сортировка по факультету
    const facultyColumn = document.querySelector('.faculty');
    facultyColumn.addEventListener('click', () => {
        studentsList.sort((a, b) => a.faculty > b.faculty ? 1 : -1)
        renderStudentsTable(studentsList);

    })


    //сортировка по году рождения


    const birthDateColumn = document.querySelector('.birthDate');
    birthDateColumn.addEventListener('click', () => {


        function sortDate(a, b) {

            let aDate = new Date(a.birthDate);
            let bDate = new Date(b.birthDate);


            return Number(aDate.getTime()) - Number(bDate.getTime());

        }
        studentsList.sort(sortDate);
        console.log(studentsList);
        renderStudentsTable(studentsList);

    })

    //сортировка по году постепления 
    const yearsOfEducationColumn = document.querySelector('.yearsOfEducation');
    yearsOfEducationColumn.addEventListener('click', () => {
        studentsList.sort((a, b) => Number(a.yearsOfEducation) > Number(b.yearsOfEducation) ? 1 : -1)
        renderStudentsTable(studentsList);

    })


    const findName = document.querySelector('.find-name');
    const findFaculty = document.querySelector('.find-faculty');
    const findBirth = document.querySelector('.find-birth');
    const findYear = document.querySelector('.find-year');

    const findBtn = document.querySelector('.find-btn');



    findBtn.addEventListener('click', (e) => {
        e.preventDefault();


        const allFindInp = document.querySelectorAll('.form-find input');


        let filtredTabel = studentsList.filter(student => {
            let filter = student.fullName.includes(allFindInp[0].value) && allFindInp[0].value != '' ||
                student.faculty.includes(allFindInp[1].value) && allFindInp[1].value != '' ||
                student.birthDate == allFindInp[2].value && allFindInp[2].value != '' ||
                student.yearsOfEducation == allFindInp[3].value && allFindInp[3].value != '';

            return filter;

        });
        // console.log(filtredTabel);

        renderStudentsTable(filtredTabel);




    })


    //вернуть всех студентов
    const reFindBtn = document.querySelector('.refind-btn');

    reFindBtn.addEventListener('click', (e) => {
        e.preventDefault();

        renderStudentsTable(studentsList);
        // document.querySelectorAll('input').forEach(el => el.value = '');

    })

    //генерируем таблицу
    renderStudentsTable(studentsList);
}



start();
// Этап 5. К форме добавления студента добавьте слушатель события отправки формы, в котором будет проверка введенных данных.Если проверка пройдет успешно, добавляйте объект с данными студентов в массив студентов и запустите функцию отрисовки таблицы студентов, созданную на этапе 4.


// Этап 5. Создайте функцию сортировки массива студентов и добавьте события кликов на соответствующие колонки.

// Этап 6. Создайте функцию фильтрации массива студентов и добавьте события для элементов формы.