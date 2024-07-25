// Event listener for DOMContentLoaded to ensure the script runs after the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  emailjs.init("eWRRuKVf9FmfR9nJN");

  document.getElementById("form").addEventListener("submit", function (event) {
    event.preventDefault();

    emailjs.sendForm("service_0uz2zl7", "template_omyvadb", this).then(
      function () {
        alert("Email sent successfully!");
      },
      function (error) {
        alert("Failed to send email. Error: " + JSON.stringify(error));
      }
    );
  });
});
