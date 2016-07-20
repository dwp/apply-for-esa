$('form').on('submit', function(e) {
    validate(e);
});

function validate(e) {
    
    var invalid = [];
    var num = 1;

    // Check all data-required tags
    $('*[data-required]:visible').each(function() {
        var textInputs = $(this).find('input[type="text"]:visible');
        var numberInputs = $(this).find('input[type="number"]:visible');
        var radioInputs = $(this).find('input[type="radio"]:visible');
        var checkboxInputs = $(this).find('input[type="checkbox"]:visible');
        var textAreas = $(this).find('textarea:visible');

        var selected = false;
        var id;
        var formGroup;
        var errorMessage;

        // Checkboxes
        if (checkboxInputs.length > 0) {
            formGroup = $(this)
            id = $(this).find('input').attr('id');
            selected = false;

            $(checkboxInputs).each(function() {
                if ($(this).parent().hasClass('selected')) {
                    selected = true;
                    return;
                }
            });

            if (selected === false) {
                invalid.push($(this).find('input').attr('name'));
                errorMessage = $(this).attr('data-error') || 'Select the option(s) that applies to you';

                if ($(this).find('.error-message').length === 0) {
                    formGroup.addClass('error');
                    $($(this).find('label')[0]).before(
                        String('<span id="error-message-' + num + '" class="error-message">' + errorMessage + '</span>')
                    );

                    $('.error-summary-list:first').append(
                        String('<li><a href="#' + id + '">' + errorMessage + '</a></li>')
                    );
                }
            } else {
                formGroup.removeClass('error');
                formGroup.find('.error-message').remove();
                $('.error-summary-list').find('a[href="#' + id + '"]').remove();
            }

            num++;
        }

        // Radios
        if (radioInputs.length > 0) {

            formGroup = $(this);
            id = $(this).find('input').attr('id');
            selected = false;

            $(radioInputs).each(function() {
                if ($(this).parent().hasClass('selected')) {
                    selected = true;
                    return;
                }
            });

            if (selected === false) {

                invalid.push($(this).find('input').attr('name'));
                errorMessage = $(this).attr('data-error') || 'Select the option that applies to you';

                if ($(this).find('.error-message').length === 0) {

                    formGroup.addClass('error');

                    $($(this).find('label')[0]).before(
                        String('<span id="error-message-' + num + '" class="error-message">' + errorMessage + '</span>')
                    );

                    $('.error-summary-list:first').append(
                        String('<li><a href="#' + id + '">' + errorMessage + '</a></li>')
                    );
                }
            } else {
                formGroup.removeClass('error');
                formGroup.find('.error-message').remove();
                $('.error-summary-list').find('a[href="#' + id + '"]').remove();
            }

            num++;
        }

        // Text inputs
        if (textInputs.length > 0) {
            $(textInputs).each(function() {
                var id = $(this).attr('id');
                var formGroup = $(this).parent();
                var label = $('label[for="' + $(this).attr('id') + '"]');
                var errorMessage = $(this).parents('fieldset').attr('data-error') || 'Enter ' + label.text().toLowerCase();

                if ($(this).val().length === 0) {
                    invalid.push($(this).attr('id'));
                    
                    // Find the formgroup for this input and add the error class
                    formGroup.addClass('error');
                    
                    // If the error message is not already showing, add it to the page
                    if (formGroup.find('.error-message').length === 0) {
                        label.after(
                            String('<span id="error-message-' + num + '" class="error-message">' + errorMessage + '</span>')
                        );

                        // Add the error to the summary list at the top of the page
                        $('.error-summary-list:first').append(
                            String('<li><a href="#' + id + '">' + errorMessage + '</a></li>')
                        );

                        num++;
                    }
                } else {
                    formGroup.removeClass('error');
                    formGroup.find('.error-message').remove();
                    $('.error-summary-list').find('a[href="#' + id + '"]').remove();
                }
            });
        }

        // Textareas
        if (textAreas.length > 0) {
            $(textAreas).each(function() {
                var id = $(this).attr('id');
                var formGroup = $(this).parents('.form-group');
                var label = $('label[for="' + $(this).attr('id') + '"]');
                var errorMessage = $(this).parents('fieldset').attr('data-error') || 'Enter ' + label.text().toLowerCase();

                if ($(this).val().length === 0) {
                    invalid.push($(this).attr('id'));
                    
                    // Find the formgroup for this input and add the error class
                    formGroup.addClass('error');
                    
                    // If the error message is not already showing, add it to the page
                    if ($(this).parents('.form-group').find('.error-message').length === 0) {
                        label.after(
                            String('<span id="error-message-' + num + '" class="error-message">' + errorMessage + '</span>')
                        );

                        // Add the error to the summary list at the top of the page
                        $('.error-summary-list:first').append(
                            String('<li><a href="#' + id + '">' + errorMessage + '</a></li>')
                        );

                        num++;
                    }
                } else {
                    $(this).parents('.form-group').removeClass('error');
                    $(this).parents('.form-group').find('.error-message').remove();
                    $('.error-summary-list').find('a[href="#' + id + '"]').remove();
                }
            });
        }

        // Numbers (dates)
        if (numberInputs.length > 0) {
            $(numberInputs).each(function() {
                var formGroup = $(this).closest('.form-group[data-required]');
                var label = $('label[for="' + $(this).attr('id') + '"]');
                var errorMessage = $(this).closest('.form-group[data-required]').attr('data-error') || 'Enter a date';

                if ($(this).val().length === 0) {
                    invalid.push($(this).attr('id'));
                    
                    // Find the formgroup for this input and add the error class
                    formGroup.addClass('error');
                    
                    // If the error message is not already showing, add it to the page
                    if ($(this).closest('fieldset').find('.error-message').length === 0) {
                        $(this).closest('fieldset').children('legend').after(
                            String('<span id="error-message-' + num + '" class="error-message">' + errorMessage + '</span>')
                        );

                        // Add the error to the summary list at the top of the page
                        $('.error-summary-list:first').append(
                            String('<li><a href="#' + formGroup.attr('id') + '">' + errorMessage + '</a></li>')
                        );

                        num++;
                    }
                } else {
                    $(this).parents('.form-group').removeClass('error');
                    $(this).parents('.form-group').find('.error-message').remove();
                    $('.error-summary-list').find('a[href="#' + id + '"]').remove();
                }
            });
        }
    });

    // If there is more than one invalid field
    if (invalid.length > 0) {
        e.preventDefault();
        // Show the error summary
        $('.error-summary:first').show();
        // Scroll to the top of the page
        $('body').scrollTop(0);
    }
}
