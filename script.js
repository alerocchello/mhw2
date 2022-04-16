/* TODO: inserite il codice JavaScript necessario a completare il MHW! */
function selezione(event) {
    const container = event.currentTarget;
    const check = container.querySelector('.checkbox');
    check.src ="images/checked.png";
    container.classList.remove("shadow");

    const indexToRemove = unselectedboxes.indexOf(container);
    unselectedboxes.splice(indexToRemove,1);
    
    overshadow(container.dataset.questionId, container);
    risposte = container.dataset.choiceId;

    controllaRisposte(container.dataset.questionId, container.dataset.choiceId);
}

function overshadow(id, container) {
    
    for (const box of boxes) {
        if(id === box.dataset.questionId && container !== box)  {
            box.classList.add('shadow');
            const check = box.querySelector('.checkbox');
            check.src ="images/unchecked.png";
        }
    }

}

function controllaRisposte(n_griglia, risp){
    if(n_griglia === "one" ){
        grid[0] = true;
        risposte[0] = risp;
    }
    if(n_griglia === "two" ){
        grid[1] = true;
        risposte[1] = risp;
    }
    if(n_griglia === "three" ){
        grid[2] = true;
        risposte[2] = risp;
    }

    if(grid[0] && grid[1] && grid[2] ) {
        for (const box of boxes) {
            box.removeEventListener('click', selezione);
        }
        showRes(generateRes());
    }
}

function generateRes() {
    
    if(risposte[0] === risposte[1]) {
        return risposte[0];
    }
    if(risposte[0] === risposte[2]) {
        return risposte[0];
    }
    if(risposte[1] === risposte[2]) {
        return risposte[1];
    }
    if (risposte[0] != risposte[1] && risposte[1] != risposte[2]) {
        return risposte[1];
    }
    return null;

}

function showRes(key) {

    const personality = document.querySelector('#result');
    personality.querySelector('h1').textContent = RESULTS_MAP[key].title;
    personality.querySelector('p').textContent = RESULTS_MAP[key].contents;
    personality.classList.remove('hidden');

    const button = document.querySelector('#result')
    button.addEventListener('click', reset)
}

function reset(){
    const res = document.querySelector("#result");
    res.classList.add("hidden");
    risposte.splice(0, 3);
    for (const box of boxes) {
        box.classList.remove('shadow');
        box.addEventListener('click', Selected);
        let ck = box.querySelector('.checkbox').src 
        ck = "images/unchecked.png";
    }
    
}

// Main

const risposte = [];
const grid = [];
const unselectedboxes = [];
const boxes = document.querySelectorAll('.choice-grid div');
for (let box of boxes) {
    box.addEventListener('click', selezione);
    unselectedboxes.push(box);
}