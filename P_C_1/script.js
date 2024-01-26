function loco(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();
};
loco();

let cirsor = document.querySelector('.circor');
document.addEventListener("mousemove",(e) => {
  cirsor.style.left = e.x + "px";
  cirsor.style.top = e.y + "px";
  
});
// document.addEventListener('#main').addEventListener('mouseenter',(e) => {
//   cirsor.style.opacity = 1;
// });



let boxes = document.querySelectorAll('.box');
boxes.forEach((elem) => {
  
  elem.addEventListener('mouseenter', (e) => {
    let image = elem.getAttribute('data-image');
  //  elem.style.backgroundColor = 'red';
   cirsor.style.width = '300px';
   cirsor.style.height = '250px';
   cirsor.style.borderRadius = '0';
   cirsor.style.backgroundImage = `URL(${image})`;
   cirsor.style.mixblendMode = '0'
  });
  elem.addEventListener('mouseleave', () => {
    elem.style.backgroundColor = 'transparent';
    cirsor.style.width = '15px';
   cirsor.style.height = '15px';
   cirsor.style.borderRadius = '50%';
   cirsor.style.backgroundImage = 'none'
  })
})