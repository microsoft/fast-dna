import FormItemCommon from "./form-item.props";

/**
 * Select class name contract
 */
export interface FormItemSelectClassNameContract {
    formItemSelect: string;
    formItemSelect__disabled: string;
    formItemSelect_control: string;
    formItemSelect_controlLabel: string;
    formItemSelect_controlSpan: string;
    formItemSelect_controlInput: string;
    formItemSelect_softRemove: string;
    formItemSelect_softRemoveInput: string;
}

/**
 * Select state interface
 */
export interface FormItemSelectProps extends FormItemCommon {
    /**
     * The select options
     */
    options: any[];
}
