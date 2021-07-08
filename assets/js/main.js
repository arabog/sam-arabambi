// https://github.com/eKoopmans/html2pdf.js/blob/master/dist/html2pdf.bundle.min.js


const showMenu = (toggleId, navId) => {
          const toggle = document.getElementById(toggleId),
          nav = document.getElementById(navId);

          // validate the variables exist
          if(toggle && nav) {
                    toggle.addEventListener('click', () => {
          // we add d show-menu class to d div tag with d nav__menu class
                              nav.classList.toggle('show-menu')
                    })
          }

}

showMenu('nav-toggle', 'nav-menu')

// remove menu mobile
const navLink = document.querySelectorAll('.nav__link')

function linkAction() {
          const navMenu = document.getElementById('nav-menu')

          // wn we click on each nav__link, show-menu is removed
          navMenu.classList.remove('show-menu')
}

navLink.forEach(n => n.addEventListener('click', linkAction))

// scroll sections active link
const sections = document.querySelectorAll('section[id]')

function scrollActive() {
          const scrollY = window.pageYOffset

          sections.forEach(current => {
                    const sectionHeight = current.offsetHeight
                    const sectionTop = current.offsetTop - 50;

                    sectionId = current.getAttribute('id')

                    if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                              document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')

                    }else {
                              document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
                    }
                    
          })
}

window.addEventListener('scroll', scrollActive)

// show scroll top
function scrollTop() {
          const scrollTop = document.getElementById('scroll-top')

          // wn d scroll is higher than 560 vport height, add d show-scroll class
          if(this.scrollY >= 200) scrollTop.classList.add('show-scroll'); else scrollTop.classList.remove('show-scroll')
}

window.addEventListener('scroll', scrollTop)

// dark light theme
const themeButton = document.getElementById('theme-button');
const darkTheme = 'dark-theme'
const iconTheme = 'bx-sun'

// previusly selected topic (if user selected)
const selectedTheme =  localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// we obtain d curent theme dt d interface has by validating d dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : "light"
const getCurrentIcon = () => themeButton.body.classList.contains(iconTheme) ? 'bx-moon' : "bx-sun"

// we validate if d user previously chose a topic
if(selectedTheme) {
          document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
          themeButton.classList[selectedIcon === 'bx-moon' ? 'add' : 'remove'](iconTheme)
}

// activate / deactivate d theme manually with d button
themeButton.addEventListener('click', () => {
          // add or remove d dark / icon theme
          document.body.classList.toggle(darkTheme)
          themeButton.classList.toggle(iconTheme)

          // we save d theme and d current icon dt d user choose
          localStorage.setItem('selected-theme', getCurrentTheme())
          localStorage.setItem('selected-icon', getCurrentIcon)
})


// reduce the size and print on an a4 sheet
function scaleCv() {
          document.body.classList.add("scale-cv")
}

// remove d size wn d cv is dwnloaded
function removeScale() {
          document.body.classList.remove("scale-cv")
}

// generate pdf
let areaCv = document.getElementById('area-cv')

let resumeButton = document.getElementById('resume-button')


// html2pdf options
let opt = {
          margin:       0,
          filename:     'Arabambi SamCv.pdf',
          image:        { type: 'jpeg', quality: 0.98 },
          html2canvas:  { scale: 4},
          jsPDF:        { format: 'a4', orientation: 'portrait' }
};

// fxn to call areaCv and html2pdf options
function generateResume() {
          html2pdf(areaCv, opt)
}

// wn d btn is clicked, it execute d 3 fxns\
resumeButton.addEventListener('click', ()=> {
          // d class scale-cv is added to d body, where it reduces d size of d 
          scaleCv()

          // pdf is generated
          generateResume()

          // rmove scale cv class after 5s
          setTimeout(removeScale, 5000)
})