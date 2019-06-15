function validateEmail(email) {
  var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  if(reg.test(email) === false) {
    console.log('Invalid email');
    return false;
  }
  return true;
}

function showError(reason, parentElement, nextElement) {
  if (typeof currentError !== 'undefined') {
    Blaze.remove(currentError);
  }
  const parentNode = document.getElementsByClassName(parentElement)[0];
  const nextNode = document.getElementById(nextElement);
  currentError = Blaze.renderWithData(Template.form_error, reason, parentNode, nextNode);
}

Template.ForgotPassword.events({
  'click #forgotpasswordsubmitbutton': function(event, template) {
    event.preventDefault();
    var forgotPasswordEmail = $('#forgotPasswordEmail').val();
    if(!validateEmail(forgotPasswordEmail)) {
      showError('Please enter a valid email address', 'inputcontainer', 'forgotPasswordEmail');
      return false;
    }
    Accounts.forgotPassword({email: forgotPasswordEmail}, function(err) {
      if(err) {
        console.log(err)
        if(err.message === 'User not found [403]') {
          showError('Email doesn\'t exist', 'inputcontainer', 'forgotPasswordEmail');
          console.log('Email doesn\'t exist');
        } else {
          showError('We are sorry, but something went wrong', 'inputcontainer', 'forgotPasswordEmail');
          console.log('We are sorry, but something went wrong');
        }
      } else {
        console.log('Email sent, check your mailbox');
        window.location.href = '/';
      }
    })
  },
  'click #loginemphasis': function (event, template) {
    $('.formcontainer').fadeOut(400);
    $('#darker').fadeOut(400, () => {
      Blaze.remove(popoverTemplate);
      window.setTimeout(() => {
        const parentNode = document.getElementById('nav');
        popoverTemplate = Blaze.render(Template.login, parentNode);
      }, 10);
    });
  },
});
