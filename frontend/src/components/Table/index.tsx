import React from 'react';
import { Table as AntTable } from 'antd';
import type { TableProps as AntTableProps } from 'antd';
import classNames from 'classnames';
import './style.css';

export interface TableProps<T = any> extends AntTableProps<T> {
  striped?: boolean;
}

const Table = <T extends object = any>({ 
  striped = true,
  className,
  ...props 
}: TableProps<T>) => {
  const tableClass = classNames(
    'custom-table',
    {
      'custom-table--striped': striped,
    },
    className
  );

  return (
    <AntTable<T>
      {...props}
      className={tableClass}
      pagination={{
        showSizeChanger: true,
        showTotal: (total, range) => `${range[0]}-${range[1]} / 共 ${total} 条`,
        ...props.pagination,
      }}
    />
  );
};

export default Table;