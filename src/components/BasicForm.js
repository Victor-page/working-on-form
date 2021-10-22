import useInput from '../hooks/use-input';

const isBlank = (value) => value.trim() !== '';

const validateEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const BasicForm = (props) => {
  const {
    value: firstNameValue,
    isValid: isFirstNameValid,
    hasError: hasFirstNameError,
    valueChangeHandler: firstNameChangeHandler,
    inputBlurHandler: firstNameBlurHandler,
    reset: resetFirstName,
  } = useInput(isBlank);

  const {
    value: lastNameValue,
    isValid: isLastNameValid,
    hasError: hasLastNameError,
    valueChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBlurHandler,
    reset: resetLastName,
  } = useInput(isBlank);

  const {
    value: emailValue,
    isValid: isEmailValid,
    hasError: hasEmailError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput(validateEmail);

  const isFormValid =
    isFirstNameValid && isLastNameValid && isEmailValid ? true : false;

  const resetFields = () => {
    resetFirstName();
    resetLastName();
    resetEmail();
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (!isFormValid) {
      return;
    }

    console.log({ firstNameValue, lastNameValue, emailValue });

    resetFields();
  };

  const formControlClasses = (hasError) =>
    hasError ? 'form-control invalid' : 'form-control';

  const firstNameClasses = formControlClasses(hasFirstNameError);

  const lastNameClasses = formControlClasses(hasLastNameError);

  const emailClasses = formControlClasses(hasEmailError);

  return (
    <form onSubmit={submitHandler}>
      <div className="control-group">
        <div className={firstNameClasses}>
          <label htmlFor="name">First Name</label>
          <input
            type="text"
            id="name"
            value={firstNameValue}
            onChange={firstNameChangeHandler}
            onBlur={firstNameBlurHandler}
          />
          {hasFirstNameError && (
            <p className="error-text">First Name is mandatory.</p>
          )}
        </div>
        <div className={lastNameClasses}>
          <label htmlFor="name">Last Name</label>
          <input
            type="text"
            id="name"
            value={lastNameValue}
            onChange={lastNameChangeHandler}
            onBlur={lastNameBlurHandler}
          />
          {hasLastNameError && (
            <p className="error-text">Last Name is mandatory.</p>
          )}
        </div>
      </div>
      <div className={emailClasses}>
        <label htmlFor="name">E-Mail Address</label>
        <input
          type="text"
          id="name"
          value={emailValue}
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
        />
        {hasEmailError && <p className="error-text">Email should be valid. </p>}
      </div>
      <div className="form-actions">
        <button disabled={!isFormValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
