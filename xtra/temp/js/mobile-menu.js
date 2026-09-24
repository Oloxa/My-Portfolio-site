;(function () {
  var btn = document.querySelector('.xpera-hdr-mobile-btn')
  var nav = document.querySelector('.xpera-hdr-nav')
  if (!btn || !nav) return

  var overlay = document.createElement('div')
  overlay.className = 'xpera-mobile-overlay'
  overlay.dir = 'rtl'

  var closeBtn = document.createElement('button')
  closeBtn.className = 'xpera-mobile-close'
  closeBtn.setAttribute('aria-label', 'Close Menu')
  closeBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>'
  overlay.appendChild(closeBtn)

  var links = nav.querySelectorAll('.xpera-hdr-link')
  var reversedLinks = Array.prototype.slice.call(links).reverse()
  reversedLinks.forEach(function (link) {
    var clone = link.cloneNode(true)
    clone.addEventListener('click', function () {
      overlay.classList.remove('open')
    })
    overlay.appendChild(clone)
  })

  document.body.appendChild(overlay)

  btn.addEventListener('click', function () {
    overlay.classList.add('open')
  })

  closeBtn.addEventListener('click', function () {
    overlay.classList.remove('open')
  })
})()
