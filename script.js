// Sample data for users (simulating reading from a file or database)
const userData = {
    "S.SIVA": {
        course: "MOBILE APP DEVELOPMENT",
        startDate: "2023-06-15",
        endDate: "2023-12-15"
    },
    "PRIYA": {
        course: "WEB DEVELOPMENT",
        startDate: "2024-01-01",
        endDate: "2024-06-01"
    },
    "ANUMANTH SOORYA": {
        course: "DATA SCIENCE",
        startDate: "2023-03-01",
        endDate: "2023-09-01"
    },
    "DURGA DEVI": {
        course: "UI UX DESIGNER",
        startDate: "2023-03-05",
        endDate: "2023-09-03"
    }
};

// Auto-fill the course, start date, and end date when the name is entered
document.getElementById('name').addEventListener('input', function() {
    const nameInput = this.value.trim().toUpperCase();
    const courseInput = document.getElementById('course');
    const startDateInput = document.getElementById('startDate');
    const endDateInput = document.getElementById('endDate');

    // If the user data exists, auto-fill and update certificate preview
    if (userData[nameInput]) {
        const user = userData[nameInput];
        courseInput.value = user.course;
        startDateInput.value = user.startDate;
        endDateInput.value = user.endDate;

        // Update the certificate preview
        document.getElementById('certificate-name').textContent = nameInput;
        document.getElementById('certificate-course').textContent = `has successfully completed the course '${user.course}'`;
        document.getElementById('certificate-dates').textContent = `with 85% held by SharpenedMind from ${user.startDate} to ${user.endDate}`;
    } else {
        // Clear certificate preview if no user found
        courseInput.value = '';
        startDateInput.value = '';
        endDateInput.value = '';
        document.getElementById('certificate-name').textContent = 'SOORYA';
        document.getElementById('certificate-course').textContent = 'has successfully completed the course';
        document.getElementById('certificate-dates').textContent = 'with 85% held by SharpenedMind from 2023-06-15 to 2023-12-15.';
    }
});

// Make elements draggable
const resizables = document.querySelectorAll(".resizable");
let currentElement = null;

resizables.forEach(elem => {
    // Dragging functionality
    elem.addEventListener("mousedown", (e) => {
        currentElement = elem;
        currentElement.dataset.offsetX = e.clientX - currentElement.offsetLeft;
        currentElement.dataset.offsetY = e.clientY - currentElement.offsetTop;
    });
});

document.addEventListener("mousemove", (e) => {
    if (currentElement) {
        const offsetX = parseInt(currentElement.dataset.offsetX, 10);
        const offsetY = parseInt(currentElement.dataset.offsetY, 10);
        currentElement.style.left = `${e.clientX - offsetX}px`;
        currentElement.style.top = `${e.clientY - offsetY}px`;
    }
});

document.addEventListener("mouseup", () => {
    currentElement = null;
});

// Change background
document.getElementById("background").addEventListener("change", (e) => {
    const certificate = document.getElementById("certificate");
    certificate.style.backgroundImage = `url('${e.target.value}')`;
});

// Download PDF
document.getElementById("download-btn").addEventListener("click", async () => {
    const certificate = document.getElementById("certificate");
    const { jsPDF } = window.jspdf;
    const pdfSize = document.getElementById("pdf-size-selector").value;

    // Set PDF dimensions
    let pdfWidth, pdfHeight;
    if (pdfSize === "1600x800") {
        pdfWidth = 1600;
        pdfHeight = 800;
    } else if (pdfSize === "a4") {
        pdfWidth = 595.28; // A4 width in px
        pdfHeight = 841.89; // A4 height in px
    }

    const doc = new jsPDF({ orientation: "landscape", unit: "px", format: [pdfWidth, pdfHeight] });

    // Generate a canvas from the certificate
    const canvas = await html2canvas(certificate);
    const imageData = canvas.toDataURL("image/jpeg");

    // Add the image to the PDF
    doc.addImage(imageData, "JPEG", 0, 0, pdfWidth, pdfHeight);
    doc.save("Certificate.pdf");
});
