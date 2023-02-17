interface ButtonGroupProps {
    buttonTitle: string;
    hasButtons: boolean;
  }
export function useOrderButtonGroup(status:string): ButtonGroupProps {
  const hasButtons = status === 'processing' || status === 'pending';

  const BUTTON_TITLE = {
    pending: 'В работу',
    processing: 'Готово',
  };

  const buttonTitle = (BUTTON_TITLE)[status as keyof typeof BUTTON_TITLE];

  return {
    hasButtons,
    buttonTitle,
  };
}
