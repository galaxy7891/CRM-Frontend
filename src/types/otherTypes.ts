import { Dispatch, SetStateAction } from 'react';

export interface SuccessModalProps {
  header: string;
  description: string;
  closeModal?: boolean;
  actionButton?: boolean;
  actionButton_href?: string;
  actionButton_action?: () => void;
  actionButton_name?: string;
}

export interface ActionConfirmModalProps {
  header: string;
  description: string;
  closeModal?: boolean;
  actionButtonNegative_action: () => void;
  actionButtonPositive_action?: () => void;
  actionButtonPositive_name?: string;
}

export interface paginationTypes {
  current_page: number;
  last_page: number;
  total: number;
  per_page: number;
  next_page_url: string | null;
  prev_page_url: string | null;
}

export type selectedIds = {
  provinceId: string;
  cityId: string;
  subdistrictId: string;
  villageId: string;
  zipCodeId: string;
};

export type RowData = {
  row: string;
  data: {
    property: string;
    fail: string;
  };
};

interface dataFailedTypes {
  property: string;
  fail: string;
}

interface ImportFailedDetailDataTypes {
  row: number;
  dataFailed: dataFailedTypes;
}

interface ImportFailedDataTypes {
  currentPage: number;
  data: ImportFailedDetailDataTypes;
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: string;
}

interface ImportSummaryDataTypes {
  total_data: number;
  valid_data: number;
  invalid_data: number;
}
export interface ImportErrorMessageDetailTypes {
  file: string;
  data_type: string;
  date: string;
  summaryData: ImportSummaryDataTypes;
  failedData: ImportFailedDataTypes;
}

export interface AuthLeftSectionProps {
  imageSrc: string;
  title: string;
}

export interface FilterTableButtonProps {
  setSortBy: Dispatch<SetStateAction<string>>;
  setBuyerTypeBy?: Dispatch<SetStateAction<string>>;
  setTypeBy?: Dispatch<SetStateAction<string>>;
  setStatusBy?: Dispatch<SetStateAction<string>>;
  setArticleStatusBy?: Dispatch<SetStateAction<string>>;
  setPerPage: Dispatch<SetStateAction<string>>;
}

export interface TempFilter {
  sortBy: string;
  setBuyerTypeBy?: string;
  setTypeBy?: string;
  statusBy?: string;
  articleStatusBy?: string;
  perPage: string;
}
