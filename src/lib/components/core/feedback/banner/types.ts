const bannerTypes = ['success', 'warning', 'info', 'error'] as const;
export type BannerType = (typeof bannerTypes)[number];

/**
 * Checks whether `str` is valid or not, and returns the appropriate banner type.
 * @param str The string to test.
 * @param defaultValue A default value in case `str` is not valid. Defaults to `"info"`.
 * @returns A valid banner type.
 */
export function toBannerType(
	str: string | null | undefined,
	defaultValue: BannerType = 'info'
): BannerType {
	return str && bannerTypes.includes(str as BannerType) ? (str as BannerType) : defaultValue;
}
