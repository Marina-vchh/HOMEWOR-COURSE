const drawList = (dataType, area, dataType2, area2, dataTypeDone, areaDone, dataTypeDeleted, areaDeleted) => {
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
         <div class="card" id = '${item.id}'>
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
   areaDone.innerHTML = '';
   dataTypeDone.forEach((item) => {
      areaDone.innerHTML += `
      <div class="card" id = '${item.id}'>
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

   areaDeleted.innerHTML = '';
   dataTypeDeleted.forEach((item) => {
      areaDeleted.innerHTML += `
      <div class="card" id = '${item.id}'>
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

const deleteBtn = (dataType, area, dataType2, area2, dataType3, area3, dataTypeDeleted, areaDeletedDelete, event) => {
   const card = event.target.closest('.card');
   const newCard = card.id;
   dataType.forEach((element, index) => {
      if(element.id === newCard){
         dataTypeDeleted.push({
            title: titleDelete,
            description: descriptionDelete,
            id: Date.now(),
         })
         dataType.splice(index, 1)
      }
   })
   drawList(dataType, area, dataType2, area2, dataType3, area3, dataTypeDeleted, areaDeletedDelete)
}

const editButton = (dataType, area, dataType2, area2, dataType3, area3, event) => {
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
      drawList(dataType, area, dataType2, area2, dataType3, area3,)
   })
}

const nextButton = (dataType, area, dataType2, area2, dataType3, area3, dataType4, area4, event) => {
   const cardNext = event.target.closest('.card');
   const titleNext = cardNext.querySelector('.title').textContent;
   const descriptionNext = cardNext.querySelector('.description').textContent;

      dataType.forEach((element, index) => {
      if(element.title === titleNext && element.description === descriptionNext) {
      dataType2.push({
         title: titleNext,
         description: descriptionNext,
      })
      dataType.splice(index, 1);
      }
   })
   drawList(dataType, area, dataType2, area2, dataType3, area3, dataType4, area4)
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
   const doneSection = document.querySelector('#Done');
   const doneWrapper = document.querySelector('#done-wrapper');
   const deleteWrapper = document.querySelector('#deleted-wrapper')
   const deleteSection = document.querySelector('#Deleted');
   const clearBtn = document.querySelector('#btnDelete');

   const data = {
      todo: [],
      inProgress: [],
      done: [],
      deleted: [],
   };

   btnAdd.addEventListener('click', (event) => {
      event.preventDefault();
   
      data.todo.push({
         title: inputTitle.value,
         description: inputDescription.value,
         id: Date.now(),
         })
      form.reset();

      drawList(data.todo, todoSection, data.inProgress, inProgressList, data.done, doneSection, data.deleted, deleteSection,);
      }); 

      todolist.addEventListener('click', (event) => {
         switch(event.target.classList.value) {
            case 'deleteButton':
               deleteBtn(data.todo, todoSection, data.inProgress, inProgressList, data.done, doneSection, data.deleted, deleteSection, event)
               break;

            case 'editButton':
               editButton(data.todo, todoSection, data.inProgress, inProgressList, data.done, doneSection, event)
               break;
            case 'nextButton':
               nextButton(data.todo, todoSection, data.inProgress, inProgressList, data.done, doneSection, data.deleted, deleteSection, event);
            break;
            default:
               break;
         }
      })
      inProgressWrapper.addEventListener('click', (event) => {
         switch(event.target.classList.value) {
            case 'deleteButton':
               deleteBtn( data.inProgress, inProgressList, data.done, doneSection, data.todo, todoSection, data.deleted, deleteSection,  event);
               break;
            case 'editButton':
               editButton(data.inProgress, inProgressList, data.done, doneSection, data.todo, todoSection, event)
               break;
            case 'nextButton':
               nextButton(data.inProgress, inProgressList, data.done, doneSection, data.todo, todoSection, data.deleted, deleteSection,  event)
               break;
            default:
            break;
         }
      })

      doneWrapper.addEventListener('click', (event) => {
         switch(event.target.classList.value) {
            case 'deleteButton':
               deleteBtn( data.done, doneSection, data.inProgress, inProgressList, data.todo, todoSection, data.deleted, deleteSection,  event);
               console.log(data.inProgress)
               break;
            case 'editButton':
               editButton(data.done, doneSection, data.inProgress, inProgressList, data.todo, todoSection, event)
               break;
            case 'nextButton':
               nextButton(data.done, doneSection, data.deleted, deleteSection, data.inProgress, inProgressList, data.todo, todoSection,  event)
               break;
            default:
            break;
         }
      })
      deleteWrapper.addEventListener('click', (event) => {
         switch(event.target.classList.value) {
            case 'deleteButton':
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
      clearBtn.addEventListener('click', () => {
         data.deleted = []
         drawList(data.todo, todoSection, data.inProgress, inProgressList, data.done, doneSection, data.deleted, deleteSection,)
      })

}
   init()




