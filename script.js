const input1 = document.querySelector('#input1')
const input2 = document.querySelector('#input2')
const btn = document.querySelector('#btn')
const info = document.querySelector('#info')
let obj = {}
let data = [];
btn.addEventListener('click', () => {
   data.push({title : input1.value, description: input2.value})
   info.innerHTML += ""
   data.forEach(item => {
      info.innerHTML = `<div class = "info"> 
      <p class = "text">title : ${item.title}</p>
      <p class = "text">description: ${item.description}</p>
      <button class = "inputA"> edit </button>
      <button class = "inputA"> delete </button>
      </div>`
   });  
})




