// jQuery(document).ready(function($) {

    // form submition method
    $('#todo-form').on('submit' , submitFunction);

    // Selecting 'ul' elements from DOM to render data dynamically
    const ul = document.querySelector('#todo-items');

    function submitFunction(e) {
        e.preventDefault(); // Prevent Default Behaviour
        console.log('Form Submited');
        createTodoList(ul); // Single Todo Create Function
    }


    // Creating single todo item
    function createTodoList(ul, value) {

        // keypress function for 'form'
        $('#todo-list-item').on('keypress' , keyPressFunction)
        // click function for 'button'
        $('.btn').on('click' , clickFunction)

        // cheeking if user press 'Enter' key 
        function keyPressFunction(e) {
            if(e.keyCode === 13) { 
                let value = e.target.value;
                e.target.value = '';
                if(value === '' ) {
                    console.log('Do nothing for now');
                } else {
                    newTodoList(ul, value)
                }
            }
        }
        // Set Click Function
        function clickFunction(e) {
            Array.from($('#todo-list-item')).map(input => {
                let value = input.value;
                if(value == '' ) {
                    console.log('Do nothing for now');
                } else {
                    newTodoList(ul, value);
                    input.value = ''; 
                }
            })
           
        }


    }

    


    // BookList Creator Function
    function newTodoList(ul,value) {

        // create 'li'
        let li = document.createElement('li');
        li.className = 'list-group-item d-flex text-left';


        // create 'a' inside of each 'li':
        let link = document.createElement('a');
        link.setAttribute('href','#');
        link.className = 'single-todo'; 
        link.innerHTML = value; 
        
         // crete 'checkbox'
         let checkbox = document.createElement('input');
         checkbox.setAttribute('type', 'checkbox');
         checkbox.className = 'checkBox';
         // if checked
         checkbox.addEventListener('click', () => {
             if(checkbox.checked) {
                let deleteTag = document.createElement('del');
                link.classList.add('marked')
                link.innerHTML = ''
                deleteTag.innerHTML = value;
                link.appendChild(deleteTag);
                console.log('Checkbox Checked')
             } else {
                link.innerHTML = value;
                link.classList.remove('marked')
             }
         })
         

        // create delete icon/button inside of each 'li':
        let deleteBtn = document.createElement('span');
        deleteBtn.className = 'delete ml-auto btn btn-danger'
        deleteBtn.innerText = 'X'
        deleteBtn.style.cursor = 'pointer'
        // Event for Delete Button:
        deleteBtn.addEventListener('click', (e) => {
            ul.removeChild(li)
        });

        // Push Method for DOM:
        li.appendChild(checkbox);
        li.appendChild(link);
        li.appendChild(deleteBtn);
        ul.appendChild(li)

        // save todo in localStroge
        const TodoItems = localStorage.setItem('Todo', JSON.stringify(ul.innerHTML))
    }




window.onload = function() {
    const todoValue = JSON.parse(localStorage.getItem('Todo'));
    createTodoList(ul, todoValue)
    ul.innerHTML = todoValue
}