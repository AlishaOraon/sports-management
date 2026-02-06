// CORE FUNCTIONS - Defined first to avoid reference errors

// APPLICATION DATA
let appData = {
    users: [
        { id: 1, name: 'John Smith', role: 'player', sport: 'Football', team: 'Team A', status: 'active', email: 'john@example.com' },
        { id: 2, name: 'Sarah Johnson', role: 'coach', sport: 'Volleyball', team: 'Team B', status: 'active', email: 'sarah@example.com' }
    ],
    fixtures: [
        { id: 1, date: '2024-05-10', sport: 'Football', team1: 'Team A', team2: 'Team B', venue: 'Main Stadium', time: '14:00' },
        { id: 2, date: '2024-05-11', sport: 'Hockey', team1: 'Team C', team2: 'Team D', venue: 'Hockey Field', time: '10:00' }
    ],
    results: [
        { id: 1, date: '2024-05-08', sport: 'Football', team1: 'Team A', team2: 'Team B', score1: '3', score2: '1', winner: 'Team A' },
        { id: 2, date: '2024-05-07', sport: 'Hockey', team1: 'Team C', team2: 'Team D', score1: '3', score2: '2', winner: 'Team C' }
    ],
    sports: [
        { name: 'Football', type: 'outdoor', icon: '⚽', description: 'Team sport with goal scoring' },
        { name: 'Basketball', type: 'indoor', icon: '🏀', description: 'Team sport with ball and hoop' },
        { name: 'Tennis', type: 'outdoor', icon: '🎾', description: 'Racket sport with singles or doubles' },
        { name: 'Cricket', type: 'outdoor', icon: '🏏', description: 'Bat and ball sport with wickets' },
        { name: 'Hockey', type: 'outdoor', icon: '🏑', description: 'Stick and ball team sport' },
        { name: 'Volleyball', type: 'indoor', icon: '🏐', description: 'Net-based team sport' },
        { name: 'Badminton', type: 'indoor', icon: '🏸', description: 'Racket sport with shuttlecock' },
        { name: 'Baseball', type: 'outdoor', icon: '⚾', description: 'Bat and ball team game' },
        { name: 'Swimming', type: 'indoor', icon: '🏊', description: 'Water-based individual sport' },
        { name: 'Cycling', type: 'outdoor', icon: '🚴', description: 'Individual or team racing sport' },
        { name: 'Boxing', type: 'indoor', icon: '🥊', description: 'Combat sport with gloves' },
        { name: 'Gymnastics', type: 'indoor', icon: '🤸', description: 'Artistic body movements and routines' },
        { name: 'Athletics', type: 'outdoor', icon: '🏃', description: 'Running, jumping, throwing events' },
        { name: 'Golf', type: 'outdoor', icon: '⛳', description: 'Club and ball precision sport' },
        { name: 'Rugby', type: 'outdoor', icon: '🏉', description: 'Contact team sport with oval ball' },
        { name: 'Table Tennis', type: 'indoor', icon: '🏓', description: 'Fast-paced indoor racket sport' },
        { name: 'Chess', type: 'indoor', icon: '♟️', description: 'Strategic board game' },
        { name: 'Yoga', type: 'indoor', icon: '🧘', description: 'Mind-body practice' }
    ],
    playerStats: {
        matchesPlayed: 15,
        goalsScored: 12,
        assists: 8,
        winRate: '73%'
    },
    coachStats: {
        totalPlayers: 24,
        activePlayers: 22,
        injuredPlayers: 2,
        teamRating: '8.7/10',
        matchesWon: 11,
        matchesLost: 4,
        goalsFor: 35,
        goalsAgainst: 18
    },
    trainingSessions: [
        { type: 'Morning Training', time: 'Today, 7:00-9:00 AM' },
        { type: 'Tactical Session', time: 'Tomorrow, 4:00-6:00 PM' },
        { type: 'Fitness Assessment', time: 'May 13, 10:00 AM' }
    ],
    achievements: [
        '🏆 Player of the Match (April 20)',
        '⭐ Top Scorer Award',
        '🎯 Most Improved Player'
    ]
};

