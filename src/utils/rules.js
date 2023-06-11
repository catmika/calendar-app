import moment from "moment";

export const rules = {
  required: (message = "Mandatory field") => ({
    required: true,
    message,
  }),
  isDateAfter: (message) => ({
    validator(_, value) {
      const currentDate = moment().startOf("day").toDate();
      const selectedDate = value.toDate();
      if (selectedDate.getTime() >= currentDate.getTime()) {
        return Promise.resolve();
      }
      return Promise.reject(new Error(message));
    },
  }),
};
