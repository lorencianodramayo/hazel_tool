import React, { useState } from 'react';

import ParticleBackground from 'react-particle-backgrounds';

import { useNavigate } from 'react-router-dom';

import _ from 'lodash';

import { useDispatch, useSelector } from 'react-redux';

// reducers
import { requestTemplates, requestBrief, resetAll, saveTemplate } from '../../store/reducers/templates';

// Components
import SearchInput from '../../Components/SearchInput';
import SelectGroupedInput from '../../Components/SelectGroupedInput';
import SelectInput from '../../Components/SelectInput';
import GlobalDrawer from '../../Components/GlobalDrawer';
import DynamicList from '../../Components/DynamicList';

// helpers

import { cartesian, updateObject } from '../../services/helpers';

import { Col, Row, Typography, Button } from 'antd';

import {
    LoadingOutlined,
} from '@ant-design/icons';
import { settings4 } from '../../services/utils/extra/background';

const { Title } = Typography;

export default function Home () {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [link, setLink] = useState('');
    const [selectedTemplate, setSelectedTemplate] = useState('');
    const [selectedVersion, setSelectedVersion] = useState('');
    const [drawerOpen, setDrawerOpen] = useState(false);

    const {
        brief: { data: briefData, fetching: isBriefFetching }, template: { data: templateData, fetching: isTemplateFetching }
    } = useSelector((state) => state.templates);

    const handleLinkChange = (e) => {
        const { value } = e.target;
        dispatch(resetAll());

        !_.isEmpty(value) && dispatch(requestBrief(value));
        setLink(value);
        setSelectedVersion('');
    }

    const handleTemplateChange = (e) => setSelectedTemplate(e);

    const handleVersionChange = (e) => setSelectedVersion(e);

    const handleDrawer = () => setDrawerOpen(!drawerOpen);

    const handleConfigure = (e) => {
        e.preventDefault();

        dispatch(requestTemplates({
            platform: link.split('/')[2].split(".")[0],
            templateId: selectedVersion,
            partnerId: _.filter(briefData?.templates, (data) => data?._id === selectedTemplate)[0]?.partnerId
        }))

        setDrawerOpen(true);
    }

    const handleGenerate = () => {
        const combinedData = !_.isEmpty(templateData?.possibleValues) ? cartesian(templateData?.possibleValues).map((combination) => {
            return {
                name: `max | ${combination.join(' | ')}`,
                defaultValues: updateObject(templateData?.defaultDynamicFieldsValues, combination.reduce(function (result, field, index) {
                    result[Object.keys(templateData?.possibleValues)[index]] = field;
                    return result;
                }, {})),
                status: null
            }
        }) : [
            {
                name: 'Default',
                defaultValues: templateData?.defaultDynamicFieldsValues,
                status: null
            }
        ];

        dispatch(saveTemplate
            ({
                concept: briefData?.name,
                size: templateData?.size,
                name: templateData?.name,
                template: templateData?.url,
                version: _.filter(_.filter(briefData?.templates, (data) => data?._id === selectedTemplate)[0]?.templateVersion?.map((data, index) =>
                    !_.isEmpty(data?.versionName) ? data?.id === selectedVersion && data?.versionName : data?.id === selectedVersion && `Version ${index + 1}`
                ), (_f) => _f !== false)[0],
                generation: combinedData
            }, navigate)
        );
    }

    return (
        <>
            <ParticleBackground settings={settings4} style={{ position: 'absolute' }} />
            <Row className='home'>
                <Col xs={24} sm={24} md={16} lg={12} className='left-panel'>
                    <Title level={1} className='title'>Concept <span>QA Tool</span></Title>
                    <Title level={5} strong className='description'>A tool that let's you generate multiple creative previews based on the triggers in just one setup.</Title>

                    <Row gutter={[12, 12]}>
                        <Col span={24}>
                            <SearchInput
                                size="large"
                                placeholder="Paste concept link"
                                className="input-link"
                                onChange={handleLinkChange}
                                readOnly={isBriefFetching}
                                suffix={<LoadingOutlined
                                    style={{ display: isBriefFetching ? 'block' : 'none' }} />}
                            />
                        </Col>
                        {
                            !_.isEmpty(briefData?.templates) && <>
                                <Col span={12}>
                                    <SelectGroupedInput
                                        options={
                                            _.mapValues(_.groupBy(briefData?.templates, 'size'),
                                                clist => clist.map(template => _.omit(template, 'size')))
                                        }
                                        placeholder="Select a Template"
                                        handleChange={handleTemplateChange}
                                    />
                                </Col>
                                <Col span={12}>
                                    <SelectInput
                                        options={_.filter(briefData?.templates, (data) => data?._id === selectedTemplate)[0]?.templateVersion}
                                        placeholder="Select a version"
                                        handleChange={handleVersionChange}
                                    />
                                </Col>
                            </>
                        }
                        <Col span={24}>
                            {
                                !_.isEmpty(selectedVersion) && <Button className="generate-button" size="large" block onClick={handleConfigure}>{isTemplateFetching ? <LoadingOutlined /> : `Configure`}</Button>
                            }
                        </Col>
                    </Row>
                </Col>

            </Row>
            <GlobalDrawer
                size="large"
                title={`${templateData?.size}-${templateData?.name}`}
                onClose={handleDrawer}
                open={drawerOpen && !_.isEmpty(templateData)}
                component={<DynamicList onClose={handleDrawer} onGenerate={handleGenerate} dynamicElements={templateData?.dynamicElements} defaultValues={templateData?.defaultDynamicFieldsValues} />}
                placement="right"
            />
        </>
    );
}
