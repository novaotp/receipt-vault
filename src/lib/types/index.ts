export type FormSubmitEvent = SubmitEvent & {
	currentTarget: EventTarget & HTMLFormElement;
};
