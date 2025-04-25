import { queryOptions, useQueryClient } from "@tanstack/react-query";
import { ClientOnly } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import React from "react";
import { getWebRequest } from "vinxi/http";

import { getHintUtils } from "@epic-web/client-hints";
import {
	clientHint as colorSchemeHint,
	subscribeToSchemeChange,
} from "@epic-web/client-hints/color-scheme";
import { clientHint as timeZoneHint } from "@epic-web/client-hints/time-zone";

const clientHints = getHintUtils({
	theme: { ...colorSchemeHint, fallback: null },
	timeZone: timeZoneHint,
});

const getHints = createServerFn().handler(() => clientHints.getHints(getWebRequest()));

export const clientHintsQueries = {
	get: () => queryOptions({ queryKey: ["client-hints"], queryFn: getHints }),
};

export function ClientHint() {
	const queryClient = useQueryClient();
	React.useEffect(() => {
		subscribeToSchemeChange(() => {
			queryClient.invalidateQueries(clientHintsQueries.get());
		});
	}, [queryClient.invalidateQueries]);

	return (
		<ClientOnly>
			<script
				// biome-ignore lint/security/noDangerouslySetInnerHtml:
				dangerouslySetInnerHTML={{
					__html: clientHints.getClientHintCheckScript(),
				}}
			/>
		</ClientOnly>
	);
}
