import React, { useEffect } from 'react';
import { Row, Col } from 'antd';

import { useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

// reducers
import { requestCreative } from '../../store/reducers/creative';

export default function Playground () {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { creative: {
        data: creativeData },
        variations: {
            data: { generation },
            fetching: variationsFetching }
    } = useSelector((state) => state.creative);

    useEffect(() => {
        dispatch(requestCreative({ creativeId: id }));
    }, [id, dispatch]);

    const onLoad = (e, data) => {
        e.target.contentWindow.postMessage(
            data,
            e.target.src
        );
    }

    return (
        <div className="playground">
            <Row gutter={[16, 16]}>
                {
                    !variationsFetching && generation?.map((data, index) =>
                        <Col key={index}>
                            <div className="iframe-base">
                                <div style={{ width: `${creativeData?.size?.split("x")[0]}px` }}><p className="iframe-title">{data?.name}</p></div>
                                <div className="iframe-container">
                                    <iframe
                                        width={creativeData?.size?.split("x")[0]}
                                        height={creativeData?.size?.split("x")[1]}
                                        src={`https://storage.googleapis.com/creative-templates/${creativeData?._id}/${creativeData.size}-${creativeData.name}/index.html`} title={data?.ame}
                                        onLoad={(e) => onLoad(e, data?.defaultValues)}
                                    />
                                </div>
                            </div>
                        </Col>
                    )
                }
            </Row>
        </div>
    )
}
