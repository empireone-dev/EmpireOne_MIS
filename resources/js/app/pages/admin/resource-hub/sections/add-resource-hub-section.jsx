import React, { useEffect } from "react";
import { Modal, Form, Input, Select, Button } from "antd";

const { Option } = Select;

const colorOptions = [
    { label: "Blue", value: "blue" },
    { label: "Green", value: "green" },
    { label: "Purple", value: "purple" },
    { label: "Red", value: "red" },
    { label: "Orange", value: "orange" },
    { label: "Teal", value: "teal" },
];

export default function AddResourceHubSection({
    open,
    onClose,
    onAdd,
    existingCategories = [],
}) {
    const [form] = Form.useForm();
    const categoryValue = Form.useWatch("category", form);
    const isNewCategory = categoryValue === "__new__";

    useEffect(() => {
        if (!open) form.resetFields();
    }, [open]);

    const handleSubmit = (values) => {
        const category = isNewCategory
            ? values.new_category.trim()
            : values.category;
        const color = isNewCategory
            ? values.color
            : existingCategories.find((c) => c.name === category)?.color ??
              values.color;

        onAdd({
            category,
            color,
            item: {
                name: values.name.trim(),
                description: values.description?.trim() ?? "",
                url: values.url.trim(),
            },
        });

        onClose();
    };

    return (
        <Modal
            title="Add Resource"
            open={open}
            onCancel={onClose}
            footer={null}
            destroyOnClose
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                className="mt-2"
            >
                {/* Category */}
                <Form.Item
                    name="category"
                    label="Category"
                    rules={[{ required: true, message: "Select a category" }]}
                >
                    <Select placeholder="Select or create a category">
                        {existingCategories.map((cat) => (
                            <Option key={cat.name} value={cat.name}>
                                {cat.name}
                            </Option>
                        ))}
                        <Option value="__new__">+ New Category</Option>
                    </Select>
                </Form.Item>

                {isNewCategory && (
                    <>
                        <Form.Item
                            name="new_category"
                            label="New Category Name"
                            rules={[
                                {
                                    required: true,
                                    message: "Enter the category name",
                                },
                            ]}
                        >
                            <Input placeholder="e.g. Finance" />
                        </Form.Item>

                        <Form.Item
                            name="color"
                            label="Category Color"
                            rules={[
                                { required: true, message: "Pick a color" },
                            ]}
                        >
                            <Select placeholder="Pick a color">
                                {colorOptions.map((c) => (
                                    <Option key={c.value} value={c.value}>
                                        {c.label}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </>
                )}

                {/* Resource name */}
                <Form.Item
                    name="name"
                    label="Resource Name"
                    rules={[
                        {
                            required: true,
                            message: "Enter the resource name",
                        },
                    ]}
                >
                    <Input placeholder="e.g. IT Service Request" />
                </Form.Item>

                {/* URL */}
                <Form.Item
                    name="url"
                    label="URL"
                    rules={[
                        { required: true, message: "Enter the URL" },
                        { type: "url", message: "Enter a valid URL" },
                    ]}
                >
                    <Input placeholder="https://example.com" />
                </Form.Item>

                {/* Description */}
                <Form.Item name="description" label="Description">
                    <Input.TextArea
                        rows={3}
                        placeholder="Short description of this resource"
                    />
                </Form.Item>

                <div className="flex justify-end gap-2 mt-4">
                    <Button onClick={onClose}>Cancel</Button>
                    <Button type="primary" htmlType="submit">
                        Add Resource
                    </Button>
                </div>
            </Form>
        </Modal>
    );
}
