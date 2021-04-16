const text = document.querySelector(".content__text");
const loader = document.querySelector(".lds-ring");

const tl = gsap.timeline();

tl.fromTo(text, {opacity: 0, y: "-100%"}, {duration: 2, opacity: 1, scale: 1, y: 0})
.fromTo(loader, {opacity: 0}, {duration: 2, opacity: 1, delay: -0.5})
.to('.hide', {backgroundColor: "transparent", duration: 0})
.to(".content", {backgroundImage: "linear-gradient(to top, #30cfd0 0%, #330867 100%)", duration: 1})