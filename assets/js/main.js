// loader
onload = () => {
    const load = document.getElementById('load')

    setTimeout(() => {
        load.style.display = 'none'
    }, 5000)
}

/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
    navToggle = document.getElementById('nav-toggle'),
    navClose = document.getElementById('nav-close')

/*===============MENU SHOW========*/
// validate if constant exists

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu')
    })
}

/*===========MENU HIDDEN============*/
// validate if constant exists

if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu')
    })
}



/*=============== REMOVE MENU MOBILE ===============*/


const navLink = document.querySelectorAll('.nav__link')

function linkAction() {
    const navMenu = document.getElementById('nav-menu')
        //when we click on each nav link the show menu is removed
    navMenu.classList.remove('show-menu')
}

navLink.forEach(n => n.addEventListener('click', linkAction))


/*=============== CHANGE BACKGROUND HEADER ===============*/
function scrollHeader() {
    const header = document.getElementById('header')
        //when the scroll is greater than 50vh, add the scroll-header class to the header tag
    if (this.scrollY >= 50) header.classList.add('bg-header');
    else header.classList.remove('bg-header')

}
window.addEventListener('scroll', scrollHeader)

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/

const sections = document.querySelectorAll('section[id]')

function scrollActive() {
    const scrollY = window.pageYOffset

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        } else {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)


/*=============== SHOW SCROLL UP ===============*/

function scrollUp() {
    const scrollUp = document.getElementById('scroll-up');
    //when the scroll is higher than 350vh, add the show scroll
    //class to the a tag with the scroll

    if (this.scrollY >= 350) scrollUp.classList.add('show-scroll');
    else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)


/*=============== SCROLL REVEAL ANIMATION ===============*/

const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 400
})

sr.reveal(`.home__data, .footer__container, .footer__group`)
sr.reveal(`.home__img`, { delay: 700, origin: 'bottom' })
sr.reveal(`.logos__img, .program__card, .pricing__card`, { interval: 100 })
sr.reveal(`.choose__img, .calculate__content`, { origin: 'left' })
sr.reveal(`.choose__content, .calculate__img`, { origin: 'right' })





































/*=============== CALCULATE JS ===============*/
const calculateForm = document.getElementById('calculate-form'),
    calculateCm = document.getElementById('calculate-cm'),
    calculateKg = document.getElementById('calculate-kg'),
    calculateMessage = document.getElementById('calculate-message')

const calculateBmi = (e) => {
    e.preventDefault()

    //check if the fields have value
    if (calculateCm.value === '' || calculateKg.value === '') {

        //add and remove color
        calculateMessage.classList.remove('color-green')
        calculateMessage.classList.add('color-red')

        //show message
        calculateMessage.textContent = 'Fill in the Height and Weight'

        //remove message in three seconds
        setTimeout(() => {
            calculateMessage.textContent = ''
        }, 3000)

    } else {
        //BMI formula

        const cm = calculateCm.value / 100,
            kg = calculateKg.value,
            bmi = Math.round(kg / (cm * cm))


        //show health status
        if (bmi < 18.5) {
            //add color and display message

            calculateMessage.classList.add('color-green')
            calculateMessage.textContent = `Your BMI is ${bmi} and you are skinny 😞`

        } else if (bmi < 25) {
            calculateMessage.classList.add('color-green')
            calculateMessage.textContent = `Your BMI is ${bmi} and you are healthy 😃`
        } else {
            calculateMessage.classList.add('color-green')
            calculateMessage.textContent = `Your BMI is ${bmi} and you are overweight 😞`
        }

        //to clear the input fields
        calculateCm.value = ''
        calculateKg.value = ''

        //remove message for four seconds
        setTimeout(() => {
            calculateMessage.textContent = ''
        }, 4000)

    }

}


calculateForm.addEventListener('submit', calculateBmi)

/*=============== EMAIL JS ===============*/

const contactForm = document.getElementById('contact-form'),
    contactMessage = document.getElementById('contact-message'),
    contactUser = document.getElementById('contact-user')

const sendEmail = (e) => {

    e.preventDefault()

    //check if the field has a value
    if (contactUser.value === '') {
        //add and remove color
        contactMessage.classList.remove('color-green')
        contactMessage.classList.add('color-red')

        //show message
        contactMessage.textContent = 'You must enter your email 👆'

        //remove message three seconds
        setTimeout(() => {
            contactMessage.textContent = ''
        }, 3000)
    } else {
        // serviceID - templateID - #form - publicKey

        emailjs.sendForm('service_zhsq1qg', 'template_squnbbu', '#contact-form', 'eZGoGlI9RF-WfhFy7')
            .then(() => {

                //show message and add color
                contactMessage.classList.add('color-green')
                contactMessage.textContent = 'You registered successfully 💪'

                //remove message after 3 seconds

                setTimeout(() => {
                    contactMessage.textContent = ''
                }, 3000)


            }, (error) => {
                //mail sending error
                alert('OOPS! SOMETHING HAS FAILED...', error)
            })

        //to clear the input field
        contactUser.value = ''

    }
}

contactForm.addEventListener('submit', sendEmail)