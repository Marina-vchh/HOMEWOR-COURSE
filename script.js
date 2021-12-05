const drawList = (dataType, area) => {
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
      })
}

const deleteBtn = (dataType, event) => {
   const card = event.target.closest('.card');
   const titleDelete = card.querySelector('.title').textContent;
   const descriptionDelete = card.querySelector('.description').textContent;
   dataType.forEach((element, index) => {
      if(element.title === titleDelete && element.description === descriptionDelete){
         dataType.splice(index, 1)
      }
   })
}

const editButton = (dataType, area, event) => {
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
      drawList(dataType, area)
   })
}

const nextButton = (dataType, dataType2, area, event) => {
   const cardNext = event.target.closest('.card');
   const titleNext = cardNext.querySelector('.title').textContent;
   const descriptionNext = cardNext.querySelector('.description').textContent;
      dataType.forEach((element, index) => {
      if(element.title === titleNext && element.description === descriptionNext) {
      dataType2 = dataType2.concat(dataType);
      dataType.splice(index, 1);
      console.log(dataType2)
      }
   drawList(dataType2, area);
   })
}


const init = () => {
   const todolist = document.querySelector('.todolist');
   const todoSection = document.querySelector('#todo');
   const inProgressList = document.querySelector('#inProgress');
   const inProgressWrapper = document.querySelector('#progress-wrapper');
   const form = document.querySelector('#form');
   const inputTitle = document.querySelector('#inputTitle');
   const inputDescription = document.querySelector('#inputDescription');
   const btn = document.querySelector('#btn');

   const data = {
      todo: [],
      inProgress: [],
      done: [],
   };

   btn.addEventListener('click', (event) => {
      event.preventDefault();
   
      data.todo.push({
         title: inputTitle.value,
         description: inputDescription.value,
         })
         
      form.reset();

      drawList(data.todo, todoSection);
      }); 

      todolist.addEventListener('click', (event) => {
         switch(event.target.classList.value) {
            case 'deleteButton':
               deleteBtn(data.todo, event)
               drawList(data.todo, todoSection)
               break;

            case 'editButton':
               editButton(data.todo, todoSection, event)
               break;
            case 'nextButton':
               nextButton(data.todo, data.inProgress, inProgressList, event);
               drawList(data.todo, todoSection)
            break;
            default:
               break;
         }
      })
      inProgressWrapper.addEventListener('click', (event) => {
         data.inProgress.push({
            title: inputTitle.value,
            description: inputDescription.value,
         })
         switch(event.target.classList.value) {
            case 'deleteButton':
               deleteBtn(data.inProgress, event);
               drawList(data.inProgress, inProgressList)
               break;
            case 'editButton':
               editButton(data.inProgress, inProgressList, event)
               break;
            default:
            break;
         }
      })
}
   init()




