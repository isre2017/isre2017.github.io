


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
			$('#early_cost').html('<td>325</td>');
			$('#late_cost').html('<td>375</td>');
			$('#paypal_code').val('5A528G7WWDU6W')
		} else if (reg_type == 'Regular Non-Member') {
			$('#payment_type').html('<td>Regular Non-Member</td>');
			$('#early_cost').html('<td>400</td>');
			$('#late_cost').html('<td>450</td>');		
			$('#paypal_code').val('37HLTS9Z2BHGW')	
		} else if (reg_type == 'Student/Postdoc Member') {
			$('#payment_type').html('<td>Student/Postdoc Member</td>');
			$('#early_cost').html('<td>275</td>');
			$('#late_cost').html('<td>325</td>');		
			$('#paypal_code').val('DDT7LVSXQ3MC6')	
		} else if (reg_type == 'Student/Postdoc Non-Member') {
			$('#payment_type').html('<td>Student/Postdoc Non-Member</td>');
			$('#early_cost').html('<td>300</td>');
			$('#late_cost').html('<td>350</td>');	
			$('#paypal_code').val('22D5AMR6JKFHQ')		
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