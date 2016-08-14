var Validator = (function() {
    var defaultMinLength = 2;
    var defaultMaxLength = 20;
    // (http://jsfiddle.net/ghvj4gy9/embedded/result,js/)
    var emailStr = new RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    //(http://www.zparacha.com/phone_number_regex/)
    var phoneStr = new RegExp(/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/);
    var validateFunctions = {
        required: function(value) {
            return {
                valid: (value && value.trim() !== ""),
                message: "Required Field"
            };
        },
        minLength: function(value) {
            return {
                valid: (value && value.length >= defaultMinLength),
                message: "Min Length of " + defaultMinLength + " not satisfied"
            };
        },
        maxLength: function(value) {
            return {
                valid: (value && value.length <= defaultMaxLength),
                message: "Max Length of " + defaultMaxLength + " not satisfied"
            };
        },
        email: function(value) {
            return {
                valid: (emailStr.test(value)),
                message: "Not valid email"
            }
        },
        phone: function(value) {
            return {
                valid: (phoneStr.test(value)),
                message: "Not valid phone number"
            }
        }
    }

    function Validator(form) {
        this.form = form;
    }
    Validator.prototype.setForm = function(form) {
        this.form = form;
    }
    Validator.prototype.validate = function(cb) {
        var _this = this;
        _this.valid = true;
        if (_this.form) {
            _this.fields = $.makeArray(_this.form.find(".validate"));
            _validate(_this.fields[0]);
        } else {
            return cb(false);
        }

        function _validate(field) {
            if (field) {
                var keepChecking = true;
                field = $(field);
                $.map(validateFunctions, checkForRule);
                _this.fields.shift();
                _validate(_this.fields[0]);

                function checkForRule(val, rule) {
                    if (keepChecking && typeof field.attr(rule) === "string") {
                        var check = validateFunctions[rule](field.val());
                        doFailedAnimationOrActionOrWhatever(!check.valid);
                        if (!check.valid) {
                            _this.valid = false;
                            keepChecking = false;
                            console.log(check.message);
                        }
                    }
                    return rule;
                }

                function doFailedAnimationOrActionOrWhatever(fail) {
                    field.css("background", (fail ? "red" : ""))
                }
            } else {
                return cb(_this.valid);
            }
        }
    };
    return Validator;
})();