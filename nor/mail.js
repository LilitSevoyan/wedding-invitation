emailjs.init({
    publicKey: 'GhyHS9GX5Np5f8Q2t'
})

document.getElementById('weddingForm').addEventListener('submit', function (event) {
    event.preventDefault()

    const form = this
    const submitBtn = form.querySelector('button[type="submit"]')

    // Անջատում ենք button-ը
    submitBtn.disabled = true

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
    }

    emailjs.send(
        'service_g2x45s6',
        'template_hrdmrip',
        templateParams
    )
    .then(function () {

        form.reset()

        submitBtn.disabled = false
        submitBtn.textContent = 'Պատասխանել'

        Swal.fire({
            icon: 'success',
            title: 'Գրանցումը հաջողվեց',
            text: 'Տվյալները հաջողությամբ ուղարկված է',
            confirmButtonText: 'Լավ',
            confirmButtonColor: '#000000',
            background: '#ffffff',
            allowOutsideClick: false
        })

    })
    .catch(function (error) {

        console.error('EmailJS error:', error)

        submitBtn.disabled = false
        submitBtn.textContent = 'Պատասխանել'

        Swal.fire({
            icon: 'error',
            title: 'Սխալ տեղի ունեցավ',
            text: 'Տվյալները չհաջողվեց ուղարկել։ Փորձեք կրկին։',
            confirmButtonText: 'Լավ',
            confirmButtonColor: '#000000'
        })

    })
})



document.addEventListener('DOMContentLoaded', function () {

    emailjs.init({
        publicKey: 'GhyHS9GX5Np5f8Q2t'
    })

    const form = document.getElementById('weddingForm')

    form.addEventListener('submit', function (event) {

        event.preventDefault()

        const submitBtn = form.querySelector('button[type="submit"]')

        if (submitBtn.disabled) {
            return
        }

        submitBtn.disabled = true
        submitBtn.textContent = 'Ուղարկվում է...'

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
        }

        emailjs.send(
            'service_g2x45s6',
            'template_hrdmrip',
            templateParams
        )
        .then(function () {

            form.reset()

            submitBtn.disabled = false
            submitBtn.textContent = 'Պատասխանել'

            Swal.fire({
                icon: 'success',
                title: 'Գրանցումը հաջողվեց',
                text: 'Տվյալները հաջողությամբ ուղարկված է',
                showConfirmButton: false,
                timer: 2500
            })

        })
        .catch(function (error) {

            console.error('EmailJS error:', error)

            submitBtn.disabled = false
            submitBtn.textContent = 'Պատասխանել'

            Swal.fire({
                icon: 'error',
                title: 'Սխալ տեղի ունեցավ',
                text: 'Տվյալները չհաջողվեց ուղարկել։ Փորձեք կրկին։'
            })
        })
    })
})
