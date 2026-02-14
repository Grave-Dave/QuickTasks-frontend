interface IFieldInfo {
  invalid_value: string;
  message: string;
  message_style: string;
  property_path: string;
  property_name: string;
}

export interface ICommandResponseError {
  fields_info: IFieldInfo[];
  message: string;
  show_message: boolean;
  show_modal: boolean;
  status: 0;
  message_style?: 'success' | 'error' | 'warning';
}