// SHOW SECTION FUNCTION
function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Hide all sections
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Remove active class from all nav links
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    // Show selected section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Set active nav link
    const activeLink = document.querySelector(`[data-section="${sectionId}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
    
    // Load section data
    loadSectionData(sectionId);
}

// OPEN MODAL FUNCTION
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        
        // Set default values for date fields
        const today = new Date();
        const todayStr = today.toISOString().split('T')[0];
        
        const dateInputs = modal.querySelectorAll('input[type="date"]');
        dateInputs.forEach(input => {
            if (!input.value) {
                input.value = todayStr;
            }
        });
        
        // Set default time for training and fixtures
        const timeInput = modal.querySelector('input[type="time"]');
        if (timeInput && !timeInput.value) {
            if (modalId === 'addTrainingModal') {
                timeInput.value = '09:00';
            } else if (modalId === 'addFixtureModal') {
                timeInput.value = '14:00';
            }
        }
    }
}

// CLOSE MODAL FUNCTION
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
    }
}

// NAVIGATION SYSTEM
document.addEventListener('DOMContentLoaded', function() {
    // Setup navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get target section
            const targetId = this.getAttribute('data-section');
            showSection(targetId);
            
            // Update active nav link
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Initialize app data
    initializeApp();
    
    // Setup form submissions
    setupForms();
});

// LOAD SECTION DATA
function loadSectionData(sectionId) {
    switch(sectionId) {
        case 'home':
            updateHomeStats();
            break;
        case 'admin':
            updateAdminStats();
            updateUsersTable();
            break;
        case 'player':
            loadPlayerDashboard();
            break;
        case 'coach':
            loadCoachDashboard();
            break;
        case 'sports':
            updateSportsGallery();
            break;
        case 'fixtures':
            updateFixturesTable();
            break;
        case 'results':
            updateResultsTable();
            break;
    }
}

// UPDATE HOME STATS
function updateHomeStats() {
    const totalUsers = document.getElementById('totalUsers');
    const totalSports = document.getElementById('totalSports');
    const totalFixtures = document.getElementById('totalFixtures');
    const totalResults = document.getElementById('totalResults');
    
    if (totalUsers) totalUsers.textContent = appData.users.length;
    if (totalSports) totalSports.textContent = appData.sports.length;
    if (totalFixtures) totalFixtures.textContent = appData.fixtures.length;
    if (totalResults) totalResults.textContent = appData.results.length;
}

// UPDATE ADMIN STATS
function updateAdminStats() {
    const adminTotalUsers = document.getElementById('adminTotalUsers');
    const adminTotalSports = document.getElementById('adminTotalSports');
    const adminTotalFixtures = document.getElementById('adminTotalFixtures');
    const adminTotalResults = document.getElementById('adminTotalResults');
    
    if (adminTotalUsers) adminTotalUsers.textContent = appData.users.length;
    if (adminTotalSports) adminTotalSports.textContent = appData.sports.length;
    if (adminTotalFixtures) adminTotalFixtures.textContent = appData.fixtures.length;
    if (adminTotalResults) adminTotalResults.textContent = appData.results.length;
}

// UPDATE USERS TABLE
function updateUsersTable() {
    const tbody = document.getElementById('usersTable');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    appData.users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td><span class="badge badge-${user.role}">${user.role.charAt(0).toUpperCase() + user.role.slice(1)}</span></td>
            <td>${user.sport}</td>
            <td>${user.team}</td>
            <td><span class="badge badge-${user.status}">${user.status.charAt(0).toUpperCase() + user.status.slice(1)}</span></td>
            <td class="action-buttons">
                <button class="btn btn-primary btn-sm" onclick="editUser(${user.id})"><i class="fas fa-edit"></i> Edit</button>
                <button class="btn btn-danger btn-sm" onclick="deleteUser(${user.id})"><i class="fas fa-trash"></i> Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// UPDATE FIXTURES TABLE
function updateFixturesTable() {
    const tbody = document.getElementById('fixturesTable');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    appData.fixtures.forEach(fixture => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${fixture.date}</td>
            <td>${fixture.sport}</td>
            <td>${fixture.team1} vs ${fixture.team2}</td>
            <td>${fixture.venue}</td>
            <td>${fixture.time}</td>
            <td class="action-buttons">
                <button class="btn btn-primary btn-sm" onclick="editFixture(${fixture.id})"><i class="fas fa-edit"></i> Edit</button>
                <button class="btn btn-danger btn-sm" onclick="deleteFixture(${fixture.id})"><i class="fas fa-trash"></i> Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// UPDATE RESULTS TABLE
function updateResultsTable() {
    const tbody = document.getElementById('resultsTable');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    appData.results.forEach(result => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${result.date}</td>
            <td>${result.sport}</td>
            <td>${result.team1} vs ${result.team2}</td>
            <td>${result.score1}-${result.score2}</td>
            <td>${result.winner}</td>
            <td class="action-buttons">
                <button class="btn btn-primary btn-sm" onclick="editResult(${result.id})"><i class="fas fa-edit"></i> Edit</button>
                <button class="btn btn-danger btn-sm" onclick="deleteResult(${result.id})"><i class="fas fa-trash"></i> Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// UPDATE SPORTS GALLERY
function updateSportsGallery() {
    const gallery = document.getElementById('sportsCategories');
    if (!gallery) return;
    
    gallery.innerHTML = '';
    
    // Shuffle sports for variety
    const shuffledSports = [...appData.sports].sort(() => Math.random() - 0.5);
    
    shuffledSports.forEach(sport => {
        const item = document.createElement('div');
        item.className = `icon-item ${sport.type}`;
        item.innerHTML = `
            <div class="sport-icon">${sport.icon}</div>
            <div class="sport-name">${sport.name}</div>
            <div class="sport-type">${sport.type.charAt(0).toUpperCase() + sport.type.slice(1)}</div>
        `;
        
        // Add click event
        item.addEventListener('click', function() {
            alert(`Selected ${sport.name} - ${sport.type} sport`);
        });
        
        gallery.appendChild(item);
    });
}

// UPDATE PLAYER UPCOMING MATCHES
function updatePlayerUpcomingMatches() {
    const container = document.getElementById('playerUpcomingMatches');
    if (!container) return;
    
    container.innerHTML = '';
    
    appData.fixtures.forEach(fixture => {
        if (fixture.team1 === 'Team A' || fixture.team2 === 'Team A') {
            const match = document.createElement('p');
            match.innerHTML = `<strong>${fixture.team1} vs ${fixture.team2}</strong> (${fixture.date}, ${fixture.time})`;
            container.appendChild(match);
        }
    });
}

// UPDATE PLAYER ACHIEVEMENTS
function updatePlayerAchievements() {
    const container = document.getElementById('playerAchievements');
    if (!container) return;
    
    container.innerHTML = '';
    
    appData.achievements.forEach(achievement => {
        const p = document.createElement('p');
        p.textContent = achievement;
        container.appendChild(p);
    });
}

// UPDATE COACH TRAINING SCHEDULE
function updateCoachTrainingSchedule() {
    const container = document.getElementById('coachTrainingSchedule');
    if (!container) return;
    
    container.innerHTML = '';
    
    appData.trainingSessions.forEach(session => {
        const p = document.createElement('p');
        p.innerHTML = `<strong>${session.type}:</strong> ${session.time}`;
        container.appendChild(p);
    });
}

// UPDATE COACH PLAYERS TABLE
function updateCoachPlayersTable() {
    const players = [
        { name: 'John Smith', position: 'Forward', fitness: 'Excellent', performance: '8.7/10', lastMatch: '8.5/10' },
        { name: 'Mike Johnson', position: 'Midfielder', fitness: 'Fair', performance: '7.2/10', lastMatch: '6.8/10' },
        { name: 'Sarah Wilson', position: 'Defender', fitness: 'Excellent', performance: '8.9/10', lastMatch: '9.0/10' },
        { name: 'David Brown', position: 'Goalkeeper', fitness: 'Good', performance: '8.1/10', lastMatch: '7.9/10' }
    ];
    
    const tbody = document.getElementById('coachPlayersTable');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    players.forEach((player, index) => {
        const row = document.createElement('tr');
        const fitnessColor = player.fitness === 'Excellent' ? 'green' : 
                           player.fitness === 'Good' ? '#4caf50' : 'orange';
        
        row.innerHTML = `
            <td>${player.name}</td>
            <td>${player.position}</td>
            <td><span style="color: ${fitnessColor}; font-weight: bold;">${player.fitness}</span></td>
            <td>${player.performance}</td>
            <td>${player.lastMatch}</td>
            <td class="action-buttons">
                <button class="btn btn-primary btn-sm" onclick="viewPlayerDetails(${index + 1})"><i class="fas fa-eye"></i> View</button>
                <button class="btn btn-secondary btn-sm" onclick="assessPlayer(${index + 1})"><i class="fas fa-clipboard-check"></i> Assess</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// LOAD PLAYER DASHBOARD
function loadPlayerDashboard() {
    const player = appData.users.find(u => u.role === 'player');
    if (player) {
        const playerName = document.getElementById('playerName');
        const playerSport = document.getElementById('playerSport');
        const playerTeam = document.getElementById('playerTeam');
        
        if (playerName) playerName.textContent = player.name;
        if (playerSport) playerSport.textContent = player.sport;
        if (playerTeam) playerTeam.textContent = player.team;
        
        // Load player stats
        const matchesPlayed = document.getElementById('matchesPlayed');
        const goalsScored = document.getElementById('goalsScored');
        const assists = document.getElementById('assists');
        const winRate = document.getElementById('winRate');
        
        if (matchesPlayed) matchesPlayed.textContent = appData.playerStats.matchesPlayed;
        if (goalsScored) goalsScored.textContent = appData.playerStats.goalsScored;
        if (assists) assists.textContent = appData.playerStats.assists;
        if (winRate) winRate.textContent = appData.playerStats.winRate;
    }
    
    updatePlayerUpcomingMatches();
    updatePlayerAchievements();
}

// LOAD COACH DASHBOARD
function loadCoachDashboard() {
    // Load coach stats
    const totalPlayers = document.getElementById('totalPlayers');
    const activePlayers = document.getElementById('activePlayers');
    const injuredPlayers = document.getElementById('injuredPlayers');
    const teamRating = document.getElementById('teamRating');
    const matchesWon = document.getElementById('matchesWon');
    const matchesLost = document.getElementById('matchesLost');
    const goalsFor = document.getElementById('goalsFor');
    const goalsAgainst = document.getElementById('goalsAgainst');
    
    if (totalPlayers) totalPlayers.textContent = appData.coachStats.totalPlayers;
    if (activePlayers) activePlayers.textContent = appData.coachStats.activePlayers;
    if (injuredPlayers) injuredPlayers.textContent = appData.coachStats.injuredPlayers;
    if (teamRating) teamRating.textContent = appData.coachStats.teamRating;
    if (matchesWon) matchesWon.textContent = appData.coachStats.matchesWon;
    if (matchesLost) matchesLost.textContent = appData.coachStats.matchesLost;
    if (goalsFor) goalsFor.textContent = appData.coachStats.goalsFor;
    if (goalsAgainst) goalsAgainst.textContent = appData.coachStats.goalsAgainst;
    
    updateCoachTrainingSchedule();
    updateCoachPlayersTable();
}

// FILTER SPORTS FUNCTION
function filterSports(type) {
    const gallery = document.getElementById('sportsCategories');
    if (!gallery) return;
    
    gallery.innerHTML = '';
    
    let filteredSports;
    
    if (type === 'all') {
        filteredSports = [...appData.sports].sort(() => Math.random() - 0.5);
    } else {
        filteredSports = appData.sports
            .filter(sport => sport.type === type)
            .sort(() => Math.random() - 0.5);
    }
    
    filteredSports.forEach(sport => {
        const item = document.createElement('div');
        item.className = `icon-item ${sport.type}`;
        item.innerHTML = `
            <div class="sport-icon">${sport.icon}</div>
            <div class="sport-name">${sport.name}</div>
            <div class="sport-type">${sport.type.charAt(0).toUpperCase() + sport.type.slice(1)}</div>
        `;
        
        item.addEventListener('click', function() {
            alert(`Selected ${sport.name} - ${sport.type} sport`);
        });
        
        gallery.appendChild(item);
    });
    
    // Show notification
    const typeText = type === 'all' ? 'all sports' : `${type} sports`;
    alert(`Showing ${filteredSports.length} ${typeText}`);
}

// INITIALIZE APPLICATION
function initializeApp() {
    try {
        updateHomeStats();
        setupModalCloseEvents();
        setDefaultDates();
        loadSectionData('home');
        updateSportsGallery();
    } catch (error) {
        console.error("Failed to initialize app:", error);
    }
}

// SET DEFAULT DATES
function setDefaultDates() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    // Format dates as YYYY-MM-DD
    const todayStr = today.toISOString().split('T')[0];
    const tomorrowStr = tomorrow.toISOString().split('T')[0];
    
    // Set default dates in forms
    const dateInputs = document.querySelectorAll('input[type="date"]');
    dateInputs.forEach(input => {
        if (!input.value) {
            input.value = todayStr;
        }
    });
}

