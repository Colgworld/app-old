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
 * ### Translations
 */
var I18n = require('react-native-i18n')
import Translations from '../Lib/Translations'
I18n.translations = Translations

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
export default function fieldValidation (state, action) {
  const {field, value} = action.payload



  switch (field) {
    /**
     * ### username validation
     * set the form field error
     */
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

    /**
     * ### email validation
     * set the form field error
     */
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

    /**
     * ### password validation
     * set the form field error
     */
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

    /**
     * ### passwordAgain validation
     * set the form field error
     */
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
      let valid = _.isUndefined(validate({name: state.project.name}, pwNameConstraints))

      if (valid) {
        return state.setIn(['project', 'nameHasError'], false)
                  .setIn(['project', 'nameErrorMsg'], '')
      } else {
        return state.setIn(['project', 'nameHasError'], true)
                  .setIn(['project', 'nameErrorMsg'], "Project Name must be more than 5 characters")
      }
    }

    case ("cost"): {
      let valid = _.isUndefined(validate({cost: state.project.cost}, pwCostConstraints))

      if (valid) {
        return state.setIn(['project', 'costHasError'], false)
                  .setIn(['project', 'costErrorMsg'], '')
      } else {
        return state.setIn(['project', 'costHasError'], true)
                  .setIn(['project', 'costErrorMsg'], "Cost must be only numbers and at least $1")
      }
    }

    case ("details"): {
      let valid = _.isUndefined(validate({details: state.project.details}, pwDetailsConstraints))

      if (valid) {
        return state.setIn(['project', 'detailsHasError'], false)
                  .setIn(['project', 'detailsErrorMsg'], '')
      } else {
        return state.setIn(['project', 'detailsHasError'], true)
                  .setIn(['project', 'detailsErrorMsg'], "Describe the project in at least 2 sentences")
      }
    }

    case ("endDate"): {
      let valid = _.isUndefined(validate({endDate: state.project.endDate}, pwDateConstraints))

      if (valid) {
        return state.setIn(['project', 'endDateHasError'], false)
                  .setIn(['project', 'endDateErrorMsg'], '')
      } else {
        return state.setIn(['project', 'endDateHasError'], true)
                  .setIn(['project', 'endDateErrorMsg'], "Select your start and end dates")
      }      
    }


    case ("payments"): {

      let valid = _.isUndefined(validate({
        remainingCost: state.project.remainingCost
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
