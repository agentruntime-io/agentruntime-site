
const nav=document.querySelector('.nav-wrap');const menuButton=document.querySelector('.menu-btn');const mobileMenu=document.querySelector('.mobile-menu');
function updateNav(){if(nav)nav.classList.toggle('scrolled',window.scrollY>8)}updateNav();window.addEventListener('scroll',updateNav,{passive:true});
if(menuButton&&mobileMenu){menuButton.addEventListener('click',()=>{const isOpen=mobileMenu.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(isOpen))})}
