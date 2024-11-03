export interface SuccessModalProps {
  header: string;
  description: string;
  closeModal?: boolean;
  actionButton?: boolean;
  actionButton_href?: string;
  actionButton_name?: string;
}

export interface ActionConfirmModalProps {
  header: string;
  description: string;
  closeModal?: boolean;
  actionButtonNegative_action: () => void;
  actionButtonPositive_action?: (e: React.FormEvent) => Promise<void>;
  actionButtonPositive_name?: string;
}
