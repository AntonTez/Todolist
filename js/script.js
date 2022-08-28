const addBtn = document.querySelector('.todolist__btn--add');
const ul = document.querySelector('.todolist__tasks');
const input = document.querySelector('.todolist__input');
const filters = document.querySelector('.filters');
const clearCompleteBtn = document.querySelector('.clear-completed');
let arrayOfTasks = [];


addBtn.addEventListener('click', function(e) {
   if (input.value !== '') {
      const element = {};

      element.complete = false;
      element.todo = input.value;
      arrayOfTasks.push(element);
   }
   render(arrayOfTasks);
   input.value = '';
});

ul.addEventListener('click', function(e) {
   const target = e.target;
   if (target.tagName === 'LI') {
      if (target.classList.contains("tasks__item--checked")) {
         changeTaskStatus(target.textContent, false);
         target.classList.remove("tasks__item--checked");
      } else {
         changeTaskStatus(target.textContent, true);
         target.classList.add("tasks__item--checked");
      }
      showCountOfLeftTasks();
   }
});

filters.addEventListener('click', function(e) {
   const target = e.target;
   const status = target.textContent.trim().toLowerCase();

   if (target.classList.contains('filters__item')) {
      filterByStatus(status);
   }
});

clearCompleteBtn.addEventListener('click', function(e) {
   arrayOfTasks = arrayOfTasks.filter(el => el.complete == false);
   render(arrayOfTasks);
});


function render(arr) {
   ul.innerHTML = '';
   arr.forEach(el => {
      const li = document.createElement('li');
      // const removeBtn = document.createElement('span');

      li.textContent = el.todo;
      // removeBtn.textContent = 'X';
      // removeBtn.classList.add('delete');
      // li.appendChild(removeBtn);
      if(el.complete) {
         li.classList.add('tasks__item--checked');
      }
      ul.appendChild(li);
   });
   showCountOfLeftTasks();
};

function changeTaskStatus(element, status) {
   arrayOfTasks.forEach(item => {
      if(item.todo === element) {
         item.complete = status;
         console.log(arrayOfTasks);
      }
   })
}

function showCountOfLeftTasks() {
   const count = document.querySelector('.left__count');
   const array = arrayOfTasks.filter(el => el.complete == false);

   count.textContent = array.length;
}

function filterByStatus(status) {
   console.log(status);
   if (status === 'all') {
      render(arrayOfTasks);
   }
   if (status === 'active') {
      const array = arrayOfTasks.filter(el => el.complete == false);

      render(array);
   }
   if (status === 'complete') {
      const array = arrayOfTasks.filter(el => el.complete == true);

      render(array);
   }
}



