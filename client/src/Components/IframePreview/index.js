import React, { useState } from 'react';

import { Row, Col } from 'antd';
import { PlayCircleOutlined, ReloadOutlined, EditOutlined, DeleteOutlined, PauseCircleOutlined } from '@ant-design/icons';

export default function IframePreview ({
    grid,
    width,
    title,
    height,
    defaultValues,
    size,
    name,
    previewId,
    onDelete,
    index,
}) {

    const [refresh, setRefresh] = useState(0);
    const [isPause, setPause] = useState(true);
    const [isShowPlay, setShowPlay] = useState(false);
    
    const handleRefresh = () => {
        setRefresh(refresh + 1);
    }

    const handlePlayPause = (data) => {
        setPause(data !== 'play');
    }

    const onLoad = (e, data) => {
        e.preventDefault();

        window.addEventListener("message", (event) => { 
            console.log(event?.data);
            switch(event?.data?.type){
                case "SCREENSHOT_START":
                case "SCREENSHOT":
                    setShowPlay(true);
                    setPause(false);
                    break;

                case "SCREENSHOT_STOP":
                    setShowPlay(false);
                    setPause(true);
                    break;
                
                default:
                    console.log(event?.data?.type)
                    break;
            }
         }, false);

        e.target.contentWindow.postMessage(
            {
                data,
                type: 'setDefaultValues'
            },
            e.target.src
        );
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
                        src={`https://storage.googleapis.com/creative-templates/${previewId}/${size}-${name}/index.html#adlibCreativeId=${index}`} title={name}
                        onLoad={(e) => onLoad(e, defaultValues)}
                    />
                </div>
                <Row className="iframe-footer">
                    <Col span={8}>
                        <Row gutter={[4, 4]}>
                            <Col style={{ display: isShowPlay? 'block' : 'none'}}>{isPause ? <PlayCircleOutlined onClick={() => handlePlayPause('play')} /> : <PauseCircleOutlined onClick={() => handlePlayPause('pause') } />}</Col>
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
