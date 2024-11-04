function getHandle(className){
    return document.querySelector('.' + className);
}

function getHandleAll(className){
    return document.querySelectorAll('.' + className);
}

function toggleMenu(className){
    return function(){
        const menu = getHandle(className);
        menu.classList.toggle('hidden');
    }
}

function changeSymbol(className){
    return function(){
        const symbol = getHandle(className);
        symbol.textContent = symbol.textContent === '+' ? '-' : '+';
    }
}

function process(){
    const text = getHandle('input-textarea').value;
    const audio = getHandle('audio').files[0];
    let type = text ? 'text' : audio ? 'audio' : 'other';

    let formData = new FormData();
    formData.append('type', type);

    if (text) {
        formData.append('text', text);
    }
    if (audio) {
        formData.append('audio', audio);
    }

    fetch('/process/' + type, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.msg);
    })
    .catch(error => console.error('Error:', error));
}


const advOptToggle = getHandle('adv-opt');
advOptToggle.addEventListener('click', () => {
    toggleMenu('adv-opt-opt')();
    changeSymbol('plus-sign')();
});

const submitBtn = getHandle('submit-btn');
submitBtn.addEventListener('click', () => {
    process();
});