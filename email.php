<?php

    // Only process POST reqeusts.
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // Get the form fields and remove whitespace.
        $name = strip_tags(trim($_POST["name"]));
				$name = str_replace(array("\r","\n"),array(" "," "),$name);
        $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
        $message = "this is a message";

        // Set the recipient email address.
        $recipient = $email;

        // Set the email subject.
        $subject = "Your registration for ISRE 2017";

        // Build the email content.
        $email_content = "This message confirms that you have submitted the following information to register for ISRE 2017.\n";
        $email_content .= "Name: $name\n";
		$email_content .= "After you have paid the registration fee, your registration will be complete."

        // Build the email headers.
        $email_headers = "From: jdwondra@umich.edu";

        // Send the email.
        if (mail($recipient, $subject, $email_content, $email_headers)) {
            // Set a 200 (okay) response code.
            http_response_code(200);
        } 

    } else {
        // Not a POST request, set a 403 (forbidden) response code.
        http_response_code(403);
        echo "There was a problem with your submission, please try again.";
    }

?>