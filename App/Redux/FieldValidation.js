/**
 * # fieldValidation.js
 *
 * Define the validation rules for various fields such as email, username,
 * and passwords.  If the rules are not passed, the appropriate
 * message is displayed to the user
 *
 */
'use strict'

/**
 * ## Imports
 *
 * validate and underscore
 *
 */
import validate from 'validate.js'
import _ from 'underscore'

/**
 * ## Email validation setup
 * Used for validation of emails
 */
const emailConstraints = {
  from: {
    email: true
  }
}

/**
* ## username validation rule
* read the message.. ;)
*/
const usernamePattern = /^[a-zA-Z0-9]{6,12}$/
const usernameConstraints = {
  username: {
    format: {
      pattern: usernamePattern,
      flags: 'i'
    }
  }
}

/**
* ## password validation rule
* read the message... ;)
*/
// const passwordPattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,12}$/
// const passwordConstraints = {
//   password: {
//     format: {
//       pattern: passwordPattern,
//       flags: 'i'
//     }
//   }
// }

const passwordConstraints = {
  password: {
    presence: true,
      length: {
        minimum: 6,
        message: "must be at least 6 characters"
      }
  }
}

const passwordAgainConstraints = {
  confirmPassword: {
    equality: 'password'
  }
}




/**
 * Project Wizard Constraints
 */
const pwNameConstraints = {
  name: {
    length: {
      minimum: 5
    }
  }
}

const pwCostConstraints = {
  cost: {
    numericality: {
      onlyInteger: true,
      greaterThan: 0
    }
  }
}

const pwDetailsConstraints = {
  details: {
    length: {
      minimum: 1
    }
  }
}

const pwDateConstraints = {
  details: {
    length: {
      minimum: 1
    }
  }
}


const paymentConstraints = {
  remainingCost: {
    numericality: {
      onlyInteger: true,
      equalTo: 0,
    }
  }
}




/**
 * ## Field Validation
 * @param {Object} state Redux state
 * @param {Object} action type & payload
 */
