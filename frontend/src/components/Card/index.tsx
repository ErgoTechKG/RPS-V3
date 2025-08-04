import React from 'react';
import { Card as AntCard } from 'antd';
import type { CardProps as AntCardProps } from 'antd';
import classNames from 'classnames';
import './style.css';

export interface CardProps extends Omit<AntCardProps, 'variant'> {
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: 'sm' | 'md' | 'lg';
}

const Card: React.FC<CardProps> = ({ 
  variant = 'default',
  padding = 'md',
  className,
  children,
  ...props 
}) => {
  const cardClass = classNames(
    'custom-card',
    `custom-card--${variant}`,
    `custom-card--padding-${padding}`,
    className
  );

  return (
    <AntCard
      {...props}
      className={cardClass}
      bordered={variant === 'outlined'}
    >
      {children}
    </AntCard>
  );
};

export default Card;