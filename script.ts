// Function to generate the resume based on form inputs
function generateResume(): void {
    // Capture form data
    const username = (document.getElementById('username') as HTMLInputElement).value;
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const phone = (document.getElementById('phone') as HTMLInputElement).value;
    const company = (document.getElementById('company') as HTMLInputElement).value;
    const position = (document.getElementById('position') as HTMLInputElement).value;
    const duration = (document.getElementById('duration') as HTMLInputElement).value;
    const school = (document.getElementById('school') as HTMLInputElement).value;
    const degree = (document.getElementById('degree') as HTMLInputElement).value;
    const year = (document.getElementById('year') as HTMLInputElement).value;
    const skills = (document.getElementById('skills') as HTMLInputElement).value.split(',');

    // Handle image upload
    const imageInput = document.getElementById('image') as HTMLInputElement;
    let imageURL = '';
    
    if (imageInput.files && imageInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            imageURL = e.target?.result as string;

            // Generate resume URL
            const resumeURL = `${window.location.origin}/${username}_cv.html`;

            // Generate resume template with the image
            const resumeTemplate = `
                <h2>${name}</h2>
                <img src="${imageURL}" alt="Profile Picture" style="width:150px; height:150px; border-radius:50%;" />
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                
                <h3>Work Experience</h3>
                <p><strong>Company:</strong> ${company}</p>
                <p><strong>Position:</strong> ${position}</p>
                <p><strong>Duration:</strong> ${duration}</p>
                
                <h3>Education</h3>
                <p><strong>School:</strong> ${school}</p>
                <p><strong>Degree:</strong> ${degree}</p>
                <p><strong>Graduation Year:</strong> ${year}</p>
                
                <h3>Skills</h3>
                <ul>
                    ${skills.map(skill => `<li>${skill.trim()}</li>`).join('')}
                </ul>

                <p><strong>Resume Link:</strong> <a href="${resumeURL}" target="_blank">${resumeURL}</a></p>
            `;

            // Output the generated resume
            const resumeOutput = document.getElementById('resumeOutput');
            if (resumeOutput) {
                resumeOutput.innerHTML = resumeTemplate;
                setupDownloadAndCopy(resumeTemplate, resumeURL); // Setup download and copy link
            }
        };

        // Read the selected image file
        reader.readAsDataURL(imageInput.files[0]);
    } else {
        // Generate resume URL
        const resumeURL = `${window.location.origin}/${username}_cv.html`;

        // Generate resume template without the image
        const resumeTemplate = `
            <h2>${name}</h2>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            
            <h3>Work Experience</h3>
            <p><strong>Company:</strong> ${company}</p>
            <p><strong>Position:</strong> ${position}</p>
            <p><strong>Duration:</strong> ${duration}</p>
            
            <h3>Education</h3>
            <p><strong>School:</strong> ${school}</p>
            <p><strong>Degree:</strong> ${degree}</p>
            <p><strong>Graduation Year:</strong> ${year}</p>
            
            <h3>Skills</h3>
            <ul>
                ${skills.map(skill => `<li>${skill.trim()}</li>`).join('')}
            </ul>

            <p><strong>Resume Link:</strong> <a href="${resumeURL}" target="_blank">${resumeURL}</a></p>
        `;

        // Output the generated resume
        const resumeOutput = document.getElementById('resumeOutput');
        if (resumeOutput) {
            resumeOutput.innerHTML = resumeTemplate;
            setupDownloadAndCopy(resumeTemplate, resumeURL); // Setup download and copy link
        }
    }
}

// Function to set up PDF download and copy shareable link
function setupDownloadAndCopy(resumeTemplate: string, resumeURL: string): void {
    // Create or update the download button
    const downloadButton = document.getElementById('download') as HTMLButtonElement;
    if (!downloadButton) {
        const actionsSection = document.getElementById('actions');
        if (actionsSection) {
            const button = document.createElement('button');
            button.id = 'download';
            button.textContent = 'Download as PDF';
            button.addEventListener('click', () => {
                import('jspdf').then(({ jsPDF }) => {
                    const pdf = new jsPDF();
                    pdf.html(document.getElementById('resumeOutput') as HTMLElement, {
                        callback: (pdf) => {
                            pdf.save('resume.pdf');
                        },
                        x: 10,
                        y: 10,
                    });
                });
            });
            actionsSection.appendChild(button);
        }
    }

    // Create or update the copy link button
    const copyButton = document.getElementById('copyLink') as HTMLButtonElement;
    if (!copyButton) {
        const actionsSection = document.getElementById('actions');
        if (actionsSection) {
            const button = document.createElement('button');
            button.id = 'copyLink';
            button.textContent = 'Copy Shareable Link';
            button.addEventListener('click', () => {
                navigator.clipboard.writeText(resumeURL)
                    .then(() => alert('Resume link copied to clipboard!'))
                    .catch(err => console.error('Failed to copy: ', err));
            });
            actionsSection.appendChild(button);
        }
    }
}

// Event listener for the 'Generate Resume' button
const generateButton = document.getElementById('generate') as HTMLButtonElement;
if (generateButton) {
    generateButton.addEventListener('click', generateResume);
}
