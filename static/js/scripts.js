// Optional: Add any additional Google sign-in success handlers here
function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log("Google Login successful!");
    console.log("Name: " + profile.getName());
    console.log("Email: " + profile.getEmail());
    // Add any additional logic here
}
