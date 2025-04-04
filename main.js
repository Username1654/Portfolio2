let burger = document.getElementById('hamburger')
let nav = document.getElementById('nav')
burger.addEventListener('click', function () {
    if (nav.style.height === '30%') {
        nav.style.height = '0%';
    } else {
            nav.style.height = '30%';
    }
});
document.getElementById('x').addEventListener('click' ,function(){
    audio.pause()
    const close =  document.getElementById('close')
    close.play()
   close.addEventListener('ended', function(){window.close()})
    
})
document.getElementById('clos').addEventListener('click', function(){
    document.getElementById('contact').style.display = 'none'
    if(document.getElementById('contact').style.display === 'none'){
        document.getElementById('about').style.gridColumn = '1/5'
    }
})