import { Form, Modal } from '@/components';
import { UserSelect } from '@/features/setting';
import {
  useUpdateWatermarkAllowList,
  useWatermarkAllowList,
} from '@/features/workspace';
import { useOverlayRef } from '@erp/overlay-hook';
import { yupResolver } from '@hookform/resolvers/yup';
import { Spin } from 'antd';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { array, number, object } from 'yup';

export const UpdateWatermarkSettingsModal = () => {
  const overlayRef = useOverlayRef();

  const { control, reset, handleSubmit } = useForm({
    resolver: yupResolver(
      object({
        userIds: array().of(number().required()).nullable(),
      }),
    ),
  });

  const { isLoading, data } = useWatermarkAllowList();
  const {
    isLoading: isSubmitting,
    isSuccess,
    mutateAsync,
  } = useUpdateWatermarkAllowList();

  useEffect(() => {
    reset({
      userIds: data?.map((item) => item.id) ?? [],
    });
  }, [data, reset]);

  const onSubmit = handleSubmit(async (values) => {
    if (isLoading || isSubmitting || isSuccess) {
      return;
    }

    await mutateAsync(values.userIds ?? []);

    overlayRef.close();
  });

  return (
    <Modal
      title="水印管理"
      onCancel={() => overlayRef.close()}
      confirmLoading={isSubmitting}
      onOk={onSubmit}
    >
      <Spin spinning={isLoading}>
        <Form>
          <Form.Control
            control={control}
            name="userIds"
            label="指定账号关闭水印效果"
          >
            <UserSelect mode="multiple"></UserSelect>
          </Form.Control>
        </Form>
      </Spin>
    </Modal>
  );
};
