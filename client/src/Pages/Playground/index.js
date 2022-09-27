import React, { useEffect, useState } from 'react';
import _ from 'lodash';

import { Row, Col, Divider, Layout, Typography, Input, Button, Badge } from 'antd';
import { ControlOutlined, UnorderedListOutlined, TableOutlined } from '@ant-design/icons';

import { useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { requestDeleteVariations } from '../../store/reducers/creative'; 

// Components
import IframePreview from '../../Components/IframePreview'

// reducers
import { requestCreative } from '../../store/reducers/creative';

const { Content } = Layout;
const { Title, Text } = Typography;

export default function Playground () {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [isGrid, setGrid] = useState(true);
    const [search, setSearch] = useState('');
    const { creative: {
        data: creativeData },
        variations: {
            data: { _id: variantId , generation },
            fetching: variationsFetching }
    } = useSelector((state) => state.creative);

    useEffect(() => {
        dispatch(requestCreative({ creativeId: id }));
    }, [id, dispatch]);

    const handleChangeListView = (e) => {
        e.preventDefault();
        setGrid(!isGrid);
    }

    const handleFilterCreative = (e) => {
        e.preventDefault();
        setSearch(e.target.value)
    }

    const handleDelete = (name, variantId) => {
        dispatch(requestDeleteVariations({
            name,
            variantId
        }));
    }

    return (
        <Layout className="playground">
            <div style={{ padding: '20px 50px 0' }}>
                <Title level={2} className="playground-title">
                    {creativeData?.concept}
                </Title>
            </div>

            <Divider />
            <Content style={{ padding: '0 50px 50px' }}>
                <Row>
                    <Col span={8}>
                        <Row gutter={[16, 16]} >
                            <Col>
                                <Input placeholder="Name or Keyword" onChange={handleFilterCreative} allowClear />
                            </Col>
                            <Col>
                                <Button
                                    type="primary"
                                    icon={<ControlOutlined />}
                                >
                                    Filter
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={8} offset={8} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Row gutter={[16, 16]}>
                            <Col style={{ alignItems: "center", display: 'flex' }}>
                                <Row gutter={[8, 8]}>
                                    <Col>
                                        <Badge count={!variationsFetching && _.filter(generation, generate => generate?.name?.toLowerCase().includes(search.toLowerCase()))?.length} />
                                    </Col>
                                    <Col>
                                        Combinations
                                    </Col>
                                </Row>
                            </Col>
                            <Col>
                                <Button
                                    type="primary"
                                    icon={isGrid ? <UnorderedListOutlined /> : <TableOutlined />}
                                    onClick={handleChangeListView}
                                >
                                    {isGrid ? "List" : "Grid"}
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Divider plain className="playground-divider">
                    <Title level={5} style={{ marginBottom: 0 }}>{`${creativeData.size}-${creativeData.name}`}</Title>
                    <Text type="warning">{creativeData?.version}</Text>
                </Divider>

                <Row gutter={[16, 16]} justify="center">
                    {
                        !variationsFetching && _.filter(generation, generate => generate?.name?.toLowerCase().includes(search.toLowerCase()))?.map((data, index) =>
                            <IframePreview 
                                key={index} 
                                title={data?.name}
                                width={creativeData?.size?.split("x")[0]} 
                                height={creativeData?.size?.split("x")[1]} 
                                grid={isGrid}
                                defaultValues={data?.defaultValues}
                                size={creativeData?.size}
                                name={creativeData?.name}
                                previewId={creativeData?._id}
                                onDelete={() => handleDelete(data?.name, variantId)}
                                index={index}
                            />
                        )
                    }
                </Row>
            </Content>
        </Layout>
    )
}
