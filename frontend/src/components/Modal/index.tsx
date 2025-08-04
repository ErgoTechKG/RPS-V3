import React from 'react';
import { Modal as AntModal } from 'antd';
import type { ModalProps as AntModalProps } from 'antd';
import classNames from 'classnames';
import './style.css';

export interface ModalProps extends AntModalProps {
  size?: 'small' | 'medium' | 'large';
}

const Modal: React.FC<ModalProps> = ({ 
  size = 'medium',
  className,
  ...props 
}) => {
  const modalClass = classNames(
    'custom-modal',
    `custom-modal--${size}`,
    className
  );

  // Map size to width
  const getWidth = () => {
    switch (size) {
      case 'small':
        return 400;
      case 'medium':
        return 600;
      case 'large':
        return 800;
      default:
        return 600;
    }
  };

  return (
    <AntModal
      {...props}
      width={props.width || getWidth()}
      className={modalClass}
      centered
    />
  );
};

export default Modal;