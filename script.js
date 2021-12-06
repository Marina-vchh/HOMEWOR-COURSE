const drawList = (dataType, area, dataType2, area2) => {
   area.innerHTML = '';
      dataType.forEach((item) => {
         area.innerHTML += `
         <div class="card">
            <span class = "span">Title:</span>
            <span class = "title">${item.title}</span>
            <br />
            <span class = "span">Description:</span>
            <span class="description">${item.description}</span>
            <br />
            <div class = "card__buttons">
            <button class="editButton">edit</button>
            <button class="nextButton">next</button>
            <button class="deleteButton">delete</button>
            </div>
         </div>`
      });
      area2.innerHTML = '';
      dataType2.forEach((item) => {
         area2.innerHTML += `
         <div class="card">
            <span class = "span">Title:</span>
            <span class = "title">${item.title}</span>
            <br />
            <span class = "span">Description:</span>
            <span class="description">${item.description}</span>
            <br />
            <div class = "card__buttons">
            <button class="editButton">edit</button>
            <button class="nextButton">next</button>
            <button class="deleteButton">delete</button>
            </div>
         </div>`
      })
}

const deleteBtn = (dataType, area, dataType2, area2, event) => {
   const card = event.target.closest('.card');
   const titleDelete = card.querySelector('.title').textContent;
   const descriptionDelete = card.querySelector('.description').textContent;
   dataType.forEach((element, index) => {
      if(element.title === titleDelete && element.description === descriptionDelete){
         dataType.splice(index, 1)
      }
   })
   drawList(dataType, area, dataType2, area2)
}

const editButton = (dataType, area, dataType2, area2, event) => {
   const modalWrapper = document.querySelector('.wrapper');
   modalWrapper.style.display = 'block';
   const closeButton = document.querySelector('#closeButton');
   closeButton.addEventListener('click', () => (modalWrapper.
   style.display = 'none'));
   const cardEdit = event.target.closest('.card');
   const titleEdit = cardEdit.querySelector('.title').textContent;
   const descriptionEdit = cardEdit.querySelector('.description').textContent;
   const input_modal_title = document.querySelector('#input_modal_title');
   const input_modal_description = document.querySelector('#input_modal_description');
   input_modal_title.value = titleEdit;
   input_modal_description.value = descriptionEdit;
   const modelSubmit = document.querySelector('#model-submit');

   modelSubmit.addEventListener('click', () => {
      dataType.forEach((element, index) => {
         if(element.title === titleEdit && element.description === descriptionEdit){
            dataType.splice(index, 1, {title: input_modal_title.value, description: input_modal_description.value})
            }
         })
      modalWrapper.style.display = 'none'
      drawList(dataType, area, dataType2, area2)
   })
}

const nextButton = (dataType, area, dataType2, area2, event) => {
   const cardNext = event.target.closest('.card');
   const titleNext = cardNext.querySelector('.title').textContent;
   const descriptionNext = cardNext.querySelector('.description').textContent;

      dataType.forEach((element, index) => {
      if(element.title === titleNext && element.description === descriptionNext) {
      dataType2.push({
         title: titleNext,
         description:descriptionNext,
      })
      dataType.splice(index, 1);
      console.log(dataType2)
      }
   })
   drawList(dataType, area, dataType2, area2)
}


const init = () => {
   const todolist = document.querySelector('.todolist');
   const todoSection = document.querySelector('#todo');
   const inProgressList = document.querySelector('#inProgress');
   const inProgressWrapper = document.querySelector('#progress-wrapper');
   const form = document.querySelector('#form');
   const inputTitle = document.querySelector('#inputTitle');
   const inputDescription = document.querySelector('#inputDescription');
   const btnAdd = document.querySelector('#btn');

   const data = {
      todo: [],
      inProgress: [],
      done: [],
   };

   btnAdd.addEventListener('click', (event) => {
      event.preventDefault();
   
      data.todo.push({
         title: inputTitle.value,
         description: inputDescription.value,
         })
      form.reset();

      drawList(data.todo, todoSection, data.inProgress, inProgressList);
      }); 

      todolist.addEventListener('click', (event) => {
         switch(event.target.classList.value) {
            case 'deleteButton':
               deleteBtn(data.todo, todoSection, data.inProgress, inProgressList, event)
               break;

            case 'editButton':
               editButton(data.todo, todoSection, data.inProgress, inProgressList, event)
               break;
            case 'nextButton':
               nextButton(data.todo, todoSection, data.inProgress, inProgressList, event);
            break;
            default:
               break;
         }
      })
      inProgressWrapper.addEventListener('click', (event) => {
         switch(event.target.classList.value) {
            case 'deleteButton':
               deleteBtn(data.inProgress, inProgressList, data.todo, todoSection, event);
               console.log(data.inProgress)
               break;
            case 'editButton':
               editButton(data.inProgress, inProgressList, data.todo, todoSection, event)
               break;
            default:
            break;
         }
      })
}
   init()




