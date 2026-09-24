document
  .getElementById('xpera-lead-form-team')
  .addEventListener('submit', async function (e) {
    e.preventDefault()

    var form = this
    var btn = form.querySelector('button[type="submit"]')
    var originalText = btn.innerHTML

    btn.disabled = true
    btn.innerHTML = '<span>שולח...</span>'

    try {
      await submitLeadForm(form, 'team_contact')
      showThankYou(form)
    } catch (error) {
      console.error('Submission Error:', error)
      alert('שגיאת חיבור. בדוק את החיבור שלך לאינטרנט.')
      btn.disabled = false
      btn.innerHTML = originalText
    }
  })
