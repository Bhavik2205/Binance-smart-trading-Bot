window.addEventListener('scroll', () =>{
  document.querySelector('header').classList.toggle('active-scroll', scrollY > 1);
});

document.querySelectorAll('.sub-menu-box').forEach((menuBox) =>{
  menuBox.addEventListener('click', () =>{
    if (menuBox.classList.contains('show')) {
      menuBox.classList.add('show');
    }else {
      menuBox.classList.remove('show');
    }
    menuBox.classList.toggle('show');
  });
});

document.querySelector('.rsp-menu-toggler').addEventListener('click', () =>{
  document.querySelector('.l-menus').classList.toggle('active');
});

// counter
$(function() {
  let start = 0;
  let end = $('#h-counter').html();

  setInterval(function(){
    if (start < end) {
      start++;
    }
    $('#h-counter').html(start);
  },1);
});