export default function fieldValidation (state, { field, value }) {

  if (_.isObject(field)) {
    field = field[field.length-1]
  }

  switch (field) {
    case ('username'): {
      let validUsername = _.isUndefined(validate({username: value},
                                                usernameConstraints))
      if (validUsername) {
        return state.setIn(['form', 'fields', 'usernameHasError'],
                         false)
        .setIn(['form', 'fields', 'usernameErrorMsg'], '')
      } else {
        return state.setIn(['form', 'fields', 'usernameHasError'], true)
        .setIn(['form', 'fields', 'usernameErrorMsg'],
               I18n.t('FieldValidation.valid_user_name'))
      }
    }

    case ('email'): {
      let validEmail = _.isUndefined(validate({from: value},
                                             emailConstraints))
      if (validEmail) {
        return state.setIn(['form', 'fields', 'emailHasError'], false)
      } else {
        return state.setIn(['form', 'fields', 'emailHasError'], true)
        .setIn(['form', 'fields', 'emailErrorMsg'],
                 I18n.t('FieldValidation.valid_email'))
      }
    }

    case ('password'): {
      let validPassword = _.isUndefined(validate({password: value},
                                               passwordConstraints))
      if (validPassword) {
        return state.setIn(['form', 'fields', 'passwordHasError'],
                         false)
        .setIn(['form', 'fields', 'passwordErrorMsg'],
               '')
      } else {
        return state.setIn(['form', 'fields', 'passwordHasError'], true)
        .setIn(['form', 'fields', 'passwordErrorMsg'],
          I18n.t('FieldValidation.valid_password'))
      }
    }

    case ('passwordAgain'):
      var validPasswordAgain =
          _.isUndefined(validate({password: state.form.fields.password,
                                confirmPassword: value}, passwordAgainConstraints))
      if (validPasswordAgain) {
        return state.setIn(['form', 'fields', 'passwordAgainHasError'],
                         false)
        .setIn(['form', 'fields', 'passwordAgainErrorMsg'], '')
      } else {
        return state.setIn(['form', 'fields', 'passwordAgainHasError'],
                          true)
        .setIn(['form', 'fields', 'passwordAgainErrorMsg'],
        I18n.t('FieldValidation.valid_password_again'))
      }

    /**
     * ### showPassword
     * toggle the display of the password
     */
    case ('showPassword'):
      return state.setIn(['form', 'fields',
                                'showPassword'], value)


    case ("name"): {
      let valid = _.isUndefined(validate({name: state.form.name}, pwNameConstraints))

      if (valid) {
        return state.setIn(['form', 'project', 'nameHasError'], false).setIn(['form', 'project', 'nameErrorMsg'], '')
      } else {
        return state.setIn(['form', 'project', 'nameHasError'], true)
              .setIn(['form', 'project', 'nameErrorMsg'], "Project Name must be more than 5 characters")
      }
    }

    case ("cost"): {
      let valid = _.isUndefined(validate({cost: state.form.project.cost}, pwCostConstraints))

      if (valid) {
        return state.setIn(['form', 'project', 'costHasError'], false)
                  .setIn(['form', 'project', 'costErrorMsg'], '')
      } else {
        return state.setIn(['form', 'project', 'costHasError'], true)
                  .setIn(['form', 'project', 'costErrorMsg'], "Cost must be only numbers and at least $1")
      }
    }

    case ("budget"): {
      let valid = _.isUndefined(validate({budget: state.form.project.budget}, pwCostConstraints))

      if (valid) {
        return state.setIn(['form', 'project', 'budgetHasError'], false)
                  .setIn(['form', 'project', 'budgetErrorMsg'], '')
      } else {
        return state.setIn(['form', 'project', 'budgetHasError'], true)
                  .setIn(['form', 'project', 'budgetErrorMsg'], "Budget must be only numbers and at least $1")
      }
    }

    case ("details"): {
      let valid = _.isUndefined(validate({details: state.form.project.details}, pwDetailsConstraints))

      if (valid) {
        return state.setIn(['form', 'project', 'detailsHasError'], false)
                  .setIn(['form', 'project', 'detailsErrorMsg'], '')
      } else {
        return state.setIn(['form', 'project', 'detailsHasError'], true)
                  .setIn(['form', 'project', 'detailsErrorMsg'], "Describe the project in at least 2 sentences")
      }
    }

    case ("endDate"): {
      let valid = _.isUndefined(validate({endDate: state.form.project.endDate}, pwDateConstraints))

      if (valid) {
        return state.setIn(['form', 'project', 'endDateHasError'], false)
                  .setIn(['form', 'project', 'endDateErrorMsg'], '')
      } else {
        return state.setIn(['form', 'project', 'endDateHasError'], true)
                  .setIn(['form', 'project', 'endDateErrorMsg'], "Select your start and end dates")
      }      
    }

    case ("startDate"): {
      let valid = _.isUndefined(validate({endDate: state.form.project.startDate}, pwDateConstraints))

      if (valid) {
        return state.setIn(['form', 'project', 'startDateHasError'], false)
                  .setIn(['form', 'project', 'startDateErrorMsg'], '')
      } else {
        return state.setIn(['form', 'project', 'startDateHasError'], true)
                  .setIn(['form', 'project', 'startDateErrorMsg'], "Select your start and end dates")
      }      
    } 

    // case ("firstname"): {
    //   let valid = _.isUndefined(validate({endDate: state.form.startDate}, pwDateConstraints))

    //   if (valid) {
    //     return state.setIn(['form', 'startDateHasError'], false)
    //               .setIn(['form', 'startDateErrorMsg'], '')
    //   } else {
    //     return state.setIn(['form', 'startDateHasError'], true)
    //               .setIn(['form', 'startDateErrorMsg'], "Select your start and end dates")
    //   }      
    // } 

    // case ("lastname"): {
    //   let valid = _.isUndefined(validate({endDate: state.form.startDate}, pwDateConstraints))

    //   if (valid) {
    //     return state.setIn(['form', 'startDateHasError'], false)
    //               .setIn(['form', 'startDateErrorMsg'], '')
    //   } else {
    //     return state.setIn(['form', 'startDateHasError'], true)
    //               .setIn(['form', 'startDateErrorMsg'], "Select your start and end dates")
    //   }      
    // } 

    // case ("phone"): {
    //   let valid = _.isUndefined(validate({endDate: state.form.startDate}, pwDateConstraints))

    //   if (valid) {
    //     return state.setIn(['form', 'startDateHasError'], false)
    //               .setIn(['form', 'startDateErrorMsg'], '')
    //   } else {
    //     return state.setIn(['form', 'startDateHasError'], true)
    //               .setIn(['form', 'startDateErrorMsg'], "Select your start and end dates")
    //   }      
    // }                


    case ("payments"): {

      let valid = _.isUndefined(validate({
        remainingCost: state.form.remainingCost
      }, paymentConstraints))

      if (valid) {
        return state.set('allPaymentsValid', true)
                  .set('allPaymentsValidErrorMsg', '')
      } else {
        return state.set('allPaymentsValid', false)
                  .set('allPaymentsValidErrorMsg', "Use all money!!")
      }
    }

  }
  return state
}
