emailjs.init({
    publicKey: 'GhyHS9GX5Np5f8Q2t'
})
document.getElementById('weddingForm').addEventListener('submit', function (event) {
    event.preventDefault()
    const form = this
    const guests = form.querySelector('[name="guests"]').value
    const attendance = form.querySelector(
        '[name="attendance"]:checked'
    )?.value || ''
    const guestNames = Array.from(
        form.querySelectorAll('[name="guest_name"]:checked')
    ).map(checkbox => checkbox.value)
    const count = form.querySelector('[name="count"]').value
    const templateParams = {
        guests: guests,
        attendance: attendance,
        guest_name: guestNames.join(', '),
        count: count
    };
    emailjs.send(
        'service_g2x45s6',
        'template_hrdmrip',
        templateParams
    )
    .then(function () {
        alert('Ձեր պատասխանը հաջողությամբ ուղարկվեց ❤️')
        form.reset()
    })
    .catch(function (error) {
        console.error('EmailJS error:', error)
        alert('Ուղարկման ժամանակ սխալ տեղի ունեցավ')
    })
})