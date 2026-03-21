export type Locale = "zh" | "en";

export const defaultLocale: Locale = "zh";

export function getLocaleFromPath(pathname: string): Locale {
	return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "zh";
}

export function stripLocalePrefix(pathname: string): string {
	if (pathname === "/en") return "/";
	if (pathname.startsWith("/en/")) {
		const stripped = pathname.slice(3);
		return stripped.startsWith("/") ? stripped : `/${stripped}`;
	}
	return pathname;
}

export function localizePath(pathname: string, locale: Locale): string {
	const normalized = stripLocalePrefix(pathname);
	if (locale === "en") {
		return normalized === "/" ? "/en/" : `/en${normalized}`;
	}
	return normalized;
}

export function getAlternateLocale(locale: Locale): Locale {
	return locale === "zh" ? "en" : "zh";
}