// SETUP MODAL CLOSE EVENTS
function setupModalCloseEvents() {
    // Close modal when clicking outside
    window.onclick = function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.classList.remove('active');
        }
    };
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            const modals = document.querySelectorAll('.modal.active');
            modals.forEach(modal => modal.classList.remove('active'));
        }
    });
}

// SETUP ALL FORMS
function setupForms() {
    // 1. Registration Form
    const registrationForm = document.getElementById('registrationForm');
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('fullName').value.trim();
            const role = document.getElementById('regRole').value;
            const email = document.getElementById('email').value.trim();
            const age = document.getElementById('age').value;
            const sport = document.getElementById('sport').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            // Validation
            if (!name || !role || !email || !age || !sport || !password) {
                alert('Please fill in all required fields');
                return;
            }
            
            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }
            
            // Add new user
            const newUser = {
                id: appData.users.length + 1,
                name: name,
                role: role,
                email: email,
                age: age,
                sport: sport,
                team: role === 'player' ? 'Team ' + String.fromCharCode(65 + Math.floor(Math.random() * 5)) : 'N/A',
                status: 'active'
            };
            
            appData.users.push(newUser);
            alert(`Registration successful! Welcome ${name}`);
            
            // Update displays
            updateHomeStats();
            updateAdminStats();
            updateUsersTable();
            
            // Reset form
            this.reset();
            
            // Navigate to login
            showSection('login');
        });
    }

    // 2. Login Form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('loginUsername').value.trim();
            const password = document.getElementById('loginPassword').value;
            
            if (!username || !password) {
                alert('Please enter both username and password');
                return;
            }
            
            // Simple authentication
            const user = appData.users.find(u => 
                u.name === username || u.email === username
            );
            
            if (user) {
                alert(`Welcome back, ${user.name}!`);
                
                // Navigate based on role
                if (user.role === 'admin') {
                    showSection('admin');
                } else if (user.role === 'coach') {
                    showSection('coach');
                } else {
                    showSection('player');
                }
            } else {
                // Demo login for testing
                alert('Login successful! Using demo account.');
                showSection('player');
            }
            
            this.reset();
        });
    }

    // 3. Edit Player Form
    const editPlayerForm = document.getElementById('editPlayerForm');
    if (editPlayerForm) {
        editPlayerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('editPlayerName').value.trim();
            const position = document.getElementById('editPlayerPosition').value;
            const jersey = document.getElementById('editJerseyNumber').value;
            const height = document.getElementById('editHeight').value;
            const weight = document.getElementById('editWeight').value;
            const experience = document.getElementById('editExperience').value;
            
            // Update player data
            const player = appData.users.find(u => u.role === 'player');
            if (player) {
                player.name = name;
            }
            
            // Update display
            const playerName = document.getElementById('playerName');
            const playerPosition = document.getElementById('playerPosition');
            
            if (playerName) playerName.textContent = name;
            if (playerPosition) playerPosition.textContent = position.charAt(0).toUpperCase() + position.slice(1);
            
            alert('Player profile updated successfully!');
            closeModal('editPlayerModal');
            updateUsersTable();
        });
    }

    // 4. Manage Team Form
    const manageTeamForm = document.getElementById('manageTeamForm');
    if (manageTeamForm) {
        manageTeamForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const teamName = document.getElementById('teamName').value.trim();
            const captain = document.getElementById('teamCaptain').value.trim();
            const viceCaptain = document.getElementById('teamViceCaptain').value.trim();
            const strategy = document.getElementById('teamStrategy').value.trim();
            
            alert(`Team "${teamName}" updated successfully! Captain: ${captain}`);
            closeModal('manageTeamModal');
        });
    }

    // 5. Add Training Form
    const addTrainingForm = document.getElementById('addTrainingForm');
    if (addTrainingForm) {
        addTrainingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const date = document.getElementById('trainingDate').value;
            const time = document.getElementById('trainingTime').value;
            const type = document.getElementById('trainingType').value;
            const duration = document.getElementById('trainingDuration').value;
            const focus = document.getElementById('trainingFocus').value.trim();
            
            // Add to training sessions
            const newSession = {
                type: `${type.charAt(0).toUpperCase() + type.slice(1)} Training`,
                time: `${date} at ${time} (${duration} hours)`,
                focus: focus || 'General training'
            };
            
            appData.trainingSessions.push(newSession);
            updateCoachTrainingSchedule();
            
            alert('Training session scheduled successfully!');
            closeModal('addTrainingModal');
        });
    }

    // 6. Add User Form (Admin)
    const addUserForm = document.getElementById('addUserForm');
    if (addUserForm) {
        addUserForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('newUserName').value.trim();
            const role = document.getElementById('newUserRole').value;
            const email = document.getElementById('newUserEmail').value.trim();
            const sport = document.getElementById('newUserSport').value;
            const team = document.getElementById('newUserTeam').value.trim() || 'N/A';
            
            const newUser = {
                id: appData.users.length + 1,
                name: name,
                role: role,
                email: email,
                sport: sport,
                team: team,
                status: 'active'
            };
            
            appData.users.push(newUser);
            alert(`User "${name}" added successfully as ${role}!`);
            
            closeModal('addUserModal');
            updateUsersTable();
            updateAdminStats();
            updateHomeStats();
        });
    }

    // 7. Add Sport Form
    const addSportForm = document.getElementById('addSportForm');
    if (addSportForm) {
        addSportForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('newSportName').value.trim();
            const category = document.getElementById('newSportCategory').value;
            const description = document.getElementById('newSportDescription').value.trim();
            const minPlayers = document.getElementById('newSportMinPlayers').value;
            
            // Select random icon based on category
            const icons = {
                outdoor: ['⚽', '🏀', '🎾', '🏏', '🏑', '🏐', '🏸', '⚾'],
                indoor: ['🏊', '🥊', '🤸', '🏓', '♟️', '🧘'],
                water: ['🏄', '🚣', '🤽'],
                winter: ['⛷️', '🏂', '⛸️']
            };
            
            const randomIcon = icons[category] ? 
                icons[category][Math.floor(Math.random() * icons[category].length)] : '🏆';
            
            const newSport = {
                name: name,
                type: category,
                icon: randomIcon,
                description: description || 'A new sports activity',
                minPlayers: minPlayers
            };
            
            appData.sports.push(newSport);
            alert(`Sport "${name}" added successfully!`);
            
            closeModal('addSportModal');
            updateSportsGallery();
            updateAdminStats();
            updateHomeStats();
        });
    }

    // 8. Add Fixture Form
    const addFixtureForm = document.getElementById('addFixtureForm');
    if (addFixtureForm) {
        addFixtureForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const sport = document.getElementById('fixtureSport').value;
            const date = document.getElementById('fixtureDate').value;
            const team1 = document.getElementById('fixtureTeam1').value.trim();
            const team2 = document.getElementById('fixtureTeam2').value.trim();
            const venue = document.getElementById('fixtureVenue').value.trim();
            const time = document.getElementById('fixtureTime').value;
            
            const newFixture = {
                id: appData.fixtures.length + 1,
                date: date,
                sport: sport,
                team1: team1,
                team2: team2,
                venue: venue,
                time: time
            };
            
            appData.fixtures.push(newFixture);
            alert(`Match scheduled: ${team1} vs ${team2} on ${date} at ${time}`);
            
            closeModal('addFixtureModal');
            updateFixturesTable();
            updateAdminStats();
            updateHomeStats();
            updatePlayerUpcomingMatches();
        });
    }

    // 9. Add Result Form
    const addResultForm = document.getElementById('addResultForm');
    if (addResultForm) {
        addResultForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const sport = document.getElementById('resultSport').value;
            const date = document.getElementById('resultDate').value;
            const team1 = document.getElementById('resultTeam1').value.trim();
            const team2 = document.getElementById('resultTeam2').value.trim();
            const score1 = parseInt(document.getElementById('resultScore1').value);
            const score2 = parseInt(document.getElementById('resultScore2').value);
            
            const winner = score1 > score2 ? team1 : 
                         score1 < score2 ? team2 : 'Draw';
            
            const newResult = {
                id: appData.results.length + 1,
                date: date,
                sport: sport,
                team1: team1,
                team2: team2,
                score1: score1,
                score2: score2,
                winner: winner
            };
            
            appData.results.push(newResult);
            alert(`Result recorded: ${team1} ${score1}-${score2} ${team2}. Winner: ${winner}`);
            
            closeModal('addResultModal');
            updateResultsTable();
            updateAdminStats();
            updateHomeStats();
        });
    }

    // 10. Player Assessment Form
    const playerAssessmentForm = document.getElementById('playerAssessmentForm');
    if (playerAssessmentForm) {
        playerAssessmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const player = document.getElementById('assessmentPlayer').value;
            const technical = parseInt(document.getElementById('technicalSkills').value);
            const tactical = parseInt(document.getElementById('tacticalAwareness').value);
            const fitness = parseInt(document.getElementById('physicalFitness').value);
            const mental = parseInt(document.getElementById('mentalStrength').value);
            const notes = document.getElementById('assessmentNotes').value.trim();
            
            const avgScore = ((technical + tactical + fitness + mental) / 4).toFixed(1);
            
            alert(`Assessment saved for ${player}. Average score: ${avgScore}/10`);
            
            closeModal('playerAssessmentModal');
        });
    }

    // 11. Select Lineup Form
    const selectLineupForm = document.getElementById('selectLineupForm');
    if (selectLineupForm) {
        selectLineupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const match = document.getElementById('lineupMatch').value;
            const formation = document.getElementById('lineupFormation').value;
            const playersSelect = document.getElementById('lineupPlayers');
            const selectedPlayers = Array.from(playersSelect.selectedOptions).map(opt => opt.value);
            
            if (selectedPlayers.length !== 11) {
                alert('Please select exactly 11 players for the lineup');
                return;
            }
            
            alert(`Lineup set for ${match} using ${formation} formation`);
            
            closeModal('selectLineupModal');
        });
    }

    // 12. Add Strategy Form
    const addStrategyForm = document.getElementById('addStrategyForm');
    if (addStrategyForm) {
        addStrategyForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('strategyName').value.trim();
            const match = document.getElementById('strategyMatch').value;
            const description = document.getElementById('strategyDescription').value.trim();
            const focus = document.getElementById('strategyFocus').value;
            const difficulty = document.getElementById('strategyDifficulty').value;
            
            alert(`Strategy "${name}" added successfully for ${focus}`);
            
            closeModal('addStrategyModal');
        });
    }
}

