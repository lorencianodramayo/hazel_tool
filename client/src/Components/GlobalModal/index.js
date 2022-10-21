import React from 'react';

import { Modal } from 'antd';

export default function GlobalModal({ title, isVisible, onClose, footer, component }) {
  return (
    <Modal
        title={title}
        centered
        open={isVisible}
        onCancel={onClose}
        footer={footer}
      >
        {component}
      </Modal>
  );
}
