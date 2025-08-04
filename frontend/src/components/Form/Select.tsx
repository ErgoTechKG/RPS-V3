import React from 'react';
import { Select as AntSelect } from 'antd';
import type { SelectProps as AntSelectProps } from 'antd';
import classNames from 'classnames';
import './style.css';

export interface SelectProps extends AntSelectProps {
  error?: boolean;
  helperText?: string;
}

const Select: React.FC<SelectProps> = ({ 
  error,
  helperText,
  className,
  ...props 
}) => {
  const selectClass = classNames(
    'custom-select',
    {
      'custom-select--error': error,
    },
    className
  );

  return (
    <div className="custom-select-wrapper">
      <AntSelect
        {...props}
        className={selectClass}
        status={error ? 'error' : undefined}
      />
      {helperText && (
        <span className={`custom-select-helper ${error ? 'custom-select-helper--error' : ''}`}>
          {helperText}
        </span>
      )}
    </div>
  );
};

export default Select;