// ACTION FUNCTIONS FOR TABLES
function editUser(userId) {
    const user = appData.users.find(u => u.id === userId);
    if (user) {
        // Pre-fill the add user modal for editing
        const newUserName = document.getElementById('newUserName');
        const newUserRole = document.getElementById('newUserRole');
        const newUserEmail = document.getElementById('newUserEmail');
        const newUserSport = document.getElementById('newUserSport');
        const newUserTeam = document.getElementById('newUserTeam');
        
        if (newUserName) newUserName.value = user.name;
        if (newUserRole) newUserRole.value = user.role;
        if (newUserEmail) newUserEmail.value = user.email || '';
        if (newUserSport) newUserSport.value = user.sport;
        if (newUserTeam) newUserTeam.value = user.team;
        
        openModal('addUserModal');
        alert(`Editing user: ${user.name}`);
    }
}

function deleteUser(userId) {
    if (confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
        appData.users = appData.users.filter(u => u.id !== userId);
        alert('User deleted successfully!');
        updateUsersTable();
        updateAdminStats();
        updateHomeStats();
    }
}

function editFixture(fixtureId) {
    const fixture = appData.fixtures.find(f => f.id === fixtureId);
    if (fixture) {
        // Pre-fill the form
        const fixtureSport = document.getElementById('fixtureSport');
        const fixtureDate = document.getElementById('fixtureDate');
        const fixtureTeam1 = document.getElementById('fixtureTeam1');
        const fixtureTeam2 = document.getElementById('fixtureTeam2');
        const fixtureVenue = document.getElementById('fixtureVenue');
        const fixtureTime = document.getElementById('fixtureTime');
        
        if (fixtureSport) fixtureSport.value = fixture.sport;
        if (fixtureDate) fixtureDate.value = fixture.date;
        if (fixtureTeam1) fixtureTeam1.value = fixture.team1;
        if (fixtureTeam2) fixtureTeam2.value = fixture.team2;
        if (fixtureVenue) fixtureVenue.value = fixture.venue;
        if (fixtureTime) fixtureTime.value = fixture.time;
        
        openModal('addFixtureModal');
        alert(`Editing fixture: ${fixture.team1} vs ${fixture.team2}`);
    }
}

