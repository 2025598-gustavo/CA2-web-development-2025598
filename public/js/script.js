// Form validation function
function validateForm() {

    // Get trimmed values from input fields
    let name = document.getElementById("name").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let email = document.getElementById("email").value.trim();
    let message = document.getElementById("message").value.trim();
    let error = document.getElementById("error");

    // Clear previous errors
    error.innerHTML = "";

    // Check if any field is empty
    if (name == "" || phone == "" || email == "" || message == "") {
        error.innerHTML = "All fields must be filled"; // Show error message
        return false; // Prevent form submission
    }

    // Name validation: only letters and spaces allowed
    let namePattern = /^[A-Za-z ]+$/;
    if (!namePattern.test(name)) {
        error.innerHTML = "Name must contain letters only";
        return false;
    }

    // Phone validation: must be 9 or 10 digits
    let phonePattern = /^[0-9]{9,10}$/;
    if (!phonePattern.test(phone)) {
        error.innerHTML = "Phone must be 9 or 10 digits";
        return false;
    }

    // If all validations pass
    alert("Form submitted successfully"); // Optional confirmation
    return true; // Allow form submission
}