import React, { useState } from "react";
import _ from "lodash";

// Global Component
import GlobalModal from "../GlobalModal";

import {
  Card,
  Space,
  Typography,
  Radio,
  Row,
  Col,
  Divider,
  InputNumber,
  Popover,
  Button,
} from "antd";

import {
  TranslationOutlined,
  CloseCircleOutlined,
  CoffeeOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";

const { Text, Title } = Typography;

const options = [
  { label: "Aa ", value: "sentence" },
  { label: "aa", value: "lowercase" },
  { label: "AA", value: "uppercase" },
];

export default function DynamicList({
  onClose,
  onGenerate,
  dynamicElements,
  defaultValues,
}) {
  const [openModal, setOpenModal] = useState(false);
  const [openPopover, setOpenPopover] = useState(false);

  const hide = () => {
    setOpenPopover(false);
  };

  const handleOpenChange = (newOpen) => {
    setOpenPopover(newOpen);
  };

  return (
    <>
      <>
        <div className="drawer-affix-cancel" onClick={onClose}>
          <p>
            <CloseCircleOutlined /> Cancel
          </p>
        </div>
        <Popover
          placement="leftTop"
          title={
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Language</span>
              <span>
                <Button type="link" shape="circle" size="small" onClick={() => { setOpenModal(!openModal); hide(); }}>
                  <PlusCircleOutlined />
                </Button>
              </span>
            </div>
          }
          content={"hello"}
          trigger="click"
          open={openPopover}
          onOpenChange={handleOpenChange}
        >
          <div className="drawer-affix-language">
            <p>
              <TranslationOutlined /> Language
            </p>
          </div>
        </Popover>

        <div className="drawer-affix-generate" onClick={onGenerate}>
          <p>
            <CoffeeOutlined /> Generate
          </p>
        </div>
      </>
      <Space direction="vertical" size="small" style={{ display: "flex" }}>
        {!_.isEmpty(dynamicElements) &&
          dynamicElements.map((element, index) => {
            if (
              [
                "text",
                "disclaimer",
                "legal",
                "headline",
                "price",
                "currency",
              ].some(
                (t) =>
                  element?.toLowerCase().includes(t) &&
                  !element?.toLowerCase().includes("color")
              )
            ) {
              return (
                <Card key={index} className="list-card">
                  <Text strong type="secondary" style={{ fontSize: "0.9em" }}>
                    {element}
                  </Text>
                  <Title level={4} style={{ marginTop: 0 }}>
                    {defaultValues[element]}
                  </Title>
                  <Divider orientation="left"></Divider>

                  <Row>
                    <Col span={18}>
                      <Radio.Group
                        size="large"
                        options={options}
                        optionType="button"
                      />
                    </Col>
                    <Col span={4} offset={2}>
                      <InputNumber
                        size="large"
                        defaultValue={defaultValues[element].split("").length}
                      />
                    </Col>
                  </Row>
                </Card>
              );
            } else if (
              ["color"].some((t) => element?.toLowerCase().includes(t))
            ) {
              return (
                <Card key={index} className="list-card">
                  <Text strong type="secondary" style={{ fontSize: "0.9em" }}>
                    {element}
                  </Text>
                  {CSS.supports(
                    "color",
                    defaultValues[element].split(" ").join("")
                  ) ? (
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div
                        style={{
                          backgroundColor: defaultValues[element]
                            .split(" ")
                            .join(""),
                          padding: "0.8em",
                          marginRight: "0.8em",
                          borderRadius: "0.2em",
                        }}
                      />
                      <Title level={4} style={{ margin: 0 }}>
                        {defaultValues[element]}
                      </Title>
                    </div>
                  ) : (
                    <Title level={4} style={{ marginTop: 0 }}>
                      {defaultValues[element]}
                    </Title>
                  )}
                </Card>
              );
            } else {
              return null;
            }
          })}
      </Space>
      <GlobalModal title="Add New Language" isVisible={openModal} onClose={() => setOpenModal(!openModal)} footer={false} component={"hello"} />
    </>
  );
}
