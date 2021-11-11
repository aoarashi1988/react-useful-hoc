import { Form, Input } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import withModalForm from '../../hocs/form-modal';

export function UserForm() {
  const [form] = useForm();
  return (
    <Form form={form}>
      <Form.Item label="姓名" name="name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="年龄" name="age" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
    </Form>
  );
}

export default withModalForm({
  title: '新建用户',
  text: '点击新建用户'
})(UserForm);
