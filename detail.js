const img = document.querySelector('.hero-content-img')
const title = document.querySelector('.hero-content-2-heading')
const btnMode = document.querySelector('.btn-mode')
const siteImg = document.querySelector('.site-img')
const siteSpan = document.querySelector('.site-span')
const owerlay = document.querySelector('.owerlay')
const detail = document.querySelector('.hero-content-p-text')
const detail2 = document.querySelector('.hero-content-p-text2')
const detail3 = document.querySelector('.hero-content-p-text3')
const detail4 = document.querySelector('.hero-content-p-text4')
const detail5 = document.querySelector('.hero-content-p-text5')
const detail6 = document.querySelector('.hero-content-p-text6')
const detail7 = document.querySelector('.hero-content-p-text7')
const detail8 = document.querySelector('.hero-content-p-text8')

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

const query = window.location.search

const countryName = new URLSearchParams(query).get('q')

const url = `https://restcountries.com/v3.1/name/${countryName}`

async function senRequest(url) {
  owerlay.classList.remove('hidden')
  const req = await fetch(url)
  const data = await req.json()
  showData(data)
  owerlay.classList.add('hidden')
}

function showData(data) {
  const dataInfo = data[0]

  img.setAttribute('src', `${dataInfo.flags.png}`)
  title.textContent = `${dataInfo.name.common}`
  detail.textContent = `${dataInfo.name.common}`
  detail2.textContent = `${dataInfo.population}`
  detail3.textContent = `${dataInfo.region}`
  detail4.textContent = `${dataInfo.subregion}`
  detail5.textContent = `${dataInfo.capital[0]}`
  const objKeys = Object.values(dataInfo.currencies)
  detail7.textContent = `${objKeys[0].name}`
  detail8.textContent = `${Object.values(dataInfo.languages)[0]}`


  const bordersCont = document.querySelector('.hero-content-bottom')

  if (dataInfo.borders) {
    dataInfo.borders.forEach((border) => {
      const a = document.createElement('a')
      a.classList.add('hero-content-bottom-text')
      a.textContent = border
      a.setAttribute('href', `./detail.html?q=${border}`)

      bordersCont.appendChild(a)
    })
  } else {
    bordersCont.innerHTML = `<p class='hero-content-bottom-text'>No Borders</p>`
  }
}

senRequest(url)
