function landmaker(value, type){
    const nameUrl = 'https://restcountries.com/v3.1/'+type+'/'+value;

    fetch(nameUrl)
        .then(function (response) {
        return response.json();
        })
        .then(countryFunction )
        .catch(err => {
            textIn.innerHTML = ''
            textmaker('Error: ',err, 'p');
        })

}
function countryFunction(respons) {
    textIn.innerHTML = '';
    if(respons.status === 404){
        textmaker('Status: ','Your search could not be found', 'p');
    }
    else if(respons.status){
        textmaker('Status: ',respons.message, 'p');
    }
    else{

        const countryByPopulation = respons.toSorted((countryA, countryB) => countryB.population - countryA.population);
        
        countryByPopulation.forEach(country => {
            textmaker('Name: ',country.name.official,'h2')
            textmaker('Subregion: ',country.subregion,'p');
            textmaker('Capital: ' ,country.capital,'p');
            textmaker('population: ' ,country.population,'p');
            imgmaker(country.flags.png);
        })
    }

    
}

const searchName = document.getElementById('Search');
const formApi = document.getElementById('formApi');
const textIn = document.querySelector('.textDiv')
formApi.addEventListener('submit',getSearch)


function getSearch(event) {
event.preventDefault()
const inputRadio = document.querySelector('[name="rest"]:checked'); 

const value = searchName.value;

landmaker(value, inputRadio.value)


}

function textmaker (prefix, value, tag){
    const element = document.createElement(tag);
    element.innerText = prefix + value;
    textIn.appendChild(element);


    
} 

function imgmaker (value){
    const element = document.createElement('img');
    element.src = value;
    textIn.appendChild(element);
}


