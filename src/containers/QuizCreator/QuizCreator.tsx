import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import Select from '../../components/UI/Select/Select';
import { createControl, createOptionControl, validate } from '../../form/FormFramework';
import { postNewQuiz, resetQuiz, setNewQuiz } from '../../redux/actions/createQuizActions';
import { IRootState } from '../../redux/reducers/rootReducer';
import styles from './QuizCreator.module.scss';


const createForm = (): object => {
  return {
    question: createControl( { label: 'Write Question', errorMessage: 'Field can not Empty' }, { required: true } ),
    option1: createOptionControl( 1 ),
    option2: createOptionControl( 2 ),
    option3: createOptionControl( 3 ),
    option4: createOptionControl( 4 )
  };
};

const QuizCreator: React.FC = (): JSX.Element => {

  const quiz = useSelector( ( state: IRootState ) => state.create.quiz );
  const [ rightAnswerId, setRightAnswerId ] = useState<number>( 3 );
  const [ controls, setControls ] = useState<object>( createForm() );
  const [ isFormValid, setIsFormValid ] = useState<boolean>( false );
  const dispatch = useDispatch();

  const handlerAddQuestion = (): void => {
    const { question, option1, option2, option3, option4 } = controls;
    const newQuiz = {
      id: quiz.length,
      question: question.value,
      rightAnswerId,
      answers: [
        { text: option1.value, id: option1.id },
        { text: option2.value, id: option2.id },
        { text: option3.value, id: option3.id },
        { text: option4.value, id: option4.id }
      ]
    };

    dispatch( setNewQuiz( newQuiz ) );
    setControls( createForm() );
  };

  const handlerCreateTest = ( event ): void => {
    event?.preventDefault();
    dispatch( postNewQuiz( quiz ) );
    dispatch( resetQuiz() );
    setRightAnswerId( 3 );
    setControls( createForm() );
  };

  const handlerChange = ( event: Event, name: string ): void => {
    const control = { ...controls.[ name ] };
    control.touched = true;
    control.value = event.target.value;
    control.valid = validate( control.value, controls.[ name ].validation );

    let isValid = true;
    Object.keys( controls ).forEach( name => isValid = controls.[ name ].valid && isValid );

    setControls( prevState => ( { ...prevState, [ name ]: control } ) );
    setIsFormValid( isValid );
  };

  const handlerSelect = ( event: Event ): void => {
    setRightAnswerId( event.target.value );
  };

  const handlerSubmit = ( event: Event ): void => {
    event.preventDefault();
  };

  const renderInputs = () => {
    return Object.keys( controls ).map( ( name, index ) => {
      const input = controls.[ name ];
      return (
        <React.Fragment key={name + index}>
          <Input
            type={input.type}
            label={input.label}
            errorMessage={input.errorMessage}
            value={input.value}
            valid={input.valid}
            touched={input.touched}
            shouldValidate={!!input.validation}
            onChange={() => handlerChange( event, name )}
          />
          { index === 0 && <hr />}
        </React.Fragment>
      );
    } );
  };

  return (
    <div className={styles.QuizCreator}>

      <div>
        <h1>Create Test</h1>
        <form onSubmit={handlerSubmit}>
          {renderInputs()}
          <Select
            label="Try Right Answer"
            value={rightAnswerId}
            onChange={handlerSelect}
            options={[
              { text: '1', value: '1' },
              { text: '2', value: '2' },
              { text: '3', value: '3' },
              { text: '4', value: '4' }
            ]}
          />
          <Button
            type="primary"
            onClick={handlerAddQuestion}
            disabled={!isFormValid}>Add Question</Button>
          <Button
            type="success"
            onClick={handlerCreateTest}
            disabled={!quiz.length}>Create Test</Button>
        </form>
      </div>
    </div>
  );
};

export default QuizCreator;
