        const locationData = {
            "USA": {
                "California": ["Los Angeles", "San Francisco", "San Diego"],
                "New York": ["New York City", "Buffalo", "Albany"],
                "Texas": ["Houston", "Austin", "Dallas"]
            },
            "India": {
                "Maharashtra": ["Mumbai", "Pune", "Nagpur"],
                "Karnataka": ["Bengaluru", "Mysuru", "Mangaluru"],
                "Delhi": ["New Delhi", "North Delhi", "South Delhi"]
            },
            "France": {
                "Île-de-France": ["Paris", "Versailles", "Boulogne-Billancourt"],
                "Provence-Alpes-Côte d'Azur": ["Marseille", "Nice", "Cannes"],
                "Auvergne-Rhône-Alpes": ["Lyon", "Grenoble", "Annecy"]
            },
            "Japan": {
                "Kanto": ["Tokyo", "Yokohama", "Chiba"],
                "Kansai": ["Osaka", "Kyoto", "Kobe"],
                "Hokkaido": ["Sapporo", "Hakodate", "Asahikawa"]
            }
        };

        function toggleDropdown(menuId) {
            document.querySelectorAll('.custom-dropdown-menu').forEach(menu => {
                if(menu.id !== menuId) menu.classList.remove('show');
            });
            const menu = document.getElementById(menuId);
            if(menu) menu.classList.toggle('show');
        }

        window.onclick = function(event) {
            if (!event.target.closest('.custom-dropdown')) {
                document.querySelectorAll('.custom-dropdown-menu').forEach(menu => {
                    menu.classList.remove('show');
                });
            }
        }

        function populateCountries() {
            const menu = document.getElementById('menu-country');
            menu.innerHTML = '';
            for (let country in locationData) {
                let item = document.createElement('div');
                item.className = 'custom-dropdown-item';
                item.textContent = country;
                item.onclick = () => selectOption('country', country);
                menu.appendChild(item);
            }
        }

        function selectOption(type, value) {
            document.getElementById(`dest-${type}`).value = value;
            document.getElementById(`text-${type}`).textContent = value;
            document.getElementById(`menu-${type}`).classList.remove('show');
            updateLocationMapFromCustom(type);
        }

        function updateLocationMapFromCustom(changedType) {
            const country = document.getElementById('dest-country').value;
            const state = document.getElementById('dest-state').value;
            const district = document.getElementById('dest-district').value;
            
            const stateMenu = document.getElementById('menu-state');
            const districtMenu = document.getElementById('menu-district');

            if (changedType === 'country') {
                document.getElementById('dest-state').value = '';
                document.getElementById('text-state').textContent = 'Select State';
                stateMenu.innerHTML = '';
                
                document.getElementById('dest-district').value = '';
                document.getElementById('text-district').textContent = 'Select District';
                districtMenu.innerHTML = '';

                if (country) {
                    for (let s in locationData[country]) {
                        let item = document.createElement('div');
                        item.className = 'custom-dropdown-item';
                        item.textContent = s;
                        item.onclick = () => selectOption('state', s);
                        stateMenu.appendChild(item);
                    }
                }
            } else if (changedType === 'state') {
                document.getElementById('dest-district').value = '';
                document.getElementById('text-district').textContent = 'Select District';
                districtMenu.innerHTML = '';

                if (country && state) {
                    locationData[country][state].forEach(d => {
                        let item = document.createElement('div');
                        item.className = 'custom-dropdown-item';
                        item.textContent = d;
                        item.onclick = () => selectOption('district', d);
                        districtMenu.appendChild(item);
                    });
                }
            }

            const mapFrame = document.getElementById('location-map');
            let searchQuery = "";
            if (document.getElementById('dest-district').value) {
                searchQuery = `${document.getElementById('dest-district').value}, ${document.getElementById('dest-state').value}, ${document.getElementById('dest-country').value}`;
            } else if (document.getElementById('dest-state').value) {
                searchQuery = `${document.getElementById('dest-state').value}, ${document.getElementById('dest-country').value}`;
            } else if (document.getElementById('dest-country').value) {
                searchQuery = `${document.getElementById('dest-country').value}`;
            }

            if (searchQuery) {
                mapFrame.src = `https://maps.google.com/maps?q=${encodeURIComponent(searchQuery)}&t=&z=10&ie=UTF8&iwloc=&output=embed`;
            }
        }

        function goToBooking() {
            const country = document.getElementById('dest-country').value;
            const state = document.getElementById('dest-state').value;
            const district = document.getElementById('dest-district').value;
            
            if (!country || !state || !district || country === "" || state === "" || district === "") {
                alert('Please select a complete destination (Country, State, and District) to proceed with booking.');
                return;
            }
            window.location.href = 'booking.html';
        }

        // Initialize on load
        window.onload = function() {
            populateCountries();
        };
