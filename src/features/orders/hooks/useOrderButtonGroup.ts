import { useEffect, useState } from 'react';

interface ButtonGroupProps {
    buttonTitle: string;
    hasButtons: boolean;
  }

export function useOrderButtonGroup(status:string): ButtonGroupProps {
  const [hasButtons, setHasButtons] = useState(false);

  const [buttonTitle, setHasButtonTitle] = useState('');

  useEffect(() => {
    if (status === 'pending') {
      setHasButtons(true);
      setHasButtonTitle('В работу');
    } else if (status === 'processing') {
      setHasButtons(true);
      setHasButtonTitle('Готово');
    } else {
      setHasButtons(false);
      setHasButtonTitle('');
    }
  }, [status]);

  return {
    hasButtons,
    buttonTitle,
  };
}
