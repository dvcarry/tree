import React from 'react';
import { Modal, Form, Input } from 'antd';
const { TextArea } = Input;

export const AddProject = ({ visible, onCreate, onCancel }) => {
    const [form] = Form.useForm();
    return (
        <Modal
            visible={visible}
            title="Создать новый проект"
            okText="Создать"
            cancelText="Отмена"
            onCancel={onCancel}
            onOk={() => {
                form
                    .validateFields()
                    .then((values) => {
                        form.resetFields();
                        onCreate(values);
                    })
                    .catch((info) => {
                        console.log('Validate Failed:', info);
                    });
            }}
        >
            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
                initialValues={{
                    modifier: 'public',
                }}
            >
                {/* <Form.Item
                    name="title"
                    label="Title"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the title of collection!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item> */}
                <Form.Item
                    name="name"
                    label="Название проекта"
                    rules={[
                        {
                            required: true,
                            message: 'Введите название проекта',
                        },
                    ]}

                >
                    <Input type="textarea" />
                </Form.Item>
                <Form.Item name="description" label="Описание">
                    <TextArea rows={4} type="textarea" />
                </Form.Item>
                {/* <Form.Item name="modifier" className="collection-create-form_last-form-item">
                    <Radio.Group>
                        <Radio value="public">Public</Radio>
                        <Radio value="private">Private</Radio>
                    </Radio.Group>
                </Form.Item> */}
            </Form>
        </Modal>
    );
};