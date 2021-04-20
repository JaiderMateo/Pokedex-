//poscitions
let index = 1;
let i = 1;
let backInterval = -1;
let forwardInterval = -1;
//setectors of buttons
const forwardBtn = document.querySelector('#forwardBtn');
const backBtn = document.querySelector('#backBtn');
const autoForwardBtn = document.querySelector('#autoForwardBtn');
const autoBackBtn = document.querySelector('#autoBackBtn');
const stopBtn = document.querySelector('#stopBtn');
const inputField = document.querySelector('#inputField');
const searchBtn = document.querySelector('#searchBtn');
forwardBtn.addEventListener("click", funForward);
backBtn.addEventListener("click", funBack);
forwardBtn.addEventListener("click",funForward);
backBtn.addEventListener("click", funBack);
searchBtn.addEventListener("click", ()=>{
    index = inputField.value;
    petition();
})
//selectors of information
function changes(data){
    let namePok = document.querySelector(`.pokemon:nth-child(${i}) .name`);
    namePok.innerText = data.name;
    let idPok = document.querySelector(`.pokemon:nth-child(${i}) .idPokemon`);
    idPok.innerText = data.id;
    let imagePok = document.querySelector(`.pokemon:nth-child(${i}) .image`);
    imagePok.src = data.img
    let abilitiesPok = document.querySelector(`.pokemon:nth-child(${i}) .abilities`);
    abilitiesPok.innerHTML = "";
    data.abilities.map(i =>{
        let child = document.createElement('li');
        child.innerText = i;
        abilitiesPok.appendChild(child);
    })
}

autoBackBtn.addEventListener("click", ()=>{
    stopIntervals()
    backInterval = setInterval(()=>funBack() , 1000);
});
autoForwardBtn.addEventListener('click', ()=>{
    stopIntervals()
    forwardInterval = setInterval(()=>funForward() , 1000);
});
stopBtn.addEventListener('click', stopIntervals);
function stopIntervals(){
    clearInterval(backInterval);
    clearInterval(forwardInterval);
}

async function petition(){
    await fetch(`https://pokeapi.co/api/v2/pokemon/${index}`)
    .then(Response => Response.json())
    .then(pokemon =>{
        let data = {
            name: pokemon.name,
            id: pokemon.id,
            img: pokemon.sprites.front_default,
            abilities: Object.values(pokemon.abilities).map(i=>i.ability.name),
        }
        index = data.id;
        changes(data);
    })
}

function funForward(){
    if(index > 895){index = -1;}
    index++;
    petition();
    console.log(index);
    console.log(inputField.value);
}
function funBack(){
    if(index <= 1){index = 895;}
    index--;
    petition();
    console.log(index);
}
petition();
