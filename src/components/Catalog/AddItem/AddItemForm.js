import React from 'react';
import { Modal, Form, Input } from 'antd';
const { TextArea } = Input;

export const AddItemForm = ({ visible, onCreate, onCancel, type }) => {

    const [form] = Form.useForm();

    return (
        <Modal
            visible={visible}
            title={`Создать новый элемент ${type.toUpperCase()}`}
            okText="Создать"
            cancelText="Отмена"
            onCancel={onCancel}
            onOk={() => {
                form
                    .validateFields()
                    .then(values => {
                        form.resetFields();
                        onCreate(values);
                    })
                    .catch(info => {
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
                    name="type"
                    className="collection-create-form_last-form-item"
                    label="Тип сущности"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the title of collection!',
                        },
                    ]}

                >
                    <Radio.Group>
                        <Radio value="page">Страница</Radio>
                        <Radio value="component">Компонент</Radio>
                        <Radio value="data">Данные</Radio>
                        <Radio value="element">Элемент</Radio>
                        <Radio value="datas">Массив</Radio>
                        <Radio value="function">Функция</Radio>
                        <Radio value="props">Пропсы</Radio>
                        <Radio value="condition">Условие</Radio>
                    </Radio.Group>
                </Form.Item> */}

                <Form.Item
                    name="description"
                    label="Описание"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the title of collection!',
                        },
                    ]}
                >
                    <TextArea type="textarea" rows={4} />
                </Form.Item>

                <Form.Item
                    name="title"
                    label="Название"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the title of collection!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

            </Form>
        </Modal>
    );
};