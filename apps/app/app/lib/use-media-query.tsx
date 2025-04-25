import React from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
	const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined);

	React.useEffect(() => {
		const controller = new AbortController();

		window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`).addEventListener(
			"change",
			() => {
				setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
			},
			{ signal: controller.signal },
		);
		setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);

		return () => controller.abort();
	}, []);

	return !!isMobile;
}

export function useMediaQuery(breakpoint: number) {
	const [matches, setMatches] = React.useState<boolean | undefined>(undefined);
	React.useEffect(() => {
		const controller = new AbortController();

		window.matchMedia(`(max-width: ${breakpoint - 1}px)`).addEventListener(
			"change",
			() => {
				setMatches(window.innerWidth < breakpoint);
			},
			{ signal: controller.signal },
		);
		setMatches(window.innerWidth < breakpoint);

		return () => controller.abort();
	}, [breakpoint]);

	return !!matches;
}
