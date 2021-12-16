const common = (data, eventTarget) => {
   const sectionId = eventTarget.closest('.section').id;
   const card = eventTarget.closest('.card');
   const cardId = +card.id;
   const selectedCard = data[sectionId].filter((card) => card.id === cardId)[0];
   const selectedCardIndex = data[sectionId].findIndex((card) => card.id === selectedCard.id);
   return{sectionId, selectedCard, selectedCardIndex}
};

const drawList = (data, sectionType) => {
   const section = document.querySelector(`#${sectionType}`)
   section.innerHTML = '';
      data[sectionType].forEach((item) => {
         section.innerHTML += `
         <div class="card" id = '${item.id}'>
            <span class = "span">Title:</span>
            <span class = "title">${item.title}</span>
            <br />
            <span class = "span">Description:</span>
            <span class="description">${item.description}</span>
            <br />
            ${ sectionType !== 'deleted' ?
            `<div class = "card__buttons">
            <button class="editButton"></button>
            <button class="deleteButton"></button>
            <button class="nextButton"></button>`
            :`<button class="restoreButton"></button>
            </div>`
            }
            </div>`

      });
}

const addCard = (data) => {
   const inputTitle = document.querySelector('#inputTitle');
   const inputDescription = document.querySelector('#inputDescription');
   const form = document.querySelector('#form');
      data.todo.push({
         title: inputTitle.value,
         description: inputDescription.value,
         id: Date.now(),
         })
   form.reset();
   drawList(data, 'todo');
}

const editButton = (data, eventTarget) => {
   const {sectionId, selectedCard, selectedCardIndex} = common(
      data, eventTarget);
   
   const modalWrapper = document.querySelector('.wrapper-modal');
   const input_modal_title = document.querySelector('#input_modal_title');
   const input_modal_description = document.querySelector('#input_modal_description');
   modalWrapper.style.display = 'block';
   input_modal_title.value = selectedCard.title;
   input_modal_description.value = selectedCard.description;

   const modelSubmit = document.querySelector('#modal__submitId');

   const closeButton = document.querySelector('#closeButton');
   closeButton.addEventListener('click', () => {
      modalWrapper.style.display = 'none'
   })

   const editListenerHandler = () => {
   data[sectionId].splice(selectedCardIndex, 1, {title: input_modal_title.value, description: input_modal_description.value, id: selectedCard.id})

   closeModal()
   }

   const closeModal = () => {
      modelSubmit.removeEventListener('click', editListenerHandler);
      modalWrapper.style.display = 'none'
      drawList(data, sectionId)
   }

   modelSubmit.addEventListener('click', editListenerHandler);
   }

const deleteButton = (data, eventTarget) => {
   const {sectionId, selectedCard, selectedCardIndex} = common(
   data, eventTarget);

   data[sectionId].splice(selectedCardIndex, 1);
   data.deleted.push(selectedCard)

   drawList(data, sectionId)
   drawList(data, "deleted")
}

const nextButton = (data, eventTarget) => {
   const {sectionId, selectedCard, selectedCardIndex} = common(
      data, eventTarget);
   
   const sectionsId = [...document.querySelectorAll('.section')].map((section) => section.id)

   const nextSectionIndex = sectionsId.findIndex((id) => id === sectionId) + 1;

   data[sectionId].splice(selectedCardIndex, 1);
   data[sectionsId[nextSectionIndex]].push(selectedCard);

   drawList(data, sectionId);
   drawList(data, sectionsId[nextSectionIndex])
}

const clearAll = (data) => {
   data.deleted = []
   drawList(data, 'deleted')
};

const restore = (data, eventTarget) => {
   const {sectionId, selectedCard, selectedCardIndex} = common(
   data, eventTarget);
   
   data[sectionId].splice(selectedCardIndex, 1);
   data['todo'].push(selectedCard)
   drawList(data, sectionId);
   drawList(data, 'todo');
}


const init = () => {
   const todolist = document.querySelector('.todolist');
   const btnAdd = document.querySelector('#btnAdd');

   const data = {
      todo: [],
      inProgress: [],
      done: [],
      deleted: [],
   };

   btnAdd.addEventListener('click', () => {
      addCard(data)
      }); 

   todolist.addEventListener('click', (event) => {
      switch(true) {
            case [...event.target.classList].includes('deleteButton'):
               deleteButton(data, event.target)
               break;
            case [...event.target.classList].includes('editButton'):
               editButton(data, event.target)
               break;
            case [...event.target.classList].includes('nextButton'):
               nextButton(data, event.target);
            break;
            case [...event.target.classList].includes('restoreButton'):
               restore(data, event.target);
            case [...event.target.classList].includes('btnClear'):
               clearAll(data);
            default:
               break;
         }
      })
}
init();




