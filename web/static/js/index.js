function replaceAt(s, index, character) {
  return s.substr(0, index) + character + s.substr(index+character.length);
}

function Queue() {
  this._sleep = 0
  this.add = function(f, sleep) {
    this._sleep += sleep
    setTimeout(function(){
      f()
    }, this._sleep)
  }
}

function resizeCard() {
  if ($(window).width() <= 480 || $(window).height() <= 525) {
    $('.big').removeClass('big').addClass('small')
  }
  else if ($('.small') !== undefined) {
    $('.small').removeClass('small').addClass('big')
  }

  var logoHeight = $(window).height() * 0.25
  if (logoHeight > 250) logoHeight = 250
  $('.logo-container').css('height', logoHeight + "px")

  var vh = $(window).height()
  var textPadding = (vh - $('.card-text').height()) / 2

  $('.calling-card').css('height', vh + "px")
  $('.card-text').css('padding-top', textPadding + "px")

}

function orbit() {
  var animQueue1 = new Queue()
  var animQueue2 = new Queue()

  animQueue1.add(function() {
    $('.html5').show().addClass('animated fadeInDown')
  }, 0)

  animQueue1.add(function(){
    $('.css').show().addClass('animated fadeInLeft')
  }, 1000)

  animQueue1.add(function(){
    $('.js').show().addClass('animated fadeInRight')
  }, 1000)

  animQueue1.add(function(){
    $('.js').removeClass('animated fadeInRight').addClass('animated joinOrbit')
  }, 1000)

  animQueue1.add(function(){
    $('.css').removeClass('animated fadeInLeft').addClass('animated joinOrbit')
    $('.js').addClass('play')
  }, 1000)

  animQueue1.add(function(){
    $('.html5').removeClass('animated fadeInDown').addClass('animated joinOrbit')
    $('.css').addClass('play')
    $('.reactjs').removeClass('wow zoomIn').addClass('pulse animated infinite')
  }, 1000)

  animQueue1.add(function(){
    $('.html5').addClass('play')
  }, 1000)
}

var toDecrypt = "ehyyc@ahbkcacswoc.ocd"

function decrypt() {
  var keyboard = "qwertyuiopasdfghjklzxcvbnm"
  var animationQueue = new Queue()
  animationQueue.changeEmail = function(email, sleep) {
    this._sleep += sleep
    setTimeout(function(){
      $('.cipher').text(email)
    }, this._sleep)
  }
  for (var i = 1; i <= toDecrypt.length; i++) {
    var target = toDecrypt[toDecrypt.length - i]
    for (var j = 1; j <= 13; j++) {
      indexInKeyboard = keyboard.indexOf(target)
      if (indexInKeyboard === -1) break
      else {
        keyPos = indexInKeyboard + j
        if (keyPos >= keyboard.length) keyPos = keyPos - keyboard.length
        toDecrypt = replaceAt(toDecrypt, toDecrypt.length - i, keyboard[keyPos])
        animationQueue.changeEmail(toDecrypt, 7)
      }
    }
  }
}

$(window).resize(function(){
  resizeCard()
})

$(document).ready(function() {
  //init
  resizeCard()
})

$(window).load(function(){
  //much wow
  $('.card-text').css('visibility', 'visible')
  new WOW().init()

  //event handlers
  $('.mail').featherlight($('#hidden').html(), {
    closeIcon: 'x',
    afterOpen: function() {
      $('.decrypt').click(function(){
        decrypt()
      })
    }
  });
  $('#frontend-trigger').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', orbit);

})