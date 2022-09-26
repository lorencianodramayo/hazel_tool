import React, { useState } from 'react';

import { Row, Col } from 'antd';
import { PlayCircleOutlined, ReloadOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

export default function IframePreview ({
    grid,
    width,
    title,
    height,
    defaultValues,
    onLoad,
    size,
    name,
    previewId,
    onDelete
}) {

    const [refresh, setRefresh] = useState(0);
    
    const handleRefresh = () => {
        setRefresh(refresh + 1);
    }

    return (
        <Col span={grid ? 'auto' : 24} style={!grid && { display: 'flex', justifyContent: 'center' }}>
            <div className="iframe-base">
                <div style={{ width: `${width}px` }}><p className="iframe-title">{title}</p></div>
                <div className="iframe-container" style={{ height: `${height}px` }}>
                    <iframe
                        key={refresh}
                        width={width}
                        height={height}
                        src={`https://storage.googleapis.com/creative-templates/${previewId}/${size}-${name}/index.html`} title={name}
                        onLoad={(e) => onLoad(e, defaultValues)}
                    />
                </div>
                <Row className="iframe-footer">
                    <Col span={8}>
                        <Row gutter={[4, 4]}>
                            <Col><PlayCircleOutlined /></Col>
                            <Col><ReloadOutlined onClick={handleRefresh}/></Col>
                        </Row>
                    </Col>
                    <Col span={8} offset={8} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Row gutter={[8, 8]}>
                            <Col><EditOutlined /></Col>
                            <Col><DeleteOutlined onClick={onDelete}/></Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        </Col>
    )
}
