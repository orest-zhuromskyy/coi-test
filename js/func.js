$(document).ready(function () {
  const iconError = '/img/error.png';
  const iconSuccess = '/img/success-arrow.png';
  fixedHeader();
  $(window).scroll(function () {
    fixedHeader();
  });

  $('#btn-menu').on('click', function () { 
    $('.header-container-after-scroll__menu').removeClass('hide');
    $('body').addClass('fixedPosition');
  })
  $('#btn-menu-scroll').on('click', function () { 
    $('.header-container-after-scroll__menu').removeClass('hide');
    $('body').addClass('fixedPosition');
  })
  $('.btn-close-menu').on('click', function () {
    hideMenu();
  })
  $('.header-container-after-scroll__menu nav li a').on('click', function () {
    hideMenu();
  })
  $('#close-modal').on('click', function () {
    setEmptyValue();
    $('.modal').addClass('hide');
  })
  $('input[name="phone"]').mask("+38 (999) 999-9999");
  $('#name').on('input',function () {
    if (this.value && this.value.length < 3) {
      $('.error-name').removeClass('hide');
      $('.error-name-text').text(' Введіть мінімум 3 символи');
      $('#icon-validation-name').attr('src', iconError);
      $('#icon-validation-name').removeClass('hide');
    } else if (this.value && this.value.length >= 3) {
      $('.error-name').addClass('hide');
      $('.error-name-text').text('');
      $('#icon-validation-name').attr('src', iconSuccess);
    } else if (!this.value) {
      $('.error-name').addClass('hide');
      $('#icon-validation-name').attr('src', '');
      $('#icon-validation-name').addClass('hide');
    }
  });
  $('#phone').on('keyup', function (e) {
    const phone = e.target.value.split('');
    if (phone.indexOf('_') !== -1) {
      $('#icon-validation-phone').attr('src', iconError);
      $('#icon-validation-phone').removeClass('hide');
    } else {
      $('#icon-validation-phone').attr('src', iconSuccess);
    }
  })
  $('#phone').focusout(function() {
    const imgError = $('#icon-validation-phone').attr('src');
    if (imgError === '/img/error.png') {
      $('#icon-validation-phone').attr('src', '');
      $('#icon-validation-phone').addClass('hide');
    }
  });
  $('#email').on('input',function () {
    const regExpEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(this.value);
    if (this.value && !regExpEmail) {
      $('.error-email').removeClass('hide');
      $('.error-email-text').text(' Повинен бути email');
      $('#icon-validation-email').attr('src', iconError);
      $('#icon-validation-email').removeClass('hide');
    } else if (this.value && regExpEmail) {
      $('.error-email').addClass('hide');
      $('.error-email-text').text('');
      $('#icon-validation-email').attr('src', iconSuccess);
    } else if (!this.value) {
      $('.error-email ').addClass('hide');
      $('#icon-validation-email').attr('src', '');
      $('#icon-validation-email').addClass('hide');
    }
  });

  const linkFooter = $('.footer nav li a');
  const linkHeader = $('.header-container nav li a');
  const linkHeaderScroll = $('.header-container-after-scroll nav li a');
    
	linkFooter.on('click', function () {
    const a = $(this);
    a.addClass('link-active');
    linkFooter.not(a).removeClass('link-active');
    setActiveLinkHeaderScroll(a);
    setActiveLinkHeader(a);
  });
  linkHeader.on('click', function () {
    const a = $(this);

    a.addClass('header-link-active');
    linkHeader.not(a).removeClass('header-link-active');

    setActiveLinkHeaderScroll(a);
    setActiveLinkFooter(a);
  });
  linkHeaderScroll.on('click', function () {
    const a = $(this);

    a.addClass('header-scroll-link-active');
    linkHeaderScroll.not(a).removeClass('header-scroll-link-active');
    setActiveLinkFooter(a);
    setActiveLinkHeader(a);
  });
});
$('.banner-container').not('.slick').slick({
  infinite: true,
  dots: true,
  slidesToShow: 1,
  slidesToScroll: 1
});

function fixedHeader () {
  if (window.pageYOffset !== 0) {
    $('.header').addClass('background_header');
    $('.header-container-after-scroll').removeClass('hide');
    $('.header-container').addClass('hide');
  } else {
    $('.header').removeClass('background_header');
    $('.header-container-after-scroll').addClass('hide');
    $('.header-container').removeClass('hide')
  }
}
function validationForm () {
  const name  = $('#name').val();
  const phone  = $('#phone').val();
  const email  = $('#email').val();
  const regExpEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);
  if (name.length >= 3 && phone && regExpEmail) {
    $('.modal').removeClass('hide')
  }
}
function setActiveLinkHeaderScroll (a) {
  const linkHeaderScroll = $('.header-container-after-scroll nav li a');

  linkHeaderScroll.each((index, el) => {
    if (el.innerHTML === a[0].innerHTML) {
      linkHeaderScroll.removeClass('header-scroll-link-active');

      const linkScroll = $(el);
      setTimeout(() => {
        linkScroll.addClass('header-scroll-link-active');
      }, 50)
    }
  });
}
function setActiveLinkFooter (a) {
  const linkFooter = $('.footer nav li a');

  linkFooter.each((index, el) => {
    if (el.innerHTML === a[0].innerHTML) {
      linkFooter.removeClass('link-active');

      const link = $(el);
      setTimeout(() => {
        link.addClass('link-active');
      }, 50)
    }
  });
}
function setActiveLinkHeader (a) {
  const linkHeader = $('.header-container nav li a');

  linkHeader.each((index, el) => {
    if (el.innerHTML === a[0].innerHTML) {
      linkHeader.removeClass('header-link-active');

      const linkScroll = $(el);
      setTimeout(() => {
        linkScroll.addClass('header-link-active');
      }, 50)
    }
  });
}
function hideMenu () {
  $('.header-container-after-scroll__menu').addClass('hide');
  $('body').removeClass('fixedPosition');
}
function setEmptyValue () {
  $('#name').val('');
  $('#phone').val('');
  $('#email').val('');
  $('#icon-validation-email').attr('src', '');
  $('#icon-validation-email').addClass('hide');
  $('#icon-validation-phone').attr('src', '');
  $('#icon-validation-phone').addClass('hide');
  $('#icon-validation-name').attr('src', '');
  $('#icon-validation-name').addClass('hide');
}
document.getElementsByClassName('.custom-select-wrapper').addEventListener('click', function () {
  this.querySelector('.custom-select').classList.toggle('open');
})

for (const option of document.querySelectorAll(".custom-option")) {
  option.addEventListener('click', function () {
    if (!this.classList.contains('selected')) {
      this.parentNode.querySelector('.custom-option.selected').classList.remove('selected');
      this.classList.add('selected');
      this.closest('.custom-select').querySelector('.custom-select__trigger span').textContent = this.textContent;
    }
  })
}
window.addEventListener('click', function(e) {
  const select = document.querySelector('.custom-select')
  if (!select.contains(e.target)) {
    select.classList.remove('open');
  }
});