function showModal(title, details) {
    var modal = document.createElement('div');
    modal.classList.add('modal');

    var modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');

    var closeBtn = document.createElement('span');
    closeBtn.classList.add('close');
    closeBtn.innerHTML = '&times;';
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    var modalTitle = document.createElement('h2');
    modalTitle.textContent = title;

    var modalDetails = document.createElement('p');
    modalDetails.textContent = details;

    modalContent.appendChild(closeBtn);
    modalContent.appendChild(modalTitle);
    modalContent.appendChild(modalDetails);
    modal.appendChild(modalContent);

    document.body.appendChild(modal);

    modal.style.display = 'block';
}

// Function to show Cyber Solution details
function showCyberSolutionDetails() {
    var details = "1. For Security: $450 per month\n2. For finding Coruscate: Negotiable";
    showModal('Cyber Solution Details', details);
}

// Function to show Software Development details
function showSoftwareDevelopmentDetails() {
    var details = "Welcome EVA";
    showModal('Software Development Details', details);
}

// Function to show Web Pen Tester details
function showWebPenTesterDetails() {
    var details = "1. Checking API\n2. Checking Web App\n3. Checking Web App\n4. Checking Web App\n5. Checking Web App\n6. Checking Web App\n7. Checking Web App\n8. Checking Web App\n9. Checking Web App\n10. Checking Web App";
    showModal('Web Pen Tester Details', details);
}

// Function to show Video Editing details
function showVideoEditingDetails() {
    var details = "1. 30 seconds of editing\n2. 5 minutes of editing\n3. 1 hour of editing\n4. 2 hours of editing\n5. 3 hours of editing";
    showModal('Video Editing Details', details);
}

// Function to show Tour Guide details
function showTourGuideDetails() {
    var details = "1. 1 hour of traveling\n2. 2 hours of traveling\n3. 3 hours of traveling\n4. 4 hours of traveling\n5. 5 hours of traveling";
    showModal('Tour Guide Details', details);
}

// Function to show Tour Information details
function showTourInformationDetails() {
    var details = "1. 1000 photos\n2. 5000 photos\n3. 10000 photos\n4. 20000 photos\n5. 30000 photos";
    showModal('Tour Information Details', details);
}

// Close the modal when clicking outside of it
window.addEventListener('click', function(event) {
    var modals = document.getElementsByClassName('modal');
    for (var i = 0; i < modals.length; i++) {
        if (event.target === modals[i]) {
            modals[i].style.display = 'none';
        }
    }
});

// Close the modal when pressing Esc key
window.addEventListener('keydown', function(event) {
    var modals = document.getElementsByClassName('modal');
    for (var i = 0; i < modals.length; i++) {
        if (event.key === 'Escape') {
            modals[i].style.display = 'none';
        }
    }
});
