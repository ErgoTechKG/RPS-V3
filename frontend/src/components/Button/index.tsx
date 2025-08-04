import React from 'react';
import { Button as AntButton } from 'antd';
import type { ButtonProps as AntButtonProps } from 'antd';
import classNames from 'classnames';
import './style.css';

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'text' | 'danger';
  className?: string;
  children?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  loading?: boolean;
  size?: 'small' | 'middle' | 'large';
  htmlType?: 'button' | 'submit' | 'reset';
  style?: React.CSSProperties;
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary',
  className,
  ...props 
}) => {
  const buttonClass = classNames(
    'custom-button',
    `custom-button--${variant}`,
    className
  );

  // Map custom variants to Ant Design types
  const getAntType = () => {
    switch (variant) {
      case 'primary':
        return 'primary';
      case 'secondary':
        return 'default';
      case 'text':
        return 'text';
      case 'danger':
        return 'primary';
      default:
        return 'default';
    }
  };

  return (
    <AntButton
      {...props}
      type={getAntType()}
      danger={variant === 'danger'}
      className={buttonClass}
    />
  );
};

export default Button;