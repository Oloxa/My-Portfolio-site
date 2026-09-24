async function submitLeadForm(formElement, source) {
  var formData = new FormData(formElement)
  var data = Object.fromEntries(formData.entries())
  data.source = source

  var response = await fetch('/api/leads', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error('Submission failed')
  }

  return response.json()
}

function showThankYou(container) {
  container.innerHTML =
    '<div class="flex flex-col items-center justify-center gap-4 py-12 text-center">' +
    '<div class="w-16 h-16 rounded-full bg-[#b366ff]/20 border border-[#b366ff]/40 flex items-center justify-center mx-auto">' +
    '<i class="fa-solid fa-check text-2xl text-[#b366ff]"></i>' +
    '</div>' +
    '<h3 class="text-2xl font-bold text-white">תודה רבה!</h3>' +
    '<p class="text-gray-400 text-lg">קיבלנו את הפרטים שלך, ניצור קשר בהקדם.</p>' +
    '</div>'
}
