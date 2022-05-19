const countriesContainer = document.querySelector('.countries-container')
const globalSearch = document.querySelector('.global-search')
const globalInput = document.querySelector('.global-input')
const btnMode = document.querySelector('.btn-mode')
const siteImg = document.querySelector('.site-img')
const siteSpan = document.querySelector('.site-span' )
const owerlay = document.querySelector('.owerlay')
const selectRegion = document.querySelector('#select-region')

let mode = false

btnMode.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode')

    if (mode) {
        siteImg.src = './images/dark-icon.svg'
        siteSpan.textContent = 'Dark mode'
    } else {
        siteImg.src = './images/light-icon.svg'
        siteSpan.textContent = 'Light mode'
    }

    mode = !mode
})

let api = 'https://restcountries.com/v3.1/all'

async function senRequest(url) {
    owerlay.classList.remove('hidden')
    const req = await fetch(url)
    const data = await req.json()
    showData(data)
    owerlay.classList.add('hidden')
}

senRequest(api)

function showData(data) {
    data.forEach((country) => {
        const {name, region, flags, population, capital} = country
        const card = document.createElement('div')
        card.classList.add('card')
        card.setAttribute('id', `${name.common}`)
        card.setAttribute('data-set', `${region}`)
        card.innerHTML = `
        <img class="card-img" src="${flags.png}" alt="rasm" width="264" height="160">

        <h3 class="country-name">${name.common}</h3>

        <ul class="card-list">
            <li class="infolist-item">
                <div>
                    <span class="hero-span"><b>Population:</b></span>
                    <span class="hero-span">${population}</span>
                </div>
            </li>
            <li class="infolist-item">
                <div>
                    <span><b>Region:</b></span>
                    <span>${region}</span>
                </div>
            </li>
            <li class="infolist-item">
                <div>
                    <span><b>Capital:</b></span>
                    <span>${capital ? capital[0] : 'No Capital'}</span>
                </div>
            </li>
            
        </ul>

        <a class='new-2' href='./detail.html?q=${name.common}'>
        <h3 class='countries-heading'>Country information</h3>
        </a>
        `
        countriesContainer.appendChild(card)
        
    })
}

globalSearch.addEventListener('input', (e) => {
    e.preventDefault()
    const countriesContainer = document.querySelector('.countries-container').childNodes

    countriesContainer.forEach((card) => {
        const check = card.getAttribute('id').toLowerCase().includes(globalInput.value.toLowerCase())

        if (check) {
            card.style.display = 'block'
        } else {
            card.style.display = 'none'
        }
    })
})

selectRegion.addEventListener('change', () => {
    const countriesContainer = document.querySelector('.countries-container').childNodes
    countriesContainer.forEach((card) => {

        const check = card.getAttribute('data-set').toLowerCase().includes(selectRegion.value.toLowerCase())
    
        if (check) {
            card.style.display = 'block'
        } else {
            card.style.display = 'none'
        }

        if (selectRegion.value == 'filter-by-region') {
            card.style.display = 'block'
        }
    })
})