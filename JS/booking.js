        document.addEventListener('DOMContentLoaded', () => {
            const destSelect = document.getElementById('destination-select');
            const summaryDest = document.getElementById('summary-dest');
            const summaryImg = document.getElementById('summary-img');
            const basePriceEl = document.getElementById('base-price');
            const transportChargeEl = document.getElementById('transport-charge');
            const totalPriceEl = document.getElementById('total-price');
            const transportCards = document.querySelectorAll('.transport-card');

            const destinations = [
                { title: 'Swiss Alps', price: 2400, img: 'assets/model.png' },
                { title: 'Paris, France', price: 1800, img: 'assets/model.png' },
                { title: 'Tokyo, Japan', price: 3100, img: 'assets/model.png' },
                { title: 'Bali, Indonesia', price: 1500, img: 'assets/model.png' },
                { title: 'Santorini, Greece', price: 2200, img: 'assets/model.png' },
                { title: 'New York, USA', price: 2800, img: 'assets/model.png' },
                { title: 'London, UK', price: 1950, img: 'assets/model.png' },
                { title: 'Rome, Italy', price: 2100, img: 'assets/model.png' },
                { title: 'Sydney, Australia', price: 3400, img: 'assets/model.png' },
                { title: 'Dubai, UAE', price: 2700, img: 'assets/model.png' },
                { title: 'Cairo, Egypt', price: 1400, img: 'assets/model.png' },
                { title: 'Cape Town, SA', price: 2300, img: 'assets/model.png' },
                { title: 'Machu Picchu, Peru', price: 2600, img: 'assets/model.png' },
                { title: 'Banff, Canada', price: 1900, img: 'assets/model.png' },
                { title: 'Bora Bora', price: 4200, img: 'assets/model.png' }
            ];

            // Populate Dropdown
            destinations.forEach(d => {
                const opt = document.createElement('option');
                opt.value = d.title;
                opt.innerText = d.title;
                destSelect.appendChild(opt);
            });

            // URL Params Handling
            const urlParams = new URLSearchParams(window.location.search);
            const preDest = urlParams.get('dest');
            if (preDest) destSelect.value = preDest;

            function updateSummary() {
                const selected = destinations.find(d => d.title === destSelect.value);
                const activeTransport = document.querySelector('.transport-card.active');
                const tCharge = parseInt(activeTransport.dataset.charge);
                const tName = activeTransport.dataset.mode;

                summaryDest.innerText = selected.title;
                summaryImg.src = selected.img;
                basePriceEl.innerText = `$${selected.price}`;
                transportChargeEl.innerText = `$${tCharge} (${tName})`;

                const total = selected.price + tCharge + 45;
                totalPriceEl.innerText = `$${total}`;
            }

            destSelect.addEventListener('change', updateSummary);

            transportCards.forEach(card => {
                card.addEventListener('click', () => {
                    transportCards.forEach(c => c.classList.remove('active'));
                    card.classList.add('active');
                    updateSummary();
                });
            });

            // Finalize
            document.getElementById('finalize-booking').addEventListener('click', () => {
                const name = document.getElementById('user-fullname').value;
                if (!name) { alert('Please enter your full name'); return; }

                // Show success popup
                document.getElementById('pop-dest').innerText = destSelect.value;
                document.getElementById('pop-total').innerText = totalPriceEl.innerText;
                document.getElementById('pop-id').innerText = 'GT-' + Math.floor(Math.random() * 900000 + 100000);
                document.getElementById('success-popup').classList.add('active');

                // Save to History
                const selected = destinations.find(d => d.title === destSelect.value);
                const activeTransport = document.querySelector('.transport-card.active');
                const tName = activeTransport.dataset.mode;
                const totalCharge = parseInt(totalPriceEl.innerText.replace('$', ''));

                const journeyData = {
                    title: selected.title,
                    img: selected.img,
                    date: 'June 20, 2026',
                    appliedAt: new Date().toLocaleDateString(),
                    transport: tName,
                    totalCharge: totalCharge
                };

                let history = JSON.parse(localStorage.getItem('journeyHistory')) || [];
                history.unshift(journeyData);
                localStorage.setItem('journeyHistory', JSON.stringify(history));
            });

            updateSummary();
        });
