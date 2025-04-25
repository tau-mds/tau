import React from "react";

const acceptsKeyboardEvents = (element: HTMLElement | null) => {
	if (!element) return false;

	const tagName = element.tagName.toLowerCase();

	if (tagName === "input" || tagName === "textarea") {
		return true;
	}

	return element.isContentEditable;
};

const specialKeys = ["Meta", "Ctrl", "Control", "Alt", "Option", "Shift"];
const nonSpecialKeys = (keys: readonly string[]) =>
	keys.filter((k) => specialKeys.findIndex((sk) => sk === k) === -1);

export function useShortcut(
	keys: readonly string[],
	callback: (evt: KeyboardEvent) => void,
	options?: { allowInEditable?: boolean },
) {
	const callbackRef = React.useRef(callback);

	React.useEffect(() => {
		callbackRef.current = callback;
	}, [callback]);

	// const handleKeyPress = React.useCallback(
	//   (event: KeyboardEvent) => {
	//     if (acceptsKeyboardEvents(document.activeElement as HTMLElement)) {
	//       return;
	//     }
	//     let cond = true;
	//     if (keys.find((x) => x === "Shift")) {
	//       // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
	//       cond = cond && event.shiftKey;
	//     }
	//     if (keys.find((x) => x === "Meta")) {
	//       cond = cond && event.metaKey;
	//     }
	//     if (keys.find((x) => x === "Ctrl" || x === "Control")) {
	//       cond = cond && event.ctrlKey;
	//     }
	//     if (keys.find((x) => x === "Alt" || x === "Option")) {
	//       cond = cond && event.altKey;
	//     }
	//     cond = cond && !!nonSpecialKeys(keys).find((k) => k === event.key);
	//     if (cond) {
	//       callbackRef.current(event);
	//     }
	//   },
	//   [keys],
	// );
	React.useEffect(() => {
		const controller = new AbortController();
		document.addEventListener(
			"keydown",
			(event) => {
				if (
					!(options?.allowInEditable ?? false) &&
					acceptsKeyboardEvents(document.activeElement as HTMLElement)
				) {
					return;
				}

				let cond = true;

				if (keys.find((x) => x === "Shift")) {
					// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
					cond = cond && event.shiftKey;
				}

				if (keys.find((x) => x === "Meta")) {
					cond = cond && event.metaKey;
				}

				if (keys.find((x) => x === "Ctrl" || x === "Control")) {
					cond = cond && event.ctrlKey;
				}

				if (keys.find((x) => x === "Alt" || x === "Option")) {
					cond = cond && event.altKey;
				}

				cond = cond && !!nonSpecialKeys(keys).find((k) => k === event.key);

				if (cond) {
					callbackRef.current(event);
				}
			},
			{ signal: controller.signal },
		);

		return () => controller.abort();
	}, [keys, options?.allowInEditable]);
}
