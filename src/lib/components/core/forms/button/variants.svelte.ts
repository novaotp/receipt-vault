import { cn } from '$utils/cn';

export type ButtonVariant = 'primary' | 'destructive';

const colors: Record<ButtonVariant, string> = {
	primary: 'bg-blue-700 text-white',
	destructive: 'bg-red-500 text-white'
};

/**
 * Returns the styles of a button.
 * @param variant The variant to use. Defaults to `primary`.
 */
export function buttonVariant(variant: ButtonVariant = 'primary') {
	const defaultStyles = 'relative rounded-2xl px-6 py-[10px]';

	return cn(defaultStyles, colors[variant]);
}
