import React, { useEffect, useState } from 'react';
import { useStallionUpdate, restart } from 'react-native-stallion';
import { ConfirmationModal } from '@/components/organisms/ConfirmationModal';
import { useLocale } from '@/constants/localization';

export const StallionUpdateModal: React.FC = React.memo(() => {
  const { otaUpdate: t, common } = useLocale();
  const { isRestartRequired } = useStallionUpdate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isRestartRequired) {
      setIsVisible(true);
    }
  }, [isRestartRequired]);

  const handleRestart = () => {
    restart();
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <ConfirmationModal
      isVisible={isVisible}
      onClose={handleClose}
      onConfirm={handleRestart}
      title={t.title}
      message={t.message}
      confirmLabel={t.confirmBtn}
      cancelLabel={common.cancel}
      type="info"
      hideCancel={true}
      dismissible={false}
    />
  );
});

StallionUpdateModal.displayName = 'StallionUpdateModal';
