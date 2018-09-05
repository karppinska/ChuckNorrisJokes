const 
    submitButton = document.querySelector('.btn'),
    input = document.querySelector('#number'),
    dangerAlert = document.querySelector('.alert-danger'),
    jokesContainer = document.querySelector('.jokes'),
    validateInput = function() {
        const isInputValid = input.value && input.value > 0;
        if (!input.value) {
            dangerAlert.innerText = 'Fill in input';
        } else if (input.value < 1) {
            dangerAlert.innerText = 'Number must be greater than zero';
        }
        dangerAlert.classList.toggle('hidden', isInputValid);
        return isInputValid;
    };

input.addEventListener('change', (e) => {
    e.preventDefault();
    validateInput();
});

submitButton.addEventListener('click', (e) => {
    e.preventDefault();
    if (validateInput()) {
        const 
            numberOfJokes = input.value, 
            xhr = new XMLHttpRequest();

        xhr.open('GET', `http://api.icndb.com/jokes/random/${numberOfJokes}`, true);
        xhr.onload = function() {
            if (this.status === 200) {
                const jokes = JSON.parse(this.response).value;
                jokesContainer.innerHTML = '';
                jokes.forEach(element => {
                    jokesContainer.innerHTML += `<p class="lead">${element.joke}</p>`;
                });
            }
        }
        xhr.send();
    }
});
