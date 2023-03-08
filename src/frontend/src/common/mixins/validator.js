import { EMAIL_REGEX, NUMBER_REGEX } from "../constants";

const rules = {
  required: {
    rule: (value) => !!value?.trim(),
    message: (name) => `Поле "${name}" обязательно для заполнения`,
  },
  email: {
    rule: (value) => (value ? EMAIL_REGEX.test(value.toLowerCase()) : true),
    message: (name) => `Значение в поле "${name}" имеет неверный формат`,
  },
  number: {
    rule: (value) => (value ? NUMBER_REGEX.test(value) : true),
    message: (name) => `Значение в поле "${name}" не является числом`,
  },
};

const validator = (value, name, appliedRules) => {
  let error = "";

  appliedRules.forEach((appliedRule) => {
    if (!rules[appliedRule]) return;

    const { rule, message } = rules[appliedRule];

    if (!rule(value)) {
      error = message(name);
    }
  });

  return error;
};

export default {
  methods: {
    $validateFields(fields, validations) {
      let isValid = true;

      Object.keys(validations).forEach((key) => {
        validations[key].error = validator(
          fields[key],
          validations[key].name,
          validations[key].rules
        );

        if (validations[key].error) isValid = false;
      });

      return isValid;
    },

    $clearValidationErrors() {
      if (!this.validations) return;

      Object.keys(this.validations).forEach((key) => {
        this.$set(this.validations[key], "error", "");
      });
    },

    $showErrors() {
      for (const key in this.validations) {
        const { error } = this.validations[key];
        error && this.$notifier.error(error);
      }
    },
  },
};