function deleteFixture(fixtureId) {
    if (confirm('Are you sure you want to delete this fixture?')) {
        appData.fixtures = appData.fixtures.filter(f => f.id !== fixtureId);
        alert('Fixture deleted successfully!');
        updateFixturesTable();
        updateAdminStats();
        updateHomeStats();
        updatePlayerUpcomingMatches();
    }
}

function editResult(resultId) {
    const result = appData.results.find(r => r.id === resultId);
    if (result) {
        // Pre-fill the form
        const resultSport = document.getElementById('resultSport');
        const resultDate = document.getElementById('resultDate');
        const resultTeam1 = document.getElementById('resultTeam1');
        const resultTeam2 = document.getElementById('resultTeam2');
        const resultScore1 = document.getElementById('resultScore1');
        const resultScore2 = document.getElementById('resultScore2');
        
        if (resultSport) resultSport.value = result.sport;
        if (resultDate) resultDate.value = result.date;
        if (resultTeam1) resultTeam1.value = result.team1;
        if (resultTeam2) resultTeam2.value = result.team2;
        if (resultScore1) resultScore1.value = result.score1;
        if (resultScore2) resultScore2.value = result.score2;
        
        openModal('addResultModal');
        alert(`Editing result: ${result.team1} vs ${result.team2}`);
    }
}

