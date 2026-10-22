export interface IPopoverTriggerProps {
    id: string;
    "aria-haspopup": "dialog";
    "aria-expanded": boolean;
    "aria-controls": string | undefined;
    onClick: (event: MouseEvent) => void;
}
