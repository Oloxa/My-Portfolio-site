document
  .getElementById('ingenuity-meeting-form')
  .addEventListener('submit', async function (e) {
    e.preventDefault()

    var form = this
    var btn = form.querySelector('button[type="submit"]')
    var btnText = form.querySelector('.btn-text')
    var originalText = btnText.innerText

    btn.disabled = true
    btnText.innerText = 'מעבד...'

    try {
      await submitLeadForm(form, 'homepage_ingenuity')
      showThankYou(form)
    } catch (error) {
      console.error('Submission Error:', error)
      alert('תקלת תקשורת. בדוק את החיבור שלך.')
      btn.disabled = false
      btnText.innerText = originalText
    }
  })

document
  .getElementById('xpera-lead-form')
  .addEventListener('submit', async function (e) {
    e.preventDefault()

    var btn = this.querySelector('button[type="submit"]')
    var originalText = btn.innerHTML

    btn.disabled = true
    btn.innerHTML = '<span>שולח...</span>'

    try {
      await submitLeadForm(this, 'homepage_contact')
      showThankYou(this)
    } catch (error) {
      console.error('Submission Error:', error)
      alert('שגיאת חיבור. בדוק את החיבור שלך לאינטרנט.')
      btn.disabled = false
      btn.innerHTML = originalText
    }
  })