function deleteResult(resultId) {
    if (confirm('Are you sure you want to delete this result?')) {
        appData.results = appData.results.filter(r => r.id !== resultId);
        alert('Result deleted successfully!');
        updateResultsTable();
        updateAdminStats();
        updateHomeStats();
    }
}

function viewPlayerDetails(playerId) {
    const players = [
        { name: 'John Smith', position: 'Forward', age: 25, height: '180cm', weight: '75kg', experience: '5 years', status: 'Active' },
        { name: 'Mike Johnson', position: 'Midfielder', age: 28, height: '175cm', weight: '70kg', experience: '7 years', status: 'Active' },
        { name: 'Sarah Wilson', position: 'Defender', age: 24, height: '170cm', weight: '65kg', experience: '4 years', status: 'Active' },
        { name: 'David Brown', position: 'Goalkeeper', age: 30, height: '190cm', weight: '85kg', experience: '10 years', status: 'Active' }
    ];
    
    const player = players[playerId - 1] || { 
        name: 'Unknown Player', 
        position: 'Unknown', 
        age: 'N/A', 
        height: 'N/A', 
        weight: 'N/A', 
        experience: 'N/A',
        status: 'Unknown'
    };
    
    alert(`Player: ${player.name}\nPosition: ${player.position}\nAge: ${player.age}\nHeight: ${player.height}\nWeight: ${player.weight}\nExperience: ${player.experience}\nStatus: ${player.status}`);
}

