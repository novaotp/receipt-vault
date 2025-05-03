import { v4 } from 'uuid';

export type Toast = {
	id: string;
	type: 'success' | 'info' | 'error';
	message: string;
	/**
	 * @note If set to `Infinity`, it will only hide when explicitly closed.
	 * @default 5000 ms
	 */
	duration?: number;
};

/**
 * The number of milliseconds after which the toast is automatically dismissed.
 * @private **INTERNAL, ONLY EXPORTED FOR TESTING**
 */
export const _DISMISS_AFTER = 5000;

type Options = Partial<Pick<Toast, 'duration'>>;

/** An API to spawn toast notifications programmatically. */
class ToastManager {
	/** The internal list of toasts notifications in the stack. */
	private _toasts: Toast[] = $state([]);

	/** The list of toasts notifications in the stack. */
	get toasts() {
		return this._toasts;
	}

	/**
	 * Adds a new `success` toast to the top of the stack.
	 * @param message The message of the toast.
	 * @returns The ID of the newly created toast.
	 */
	success(message: string, options: Options = {}): string {
		const { duration = _DISMISS_AFTER } = options;

		return this.addToast({ type: 'success', message, duration });
	}

	/**
	 * Adds a new `info` toast to the top of the stack.
	 * @param message The message of the toast.
	 * @returns The ID of the newly created toast.
	 */
	info(message: string, options: Options = {}): string {
		const { duration = _DISMISS_AFTER } = options;

		return this.addToast({ type: 'info', message, duration });
	}

	/**
	 * Adds a new `error` toast to the top of the stack.
	 * @param message The message of the toast.
	 * @returns The ID of the newly created toast.
	 */
	error(message: string, options: Options = {}): string {
		const { duration = _DISMISS_AFTER } = options;

		return this.addToast({ type: 'error', message, duration });
	}

	/**
	 * Dismisses a toast from the stack.
	 * @param id The ID of the toast to dismiss.
	 */
	dismiss(id: string) {
		this._toasts = this._toasts.filter((toast) => toast.id !== id);
	}

	public fromResponse(data: Pick<Toast, 'type' | 'message'>) {
		this.addToast(data);
	}

	/**
	 * Adds a new toast to the top of the stack.
	 * @param data The data of the toast.
	 * @returns The ID of the newly created toast.
	 * @private
	 */
	private addToast(data: Omit<Toast, 'id'>): string {
		const id = v4();

		this._toasts.push({ id, ...data });

		setTimeout(() => {
			this.dismiss(id);
		}, data.duration ?? _DISMISS_AFTER);

		return id;
	}
}

export const toastManager = new ToastManager();
