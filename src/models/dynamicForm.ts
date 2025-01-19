export class DynamicForm {
    id: string;
    title: string;
    fields: DynamicFormField[];
}

export class DynamicFormField {
    id: string;
    name: string;
    label: string;
    value: string;
    type: string;
    options: string[];
    required: boolean;
    dynamicFormId: string;
}