function assessPlayer(playerId) {
    const players = ['John Smith', 'Mike Johnson', 'Sarah Wilson', 'David Brown'];
    const player = players[playerId - 1] || 'Unknown Player';
    
    // Pre-fill the assessment form
    const assessmentPlayer = document.getElementById('assessmentPlayer');
    if (assessmentPlayer) assessmentPlayer.value = player;
    
    openModal('playerAssessmentModal');
    alert(`Assessing player: ${player}`);
}

// REPORT GENERATION FUNCTIONS
function generateReport() {
    const reportData = {
        generated: new Date().toLocaleString(),
        totalUsers: appData.users.length,
        totalSports: appData.sports.length,
        totalFixtures: appData.fixtures.length,
        totalResults: appData.results.length,
        usersByRole: {
            player: appData.users.filter(u => u.role === 'player').length,
            coach: appData.users.filter(u => u.role === 'coach').length,
            admin: appData.users.filter(u => u.role === 'admin').length
        },
        sportsByType: {
            outdoor: appData.sports.filter(s => s.type === 'outdoor').length,
            indoor: appData.sports.filter(s => s.type === 'indoor').length
        }
    };
    
    const reportText = `
=== SPORTS MANAGEMENT SYSTEM REPORT ===
Generated: ${reportData.generated}

SUMMARY STATISTICS:
- Total Users: ${reportData.totalUsers}
- Total Sports Categories: ${reportData.totalSports}
- Upcoming Fixtures: ${reportData.totalFixtures}
- Matches Played: ${reportData.totalResults}

USER DISTRIBUTION:
- Players: ${reportData.usersByRole.player}
- Coaches: ${reportData.usersByRole.coach}
- Administrators: ${reportData.usersByRole.admin}

SPORTS CATEGORIES:
- Outdoor Sports: ${reportData.sportsByType.outdoor}
- Indoor Sports: ${reportData.sportsByType.indoor}

UPCOMING FIXTURES:
${appData.fixtures.map(f => `  - ${f.date}: ${f.team1} vs ${f.team2} (${f.sport}) at ${f.time}`).join('\n')}

RECENT RESULTS:
${appData.results.map(r => `  - ${r.date}: ${r.team1} ${r.score1}-${r.score2} ${r.team2} (${r.winner} won)`).join('\n')}
            `;
    
    console.log('Generated Report:', reportData);
    alert('System report generated! Check browser console for details.');
}

