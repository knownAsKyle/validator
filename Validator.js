var Validator = Validator || (function(form) {
    var validateFunctions = {
        required: function(value) {
            return {
                valid: (value && value.trim() !== ""),
                message: "Required Field"
            };
        },
        minLength: function(value) {
            return {
                valid: (value && value.length >= 3),
                message: "Min Length of 3 not satisfied"
            };
        }
    }

    function Validator(form) {
        this.form = form;
        this.fields = null;
        this.options = {
            name: name,
            email: email,
            phone: phone
        }

        function name(val) {
            var rules = ["required"];
            for (rule in rules) {
                var check = validateFunctions[rules[rule]](val);
                if (!check.valid) return check.message;
            }
            return false;
        }

        function email(val) {
            var rules = ["required", "minLength"];
            for (rule in rules) {
                var check = validateFunctions[rules[rule]](val);
                if (!check.valid) return check.message;
            }
            return false;
        }

        function phone(val) {
            var rules = ["required"];
            for (rule in rules) {
                var check = validateFunctions[rules[rule]](val);
                if (!check.valid) return check.message;
            }
            return false;
        }
    }
    Validator.prototype.validate = function() {
        var _this = this;
        _this.valid = true;
        if (_this.form) {
            _this.fields = _this.form.find(".validate");
            _this.fields = $.makeArray(_this.fields);
            _validate(_this.fields[0]);
        }

        function _validate(field) {
            if (field) {
                field = $(field);
                var option = field.attr("name");
                var valid = _this.options[option];
                if (valid && typeof valid === "function") {
                    var check = valid(field.val());
                    if (check) {
                        _this.valid = false;
                    }
                    var errElement = field.css("background", (check ? "red" : ""))
                    _this.fields.shift();
                    _validate(_this.fields[0]);
                }
            } else {
                console.info("Done validating - ready to send?:", _this.valid)
            }
        }
    };
    return Validator;
})(form);