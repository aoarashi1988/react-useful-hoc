import { cloneElement, MouseEventHandler, ReactElement, useState } from 'react';
import { Button } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import Modal, { ModalProps } from 'antd/lib/modal/Modal';

interface WithFormModalOptions {
  renderTrigger?(): ReactElement;
  title?: string;
  text?: string;
}

const withFormModal =
  (options: WithFormModalOptions) =>
  (FunctionForm: any) =>
  (props: unknown) => {
    const { renderTrigger, text = '请选择', title = '请填写' } = options;
    const [visible, setVisible] = useState(false);
    const formElement = FunctionForm(props);
    const [form] = useForm(formElement.props.form);
    const onFinish = (...args: any[]) => {
      formElement.props.onFinish?.(...args);
      setVisible(false);
    };
    const modalProps: ModalProps = {
      async onOk() {
        try {
          await form.validateFields();
          form.submit();
          setVisible(false);
        } catch (error) {
          console.log(error);
        }
      },
      onCancel() {
        setVisible(false);
      },
      visible,
      title
    };

    const onClick: MouseEventHandler<HTMLElement> = () => {
      setVisible(true);
    };

    const renderModalTrigger = () => {
      if (renderTrigger) {
        const trigger = renderTrigger();
        return cloneElement(trigger, { ...trigger.props, onClick });
      }
      return (
        <Button onClick={onClick} type="primary">
          {text}
        </Button>
      );
    };

    return (
      <>
        {renderModalTrigger()}
        <Modal {...modalProps}>
          {cloneElement(
            formElement,
            {
              onFinish,
              form
            },
            formElement.props.children,
            <Button htmlType="submit" hidden />
          )}
        </Modal>
      </>
    );
  };

export default withFormModal;
