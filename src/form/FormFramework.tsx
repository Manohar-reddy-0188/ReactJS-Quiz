import is from 'is_js';

export function createControl( config: object, validation: object ): object {
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

export function validate( value: string, validationRules: object ): boolean {

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