function generateCoachReport() {
    const winRate = Math.round((appData.coachStats.matchesWon / 
        (appData.coachStats.matchesWon + appData.coachStats.matchesLost)) * 100);
    
    const reportText = `
=== TEAM COACHING REPORT ===
Generated: ${new Date().toLocaleString()}

TEAM STATISTICS:
- Total Players: ${appData.coachStats.totalPlayers}
- Active Players: ${appData.coachStats.activePlayers}
- Injured Players: ${appData.coachStats.injuredPlayers}
- Team Rating: ${appData.coachStats.teamRating}

PERFORMANCE METRICS:
- Matches Won: ${appData.coachStats.matchesWon}
- Matches Lost: ${appData.coachStats.matchesLost}
- Win Rate: ${winRate}%
- Goals For: ${appData.coachStats.goalsFor}
- Goals Against: ${appData.coachStats.goalsAgainst}
- Goal Difference: ${appData.coachStats.goalsFor - appData.coachStats.goalsAgainst}

TRAINING SCHEDULE:
${appData.trainingSessions.map(t => `  - ${t.type}: ${t.time}`).join('\n')}
            `;
    
    alert('Team coaching report generated!');
    console.log('Coach Report:', reportText);
}

// Make functions available globally
window.showSection = showSection;
window.openModal = openModal;
window.closeModal = closeModal;
window.filterSports = filterSports;
window.editUser = editUser;
window.deleteUser = deleteUser;
window.editFixture = editFixture;
window.deleteFixture = deleteFixture;
window.editResult = editResult;
window.deleteResult = deleteResult;
window.viewPlayerDetails = viewPlayerDetails;
window.assessPlayer = assessPlayer;
window.generateReport = generateReport;
window.generateCoachReport = generateCoachReport;