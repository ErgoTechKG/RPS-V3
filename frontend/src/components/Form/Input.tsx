import React from 'react';
import { Input as AntInput } from 'antd';
import type { InputProps as AntInputProps } from 'antd';
import classNames from 'classnames';
import './style.css';

export interface InputProps extends AntInputProps {
  error?: boolean;
  helperText?: string;
}

const Input: React.FC<InputProps> & {
  Password: React.FC<InputProps>;
} = ({ 
  error,
  helperText,
  className,
  ...props 
}) => {
  const inputClass = classNames(
    'custom-input',
    {
      'custom-input--error': error,
    },
    className
  );

  return (
    <div className="custom-input-wrapper">
      <AntInput
        {...props}
        className={inputClass}
        status={error ? 'error' : undefined}
      />
      {helperText && (
        <span className={`custom-input-helper ${error ? 'custom-input-helper--error' : ''}`}>
          {helperText}
        </span>
      )}
    </div>
  );
};

// Password input subcomponent
Input.Password = ({ 
  error,
  helperText,
  className,
  ...props 
}) => {
  const inputClass = classNames(
    'custom-input',
    {
      'custom-input--error': error,
    },
    className
  );

  return (
    <div className="custom-input-wrapper">
      <AntInput.Password
        {...props}
        className={inputClass}
        status={error ? 'error' : undefined}
      />
      {helperText && (
        <span className={`custom-input-helper ${error ? 'custom-input-helper--error' : ''}`}>
          {helperText}
        </span>
      )}
    </div>
  );
};

export default Input;