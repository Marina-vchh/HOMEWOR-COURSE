const drawList = (dataType, area) => {
   area.innerHTML = '';
      dataType.forEach((item) => {
         area.innerHTML += `
         <div class="card" id = '${item.id}'>
            <span class = "span">Title:</span>
            <span class = "title">${item.title}</span>
            <br />
            <span class = "span">Description:</span>
            <span class="description">${item.description}</span>
            <br />
            ${ area.id === 'todoId' ||  area.id === 'inProgressId' || area.id === 'doneId' ?
            `<div class = "card__buttons">
            <button class="editButton"></button>
            <button class="deleteButton"></button>
            <button class="nextButton"></button>`
            :`<button class="deleteFinal"></button>
            </div>`
            }
            </div>`
      });
}

const addCard = (dataType, area, event) => {
   event.preventDefault();
   const inputTitle = document.querySelector('#inputTitle');
   const inputDescription = document.querySelector('#inputDescription');
   const form = document.querySelector('#form');
      dataType.push({
         title: inputTitle.value,
         description: inputDescription.value,
         id: Date.now(),
         })
      form.reset();
   drawList(dataType, area);
}

const editButton = (dataType, area, event) => {
   const cardEdit = event.target.closest('.card');
   const titleEdit = cardEdit.querySelector('.title').textContent;
   const descriptionEdit = cardEdit.querySelector('.description').textContent;
   
   const modalWrapper = document.querySelector('.wrapper-modal');
   modalWrapper.style.display = 'block';
   const closeButton = document.querySelector('#closeButton');
   closeButton.addEventListener('click', () => (modalWrapper.
   style.display = 'none'));
   const input_modal_title = document.querySelector('#input_modal_title');
   const input_modal_description = document.querySelector('#input_modal_description');
   input_modal_title.value = titleEdit;
   input_modal_description.value = descriptionEdit;
   const modelSubmit = document.querySelector('#modal__submitId');

   modelSubmit.addEventListener('click', () => {
      dataType.forEach((element, index) => {
         if(element.title === titleEdit && element.description === descriptionEdit){
            dataType.splice(index, 1, {title: input_modal_title.value, description: input_modal_description.value, id: Date.now() })
            }
         })
      modalWrapper.style.display = 'none'
      drawList(dataType, area)
   })
}

const deleteBtn = (dataType, area, dataTypeDeleted, areaDeleted, event) => {
   const card = event.target.closest('.card');
   const titleDelete = card.querySelector('.title').textContent;
   const descriptionDelete = card.querySelector('.description').textContent;
   const newCard = card.id;
   dataType.forEach((element, index) => {
      if(element.title === titleDelete && element.description === descriptionDelete && element.id == newCard){
         dataTypeDeleted.push({
            title: titleDelete,
            description: descriptionDelete,
            id: Date.now(),
         })
         dataType.splice(index, 1)
      }
   })
   drawList(dataType, area)
   drawList(dataTypeDeleted, areaDeleted)
}

const nextButton = (dataType, area, dataType2, area2, event) => {
   const cardNext = event.target.closest('.card');
   const titleNext = cardNext.querySelector('.title').textContent;
   const descriptionNext = cardNext.querySelector('.description').textContent;
   const newCardNext = cardNext.id;
      dataType.forEach((element, index) => {
      if(element.title === titleNext && element.description === descriptionNext && element.id == newCardNext) {
      dataType2.push({
         title: titleNext,
         description: descriptionNext,
         id: Date.now(),
      })
      dataType.splice(index, 1);
      }
   })
   drawList(dataType, area);
   drawList(dataType2, area2)
}


const init = () => {
   const todolist = document.querySelector('.todolist');
   const todoSection = document.querySelector('#todoId');
   const inProgressSection = document.querySelector('#inProgressId');
   const doneSection = document.querySelector('#doneId');
   const deleteSection = document.querySelector('#deletedId');
   const btnAdd = document.querySelector('#btnAdd');
   const clearAllButton = document.querySelector('#btnClearAll');

   const data = {
      todo: [],
      inProgress: [],
      done: [],
      deleted: [],
   };

   btnAdd.addEventListener('click', (event) => {
      addCard(data.todo, todoSection, event)
      }); 

   todolist.addEventListener('click', (event) => {
      switch(event.target.classList.value) {
            case 'deleteButton':
               deleteBtn(data.todo, todoSection, data.deleted, deleteSection, event)
               break;

            case 'editButton':
               editButton(data.todo, todoSection, event)
               break;
            case 'nextButton':
               nextButton(data.todo, todoSection, data.inProgress, inProgressSection, event);
            break;
            default:
               break;
         }
      })
   inProgressSection.addEventListener('click', (event) => {
      switch(event.target.classList.value) {
            case 'deleteButton':
               deleteBtn( data.inProgress, inProgressSection, data.deleted, deleteSection,  event);
               break;
            case 'editButton':
               editButton(data.inProgress, inProgressSection, event)
               break;
            case 'nextButton':
               nextButton(data.inProgress, inProgressSection, data.done, doneSection, event)
               break;
            default:
            break;
         }
      })

   doneSection.addEventListener('click', (event) => {
      switch(event.target.classList.value) {
            case 'deleteButton':
               deleteBtn( data.done, doneSection, data.deleted, deleteSection,  event);
               console.log(data.inProgress)
               break;
            case 'editButton':
               editButton(data.done, doneSection, event)
               break;
            case 'nextButton':
               nextButton(data.done, doneSection, data.deleted, deleteSection, event)
               break;
            default:
            break;
         }
      })

   deleteSection.addEventListener('click', (event) => {
         switch(event.target.classList.value) {
            case 'deleteFinal':
               const card = event.target.closest('.card');
               const titleDelete = card.querySelector('.title').textContent;
               const descriptionDelete = card.querySelector('.description').textContent;
               data.deleted.forEach((element, index) => {
                  if(element.title === titleDelete && element.description === descriptionDelete){
                     data.deleted.splice(index, 1)
         }
         drawList(data.deleted, deleteSection);
      })
            break;
            default:
            break;
         }
      })
   clearAllButton.addEventListener('click', () => {
      data.deleted = []
      drawList(data.deleted, deleteSection,)
   })

}
init();




