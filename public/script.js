document.addEventListener('DOMContentLoaded', function() {
    // Ambil elemen-elemen yang diperlukan
    const openPopupBtn = document.getElementById('openPopup');
    const closePopupBtn = document.getElementById('closePopup');
    const popupOverlay = document.getElementById('popupOverlay');
    
    // Fungsi untuk membuka popup
    function openPopup() {
        popupOverlay.classList.remove('hidden');
    }
    
    // Fungsi untuk menutup popup
    function closePopup() {
        popupOverlay.classList.add('hidden');
    }
    
    // Event listener untuk tombol buka
    openPopupBtn.addEventListener('click', openPopup);
    
    // Event listener untuk tombol tutup
    closePopupBtn.addEventListener('click', closePopup);
    
    // Tutup popup ketika mengklik di luar kotak popup
    popupOverlay.addEventListener('click', function(e) {
        if (e.target === popupOverlay) {
            closePopup();
        }
    });
    
    // Tutup popup dengan tombol Esc
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !popupOverlay.classList.contains('hidden')) {
            closePopup();
        }
    });

    //Sliderbaru
    const buttons = document.querySelectorAll('.gem-button');
    const progressBar = document.getElementById('progress-bar');
    const gemImages ={
        accent_green: '/assets/Aset_Aplikasi_Non_critical.png',
        accent_blue: '/assets/Aset_Aplikasi_Perventive.png',
        accent_purple: 'Aset_Aplikasi_Urgent.png',
        accent_red: '/assets/Aset_Aplikasi_Emergency.png',
    };

    buttons.forEach(button => {
        button.addEventListener('click',() => {
            const index = perseInt(button.dataset.index);
            const colorClass = button.dataset.color;

            // Reset all gem images
            buttons.forEach(btn => {
                const img = btn.querySelector('.gem-image');
                img.src = gemImages.gray;
            });

            // Set clicked gem
            const img = button.querySelector('.gem-image');
            img.src = gemImages[colorClass];

            // Calculate slider width
            const percentage = (index / (buttons.length - 1)) * 100;

            // Remove previous color classes
            progressBar.className = 'absolute top-1/2 transform -translate-y-1/2 h-4 rounded-full z-10 transition-all duration-300';

            // Add new color and width
            progressBar.classList.add(`bg-${colorClass}`);
            progressBar.style.width = `${percentage}%`;
        });
    });

    // Data level slider
    // Ganti sesuai urutan level: Non-Critical, Perventive, Urgent, Emergency
    // const progressWidths = ["5%", "35%", "68%", "100%"];
    // const icons = [
    //     { id: "gem-1", active: "/assets/Aset_Aplikasi_Non_critical.png", inactive: "/assets/Aset_Aplikasi_Gem_Gray.png" },
    //     { id: "icon-1", active: "/assets/Aset_Aplikasi_Perventive.png", inactive: "/assets/Aset_Aplikasi_Gem_Gray.png" },
    //     { id: "icon-2", active: "/assets/Aset_Aplikasi_Urgent.png", inactive: "/assets/Aset_Aplikasi_Gem_Gray.png" },
    //     { id: "icon-3", active: "/assets/Aset_Aplikasi_Emergency.png", inactive: "/assets/Aset_Aplikasi_Gem_Gray.png" }
    // ];

    // function setLevel(level) {
    // // Update progress bar width
    //     document.getElementById("slider-fill").style.width = progressWidths[level];

    //     // Update all icons
    //     icons.forEach((icon, index) => {
    //         const img = document.getElementById(icon.id);
    //         img.src = index === level ? icon.active : icon.inactive;
    //     });
    // }

    // console.log("Script loaded");
    // setLevel(1);

    // Set default value (level 1 - Perventive)
    // window.addEventListener("DOMContentLoaded", () => {
    //     setLevel();
    // });

    //slider-fill
    // document.getElementById("slider-fill").style.transition = "width 0.3s ease-in-out";

    document.addEventListener('DOMContentLoaded', function() {
        // Variabel untuk popup
        const openPopupBtn = document.getElementById('openPopup');
        const closePopupBtn = document.getElementById('closePopup');
        const popupOverlay = document.getElementById('popupOverlay');
        const scheduleForm = document.getElementById('scheduleForm');
        
        // Radio buttons dan time inputs
        const taskTypeRadio = document.getElementById('taskType');
        const eventTypeRadio = document.getElementById('eventType');
        const taskTimeInput = document.getElementById('taskTimeInput');
        const eventTimeInput = document.getElementById('eventTimeInput');
        
        // Buka popup
        openPopupBtn.addEventListener('click', function() {
            popupOverlay.classList.remove('hidden');
            // Set tanggal default ke hari ini
            const today = new Date();
            const formattedDate = today.toISOString().split('T')[0];
            document.getElementById('activityDate').value = formattedDate;
            
            // Reset form ke default (Task)
            taskTypeRadio.checked = true;
            taskTimeInput.classList.remove('hidden');
            eventTimeInput.classList.add('hidden');
        });
        
        // Tutup popup
        closePopupBtn.addEventListener('click', function() {
            popupOverlay.classList.add('hidden');
        });
        
        // Toggle antara Task dan Event
        taskTypeRadio.addEventListener('change', function() {
            if (this.checked) {
                taskTimeInput.classList.remove('hidden');
                eventTimeInput.classList.add('hidden');
            }
        });
        
        eventTypeRadio.addEventListener('change', function() {
            if (this.checked) {
                taskTimeInput.classList.add('hidden');
                eventTimeInput.classList.remove('hidden');
            }
        });
        
        // Handle form submission
        scheduleForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Ambil nilai dari form
            const title = document.getElementById('activityTitle').value;
            const description = document.getElementById('activityDesc').value;
            const date = document.getElementById('activityDate').value;
            const category = document.getElementById('activityCategory').value;
            const isEvent = eventTypeRadio.checked;
            
            // Validasi input
            if (!title || !date || !category) {
                alert('Please fill in all required fields');
                return;
            }
            
            // Format waktu berdasarkan jenis
            let timeDisplay;
            if (isEvent) {
                const startTime = document.getElementById('startTime').value;
                const endTime = document.getElementById('endTime').value;
                
                if (!startTime || !endTime) {
                    alert('Please fill in both start and end time for event');
                    return;
                }
                
                timeDisplay = `${startTime.substring(0, 5)} - ${endTime.substring(0, 5)}`;
            } else {
                const deadlineTime = document.getElementById('deadlineTime').value;
                
                if (!deadlineTime) {
                    alert('Please fill in deadline time for task');
                    return;
                }
                
                timeDisplay = deadlineTime.substring(0, 5);
            }
            
            // Buat objek item baru
            const newItem = {
                title,
                description: description || '',
                date,
                time: timeDisplay,
                category,
                isEvent,
                priority: 'accent_red',
                createdAt: new Date().toISOString()
            };
            
            // Tambahkan ke section yang sesuai
            addItemToSection(newItem);
            
            // Simpan ke localStorage
            saveItemToStorage(newItem);
            
            // Reset form dan tutup popup
            scheduleForm.reset();
            popupOverlay.classList.add('hidden');
            
            // Reset ke default (Task)
            taskTypeRadio.checked = true;
            taskTimeInput.classList.remove('hidden');
            eventTimeInput.classList.add('hidden');
        });
        
        // Fungsi untuk menambahkan item ke section yang sesuai
        function addItemToSection(item) {
            const today = new Date().toISOString().split('T')[0];
            const itemDate = item.date;
            
            // Buat HTML element untuk item baru
            const itemElement = `
                <div class="bg-accent-950 flex-col border-[1px] p-3 rounded-[3px] border-accent/10 mb-3">
                    <div class="flex items-stretch">
                        <div class="w-2 bg-${item.priority} rounded-l-md mr-4"></div>
                        <div>
                            <span class="text-accent font-bold lg:text-xl text-lg">
                                ${item.title} ${item.isEvent ? '(Event)' : '(Task)'}
                            </span>
                            <p class="lg:text-sm text-[12px]">${item.description}</p>
                            <div class="flex gap-2">
                                <div class="inline-flex gap-x-2 items-center mt-2 bg-primary rounded-full px-2 py-1">
                                    <i class="fa-solid fa-${item.isEvent ? 'calendar' : 'clock'} text-accent"></i>
                                    <span class="text-accent lg:text-sm text-[12px]">${item.time}</span>
                                </div>
                                <div class="inline-flex gap-x-2 items-center mt-2 bg-accent_blue/30 rounded-full px-2 py-1">
                                    <span class="text-accent lg:text-sm text-[12px] font-semibold">${item.category}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            // Tentukan section target berdasarkan tanggal
            if (itemDate === today) {
                // Tambahkan ke Today Schedule
                document.querySelector('#todayScheduleContainer').insertAdjacentHTML('beforeend', itemElement);
            } else {
                // Tambahkan ke Ongoing Activities
                document.querySelector('#ongoingActivitiesContainer').insertAdjacentHTML('beforeend', itemElement);
            }
        }
        
        // Fungsi untuk menyimpan ke localStorage
        function saveItemToStorage(item) {
            let items = JSON.parse(localStorage.getItem('scheduleItems')) || [];
            items.push(item);
            localStorage.setItem('scheduleItems', JSON.stringify(items));
        }
        
        // Fungsi untuk memuat item dari localStorage saat page load
        function loadItemsFromStorage() {
            const items = JSON.parse(localStorage.getItem('scheduleItems')) || [];
            
            // Urutkan berdasarkan tanggal (yang terbaru di atas)
            items.sort((a, b) => new Date(a.date) - new Date(b.date));
            
            items.forEach(item => {
                addItemToSection(item);
            });
        }
        
        // Panggil saat page load
        loadItemsFromStorage();
        
        // Fungsi untuk priority slider (jika masih diperlukan)
        const progressWidths = ["2%", "35%", "68%", "100%"];
        const icons = [
            { id: "gem-1", active: "/assets/Aset_Aplikasi_Non_critical.png", inactive: "/assets/Aset_Aplikasi_Gem_Gray.png" },
            { id: "icon-1", active: "/assets/Aset_Aplikasi_Perventive.png", inactive: "/assets/Aset_Aplikasi_Gem_Gray.png" },
            { id: "icon-2", active: "/assets/Aset_Aplikasi_Urgent.png", inactive: "/assets/Aset_Aplikasi_Gem_Gray.png" },
            { id: "icon-3", active: "/assets/Aset_Aplikasi_Emergency.png", inactive: "/assets/Aset_Aplikasi_Gem_Gray.png" }
        ];
    
        window.setLevel = function(level) {
            // Update progress bar width
            document.getElementById("slider-fill").style.width = progressWidths[level];
    
            // Update all icons
            icons.forEach((icon, index) => {
                const img = document.getElementById(icon.id);
                if (img) {
                    img.src = index === level ? icon.active : icon.inactive;
                }
            });
        };
    
        // Set default value (level 1 - Perventive)
        setLevel(1);
    });



});