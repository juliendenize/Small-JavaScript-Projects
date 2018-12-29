const coursesListInCart = document.getElementById("cart-content").lastElementChild;

eventListeners();

function eventListeners() {
    document.getElementById("courses-list").addEventListener("click", addNewCourse);
    coursesListInCart.addEventListener("click", removeCourse);
    document.getElementById("clear-cart").addEventListener("click", clearCart);
    document.addEventListener("DOMContentLoaded", loadCoursesFromLocalStorage);
}

function addNewCourse(event) {
    event.preventDefault();
    const target = event.target;
    if(target.classList.contains("add-to-cart")) {
        const course = target.parentElement.parentElement;
        const courseInfo = getCourseInfo(course);
        addCourseIntoCart(courseInfo);
        addCourseIntoLocalStorage(courseInfo);
    }
}

function getCourseInfo(course) {
    return {
        image: course.querySelector("img").src,
        title: course.querySelector("h4").textContent,
        price: course.querySelector(".price span").textContent,
        id: course.querySelector("a").getAttribute('data-id')   
    };
}

function addCourseIntoCart(courseInfo) {
    const row = document.createElement("tr");
    row.innerHTML =
        `<td><img src="${courseInfo.image}"/></td>
         <td>${courseInfo.title}</td>
         <td>${courseInfo.price}</td>
         <td><a href="#" class="remove" data-id="${courseInfo.id}">X</a>`;
    coursesListInCart.appendChild(row);
}

function removeCourse(event) {
    event.preventDefault();
    const target = event.target;
    if(target.classList.contains("remove")) {
        const courseId = target.getAttribute("data-id");
        target.parentElement.parentElement.remove();
        removeCourseFromLocalStorage(courseId);
    }
}

function clearCart(event) {
    event.preventDefault();
    while((node = coursesListInCart.firstChild)) {
        coursesListInCart.removeChild(node);
    }
    clearLocalStorage();
}

function loadCoursesFromLocalStorage() {
    getCoursesFromLocalStorage().forEach(courseInfo => {
        addCourseIntoCart(courseInfo);
    });
}

function addCourseIntoLocalStorage(courseInfo) {
    const courses = getCoursesFromLocalStorage();
    courses.push(courseInfo);
    localStorage.setItem("courses", JSON.stringify(courses));
}

function getCoursesFromLocalStorage() {
    const localStorageContent = localStorage.getItem("courses");

    let courses;
    if(localStorageContent === null) {
        courses = [];
    }
    else {
        courses = JSON.parse(localStorageContent);
    }
    
    return courses;
}

function removeCourseFromLocalStorage(courseId) {
    courses = getCoursesFromLocalStorage();

    courses.forEach((course, idx) => {
        if(course.id === courseId) {
            courses.splice(idx, 1);
        }
    });

    localStorage.setItem("courses", JSON.stringify(courses));
}

function clearLocalStorage() {
    localStorage.clear();
}