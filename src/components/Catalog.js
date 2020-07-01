import React, { useState } from 'react'
import { Button, Modal, Form, Input, Radio, Tree } from 'antd';
import { makeKeysForArray } from './../helpers/functions';

export const Catalog = ({catalog}) => {
    console.log('cataloggg', catalog)
    const [modal, setModal] = useState(false)
    const treeData = makeKeysForArray(catalog)

    console.log('treeeee', treeData)

    return (
        <div>
            <Tree
                treeData={treeData}
                showLine
                draggable
            />
            <button onClick={() => setModal(true)}>Add</button>

            <Modal
                visible={modal}
                title="Create a new collection"
                okText="Create"
                cancelText="Cancel"
            // onCancel={onCancel}
            // onOk={() => {
            //     form
            //         .validateFields()
            //         .then(values => {
            //             form.resetFields();
            //             onCreate(values);
            //         })
            //         .catch(info => {
            //             console.log('Validate Failed:', info);
            //         });
            // }}
            >
                <Form
                    // form={form}
                    layout="vertical"
                    name="form_in_modal"
                    initialValues={{ modifier: 'public' }}
                >
                    <Form.Item
                        name="title"
                        label="Title"
                        rules={[{ required: true, message: 'Please input the title of collection!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item name="description" label="Description">
                        <Input type="textarea" />
                    </Form.Item>
                    <Form.Item name="modifier" className="collection-create-form_last-form-item">
                        <Radio.Group>
                            <Radio value="public">Public</Radio>
                            <Radio value="private">Private</Radio>
                        </Radio.Group>
                    </Form.Item>
                </Form>

            </Modal>
        </div>
    )
}