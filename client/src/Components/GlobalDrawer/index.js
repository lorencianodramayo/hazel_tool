import React from 'react';
import { Drawer } from 'antd';

export default function GlobalDrawer({ size, title, onClose, open, component, placement, extra }) {
  return (
    <Drawer
      title={title}
      placement={placement}
      size={size}
      closable={false}
      onClose={onClose}
      open={open}
      maskClosable={false}
      extra={extra}
    >
      {component}
    </Drawer>
  );
}
