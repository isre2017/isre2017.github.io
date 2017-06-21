


// Variable to hold request
var request;

// Bind to the submit event of our form
$("#foo").submit(function(event){
	
	// Form validation
	var name = document.forms['registration']['name'].value;
	if (name == '') {
		alert('Please enter your name');
		return false;
	}
	var email = document.forms['registration']['email'].value;
	if (email == '') {
		alert('Please enter your email address');
		return false;
	}
	var institution = document.forms['registration']['institution'].value;
	if (institution == '') {
		alert('Please enter your institution');
		return false;
	}
	var location = document.forms['registration']['location'].value;
	if (location == '') {
		alert('Please enter the location of your institution');
		return false;
	}
	var reg_type = document.forms['registration']['registration_type'].value;
	if (reg_type == '') {
		alert('Please select your registration type');
		return false;
	}


    // Abort any pending request
    if (request) {
        request.abort();
    }
    // setup some local variables
    var $form = $(this);

    // Let's select and cache all the fields
    var $inputs = $form.find("input, select, button, textarea");

    // Serialize the data in the form
    var serializedData = $form.serialize();

    // Let's disable the inputs for the duration of the Ajax request.
    // Note: we disable elements AFTER the form data has been serialized.
    // Disabled form elements will not be serialized.
    $inputs.prop("disabled", true);

    // Fire off the request to /form.php
    request = $.ajax({
        url: "https://script.google.com/macros/s/AKfycbyPt55x_O8N8MTxbLOb2x1Oufub_Vyeyw3zxWlwUZYYtu-O1MQ/exec",
        type: "post",
        data: serializedData
    });

    // Callback handler that will be called on success
    request.done(function (response, textStatus, jqXHR){
		
	// Switch payment information	
		$('#registration_form').css('display', 'none');
		if(reg_type == 'Regular Member') {
			$('#payment_type').html('<td>Regular Member</td>');
			$('#early_cost').html('<td>335</td>');
			$('#late_cost').html('<td>385</td>');
			$('#paypal_code').val('UT5N2BQJFCKVC');
			// $('#paypal_code').val('A4V6F4DK8WTWJ')    
		} else if (reg_type == 'Regular Non-Member') {
			$('#payment_type').html('<td>Regular Non-Member</td>');
			$('#early_cost').html('<td>410</td>');
			$('#late_cost').html('<td>460</td>');		
			$('#paypal_code').val('6GB5V54UM4PFW');
			// $('#paypal_code').val('8892EFBVMXSGE')    
		} else if (reg_type == 'Student/Postdoc Member') {
			$('#payment_type').html('<td>Student/Postdoc Member</td>');
			$('#early_cost').html('<td>285</td>');
			$('#late_cost').html('<td>335</td>');		
			$('#paypal_code').val('QTEE2RU8U9T6Y');	
			// $('#paypal_code').val('6PRXNUKP4KFNE')    
		} else if (reg_type == 'Student/Postdoc Non-Member') {
			$('#payment_type').html('<td>Student/Postdoc Non-Member</td>');
			$('#early_cost').html('<td>310</td>');
			$('#late_cost').html('<td>360</td>');	
			$('#paypal_code').val('9DCZE3ZJD8LHY');
			// $('#paypal_code').val('DRKNQZ76HHG7G')    
					
		}
		$('#payment').css('display', 'block');
		
		$('#foo')[0].reset();
        console.log("Hooray, it worked!");
        console.log(response);
        console.log(textStatus);
        console.log(jqXHR);
    });

    // Callback handler that will be called on failure
    request.fail(function (jqXHR, textStatus, errorThrown){
        // Log the error to the console
        console.error(
            "The following error occurred: "+
            textStatus, errorThrown
        );
    });

    // Callback handler that will be called regardless
    // if the request failed or succeeded
    request.always(function () {
        // Reenable the inputs
        $inputs.prop("disabled", false);
    });

    // Prevent default posting of form
    event.preventDefault();
});