document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const planBtn = document.getElementById('plan-trip-btn');
    const navLinks = document.querySelectorAll('.nav-link');
    const searchInput = document.getElementById('destination-search');
    const searchSection = document.getElementById('search-results');
    const searchGrid = document.getElementById('search-grid');
    const closeSearch = document.getElementById('close-search');
    const journeyHistory = document.getElementById('journey-history');
    const clearHistoryBtn = document.getElementById('clear-history');

    // Modal Elements
    const modal = document.getElementById('apply-modal');
    const closeModal = document.querySelector('.close-modal');
    const confirmApplyBtn = document.getElementById('confirm-apply');
    const modalImg = document.getElementById('modal-trip-img');
    const modalTitle = document.getElementById('modal-trip-title');
    const modalPrice = document.getElementById('modal-trip-price');
    const applyDateInput = document.getElementById('apply-date');

    // Expanded Destinations Sample Data (15 places)
    const destinations = [
        { id: 1, title: 'Swiss Alps', price: '$2,400', img: '../login/assets/features_collab.png', desc: 'Experience the breathtaking beauty of the Swiss Alps.' },
        { id: 2, title: 'Paris, France', price: '$1,800', img: '../login/assets/paris.png', desc: 'The city of lights, romance, and world-class art.' },
        { id: 3, title: 'Tokyo, Japan', price: '$3,100', img: '../login/assets/features_itinerary.png', desc: 'Futuristic skyscrapers meet traditional temples.' },
        { id: 4, title: 'Bali, Indonesia', price: '$1,500', img: '../login/assets/bali.png', desc: 'Serene beaches and lush tropical landscapes.' },
        { id: 5, title: 'Santorini, Greece', price: '$2,200', img: '../login/assets/santorini.png', desc: 'Iconic blue-domed churches and stunning sunsets.' },
        { id: 6, title: 'New York, USA', price: '$2,800', img: '../login/assets/newyork.png', desc: 'The concrete jungle where dreams are made of.' },
        { id: 7, title: 'London, UK', price: '$1,950', img: '../login/assets/london.png', desc: 'History, culture, and the majestic Big Ben.' },
        { id: 8, title: 'Rome, Italy', price: '$2,100', img: '../login/assets/rome.png', desc: 'The eternal city with ancient wonders like the Colosseum.' },
        { id: 9, title: 'Sydney, Australia', price: '$3,400', img: '../login/assets/sydney.png', desc: 'Opera House and beautiful harbor life.' },
        { id: 10, title: 'Dubai, UAE', price: '$2,700', img: '../login/assets/dubai.png', desc: 'Luxury shopping and ultra-modern architecture.' },
        { id: 11, title: 'Cairo, Egypt', price: '$1,400', img: '../login/assets/cairo.png', desc: 'Ancient pyramids and mysterious sphinxes.' },
        { id: 12, title: 'Cape Town, SA', price: '$2,300', img: '../login/assets/features_collab.png', desc: 'Table Mountain and stunning coastal drives.' },
        { id: 13, title: 'Machu Picchu, Peru', price: '$2,600', img: '../login/assets/machupicchu.png', desc: 'The lost city of the Incas high in the Andes.' },
        { id: 14, title: 'Banff, Canada', price: '$1,900', img: '../login/assets/banff.png', desc: 'Turquoise lakes and rugged mountain peaks.' },
        { id: 15, title: 'Bora Bora', price: '$4,200', img: '../login/assets/borabora.png', desc: 'Overwater bungalows and crystal clear lagoons.' }
    ];

    let selectedTrip = null;

    // --- Search Logic ---
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        if (query.length > 0) {
            const filtered = destinations.filter(d => d.title.toLowerCase().includes(query));
            renderSearchResults(filtered);
            searchSection.style.display = 'block';
        } else {
            searchSection.style.display = 'none';
        }
    });

    function renderSearchResults(results) {
        searchGrid.innerHTML = '';
        if (results.length === 0) {
            searchGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--text-soft);">No destinations found.</p>';
            return;
        }

        results.forEach(trip => {
            const card = document.createElement('div');
            card.className = 'trip-card animate-up';
            card.innerHTML = `
                <img src="${trip.img}" alt="${trip.title}" class="trip-img">
                <div class="trip-details">
                    <span class="trip-date">EXPLORE NOW</span>
                    <h3 class="trip-title">${trip.title}</h3>
                    <div class="trip-meta">
                        <div class="trip-tags">
                            <span class="tag">Top Rated</span>
                        </div>
                        <span style="font-weight: 700;">${trip.price}</span>
                    </div>
                </div>
            `;
            card.onclick = () => openApplyModal(trip);
            searchGrid.appendChild(card);
        });
    }

    closeSearch.addEventListener('click', (e) => {
        e.preventDefault();
        searchInput.value = '';
        searchSection.style.display = 'none';
    });

    // --- Modal Logic ---
    function openApplyModal(trip) {
        selectedTrip = trip;
        modalTitle.innerText = trip.title;
        modalImg.src = trip.img;
        modalPrice.innerText = trip.price;
        modal.classList.add('active');
    }

    closeModal.onclick = () => modal.classList.remove('active');
    window.onclick = (e) => { if (e.target == modal) modal.classList.remove('active'); };

    // Expose openApplication for the HTML cards
    window.openApplication = (title, price, img) => {
        openApplyModal({ title, price, img });
    };

    confirmApplyBtn.onclick = () => {
        // Redirect to booking with destination info
        const tripSlug = encodeURIComponent(selectedTrip.title);
        window.location.href = `booking.html?dest=${tripSlug}&price=${selectedTrip.price.replace('$', '')}&img=${encodeURIComponent(selectedTrip.img)}`;
    };

    // --- History Management ---
    function loadHistory() {
        const history = JSON.parse(localStorage.getItem('journeyHistory')) || [];
        if (history.length === 0) return;

        journeyHistory.innerHTML = '';
        history.forEach(trip => {
            const card = document.createElement('div');
            card.className = 'trip-card';
            card.innerHTML = `
                <img src="${trip.img}" alt="${trip.title}" class="trip-img">
                <div class="trip-details">
                    <span class="trip-date">${trip.date.toUpperCase()}</span>
                    <h3 class="trip-title">${trip.title}</h3>
                    <div class="trip-meta">
                        <div class="trip-tags">
                            <span class="tag">${trip.transport || 'Journey'}</span>
                            <span class="tag">Applied ${trip.appliedAt}</span>
                        </div>
                        <span style="font-weight: 700;">$${trip.totalCharge || trip.price}</span>
                    </div>
                </div>
            `;
            journeyHistory.appendChild(card);
        });
    }

    clearHistoryBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (confirm('Are you sure you want to clear your journey history?')) {
            localStorage.removeItem('journeyHistory');
            location.reload();
        }
    });

    // --- Initial Load ---
    loadHistory();

    // Sidebar Navigation Active State Toggle
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // Plan New Trip Action
    planBtn.addEventListener('click', () => {
        window.location.href = 'booking.html';
    });

    // Scroll Recommendations
    const recScroll = document.querySelector('.rec-scroll');
    if (recScroll) {
        recScroll.addEventListener('wheel', (e) => {
            if (e.deltaY !== 0) {
                e.preventDefault();
                recScroll.scrollLeft += e.deltaY;
            }
        });
    }

    // Stats Animation
    const stats = document.querySelectorAll('.stat-value');
    stats.forEach(stat => {
        const originalText = stat.innerText;
        const target = parseFloat(originalText.replace('$', '').replace('k', '').replace(',', ''));
        if (isNaN(target)) return;

        let current = 0;
        const isK = originalText.includes('k');
        const isMoney = originalText.includes('$');

        const updateCount = () => {
            const increment = target / 50;
            if (current < target) {
                current += increment;
                stat.innerText = (isMoney ? '$' : '') +
                    (current.toFixed(isK ? 1 : 0)) +
                    (isK ? 'k' : '');
                setTimeout(updateCount, 20);
            } else {
                stat.innerText = originalText;
            }
        };
        updateCount();
    });
});
