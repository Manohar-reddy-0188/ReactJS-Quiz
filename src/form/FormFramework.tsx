import is from 'is_js';


export interface IValidation {
  required?: boolean;
  email?: boolean;
  minLength?: number;
}

export function createControl( config: object, validation: IValidation ): object {
  return {
    ...config,
    validation,
    valid: !validation,
    touched: false,
    value: ''
  };
}

export function createOptionControl( number: number ) {
  return createControl( {
    label: `Variant ${ number }`,
    errorMessage: 'Field can not Empty',
    id: number
  }, { required: true } );
}

export function validate( value: string, validationRules: IValidation ): boolean {

  if ( !validationRules ) {
    return true;
  }

  let isValid = true;

  if ( validationRules.required ) {
    isValid = !!value.trim() && isValid;
  }

  if ( validationRules.email ) {
    isValid = is.email( value ) && isValid;
  }

  if ( validationRules.minLength ) {
    isValid = value.trim().length >= validationRules.minLength && isValid;
  }

  return isValid;
}
