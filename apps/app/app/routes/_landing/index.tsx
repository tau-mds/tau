import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, createFileRoute } from "@tanstack/react-router";
import { authClient } from "@tau/auth-client";
import { Button, Dialog, toast } from "@tau/ui";
import React, { useEffect } from "react";
import { mutations, queries } from "~/lib/api/organizer";

export const Route = createFileRoute("/_landing/")({
	component: Component,
});

interface InterviewRoundDTO {
	roundId: string;
	interview_round: {
		title: string;
		description: string | null;
		interview_duration: number | null;
		start_date: string;
		end_date: string;
	};
}

interface UpdateInterviewRoundDTO {
	roundId: string;
	interview_round: {
		title: string | null;
		description: string | null;
		interview_duration: number | null;
		start_date: string | null;
		end_date: string | null;
	};
}
interface EmailListData {
	roundId: string;
	emails: string[];
}

function Component() {
	const [count, setCount] = React.useState(0);

	const queryClient = useQueryClient();

	const { data: sessionData } = authClient.useSession();

	useEffect(() => {
		console.log("Session Data:", sessionData);
		if (!sessionData?.user) {
			console.warn("User session not found.");
		} else {
			console.log("User ID:", sessionData.user.id);
		}
	}, [sessionData]);

	// --- Mutations with proper typing ---

	const createRoundMutation = useMutation({
		mutationFn: (roundData) => mutations.createInterviewRound({ data: roundData }),
		onSuccess: () => {
			toast.success("Interview Round created successfully!");
			queryClient.invalidateQueries({
				queryKey: queries.userInterviewRounds().queryKey,
			});
		},
		onError: (error) => {
			toast.error(
				`Failed to create interview round: ${error.message || "Unknown error"}`,
			);
			console.error("Create Round Error:", error);
		},
	});

	const updateRoundMutation = useMutation<
		{ success: boolean; affectedRows: number },
		any,
		UpdateInterviewRoundDTO
	>({
		mutationFn: (updateData) => mutations.updateInterviewRound({ data: updateData }),
		onSuccess: () => toast.success("Interview Round updated successfully!"),
		onError: (error: any) =>
			toast.error(`Update Round failed: ${error.message || "Unknown error"}`),
	});

	const setIntervieweeListMutation = useMutation<unknown, any, EmailListData>({
		mutationFn: (data) => mutations.setIntervieweeList({ data }),
		onSuccess: () => toast.success("Interviewee list updated!"),
		onError: (error: any) =>
			toast.error(`Set Interviewee List failed: ${error.message || "Unknown error"}`),
	});

	const setInterviewerListMutation = useMutation<unknown, any, EmailListData>({
		mutationFn: (data) => mutations.setInterviewerList({ data }),
		onSuccess: () => toast.success("Interviewer list updated!"),
		onError: (error: any) =>
			toast.error(`Set Interviewer List failed: ${error.message || "Unknown error"}`),
	});

	const scheduleRoundMutation = useMutation<unknown, any, { roundId: string }>({
		mutationFn: (data) => mutations.scheduleInterviewRound({ data }),
		onSuccess: () => toast.success("Interview Round scheduled!"),
		onError: (error: any) =>
			toast.error(`Schedule Round failed: ${error.message || "Unknown error"}`),
	});

	const openRoundMutation = useMutation<unknown, any, { roundId: string }>({
		mutationFn: (data) => mutations.openInterviewRound({ data }),
		onSuccess: () => toast.success("Interview Round opened!"),
		onError: (error: any) =>
			toast.error(`Open Round failed: ${error.message || "Unknown error"}`),
	});

	const endRoundMutation = useMutation<unknown, any, { roundId: string }>({
		mutationFn: (data) => mutations.endInterviewRound({ data }),
		onSuccess: () => toast.success("Interview Round ended!"),
		onError: (error: any) =>
			toast.error(`End Round failed: ${error.message || "Unknown error"}`),
	});

	// --- Query handlers ---

	const handleFetchUserRounds = async () => {
		try {
			toast.info("Fetching user interview rounds...");
			const rounds = await queryClient.fetchQuery(queries.userInterviewRounds());
			toast.success(`Fetched ${rounds.length} interview rounds.`);
			console.log("User Interview Rounds:", rounds);
		} catch (error: any) {
			toast.error(`Fetch User Rounds failed: ${error.message || "Unknown error"}`);
			console.error("Fetch User Rounds Error:", error);
		}
	};

	const handleFetchRoundPreview = async () => {
		const testRoundId = "ivro_01JT9632V1YKZXE3YFPG0QCV8P"; // Replace with valid ID
		try {
			toast.info(`Fetching preview for round ID: ${testRoundId}...`);
			const preview = await queryClient.fetchQuery(
				queries.interviewRoundView(testRoundId),
			);
			toast.success("Fetched round preview.");
			console.log("Round Preview:", preview);
		} catch (error: any) {
			toast.error(`Fetch Round Preview failed: ${error.message || "Unknown error"}`);
			console.error("Fetch Round Preview Error:", error);
		}
	};

	// --- Hardcoded test data ---

	const createRoundData: InterviewRoundDTO = {
		roundId: "ivro_01JT9632V1YKZXE3YFPG0QCV8P",
		interview_round: {
			title: `Test Round ${new Date().toISOString()}`,
			description: "Created from test button",
			interview_duration: 30,
			start_date: new Date().toISOString(),
			end_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
		},
	};

	const updateRoundData: UpdateInterviewRoundDTO = {
		roundId: "ivro_01JT9632V1YKZXE3YFPG0QCV8P",
		interview_round: {
			title: "Updated Title from Test",
		},
	};

	const emailListData: EmailListData = {
		roundId: "ivro_01JT9632V1YKZXE3YFPG0QCV8P", // Replace with valid ID
		emails: ["test1@example.com", "test2@example.com"],
	};

	return (
		<main className="container mx-auto p-4 space-y-4">
			<h1>Proj. Tau - Backend API Tests</h1>

			<div className="flex gap-3 flex-wrap">
				<Button
					onClick={() => createRoundMutation.mutate(createRoundData)}
					disabled={createRoundMutation.isLoading}
				>
					{createRoundMutation.isLoading ? "Creating..." : "Create Interview Round"}
				</Button>

				<Button
					onClick={() => updateRoundMutation.mutate(updateRoundData)}
					disabled={updateRoundMutation.isLoading}
				>
					{updateRoundMutation.isLoading ? "Updating..." : "Update Interview Round"}
				</Button>

				<Button
					onClick={() => setIntervieweeListMutation.mutate(emailListData)}
					disabled={setIntervieweeListMutation.isLoading}
				>
					{setIntervieweeListMutation.isLoading ? "Updating..." : "Set Interviewee List"}
				</Button>

				<Button
					onClick={() => setInterviewerListMutation.mutate(emailListData)}
					disabled={setInterviewerListMutation.isLoading}
				>
					{setInterviewerListMutation.isLoading ? "Updating..." : "Set Interviewer List"}
				</Button>

				<Button
					onClick={() => scheduleRoundMutation.mutate({ roundId: updateRoundData.id })}
					disabled={scheduleRoundMutation.isLoading}
				>
					{scheduleRoundMutation.isLoading ? "Scheduling..." : "Schedule Interview Round"}
				</Button>

				<Button
					onClick={() => openRoundMutation.mutate({ roundId: updateRoundData.id })}
					disabled={openRoundMutation.isLoading}
				>
					{openRoundMutation.isLoading ? "Opening..." : "Open Interview Round"}
				</Button>

				<Button
					onClick={() => endRoundMutation.mutate({ roundId: updateRoundData.id })}
					disabled={endRoundMutation.isLoading}
				>
					{endRoundMutation.isLoading ? "Ending..." : "End Interview Round"}
				</Button>

				<Button onClick={handleFetchUserRounds}>Fetch My Interview Rounds</Button>

				<Button onClick={handleFetchRoundPreview}>Fetch Interview Round Preview</Button>
			</div>

			{/* Mutation error messages */}
			{createRoundMutation.isError && (
				<p className="text-red-500">Create Error: {createRoundMutation.error?.message}</p>
			)}
			{updateRoundMutation.isError && (
				<p className="text-red-500">Update Error: {updateRoundMutation.error?.message}</p>
			)}
			{setIntervieweeListMutation.isError && (
				<p className="text-red-500">
					Interviewee List Error: {setIntervieweeListMutation.error?.message}
				</p>
			)}
			{setInterviewerListMutation.isError && (
				<p className="text-red-500">
					Interviewer List Error: {setInterviewerListMutation.error?.message}
				</p>
			)}
			{scheduleRoundMutation.isError && (
				<p className="text-red-500">
					Schedule Error: {scheduleRoundMutation.error?.message}
				</p>
			)}
			{openRoundMutation.isError && (
				<p className="text-red-500">Open Error: {openRoundMutation.error?.message}</p>
			)}
			{endRoundMutation.isError && (
				<p className="text-red-500">End Error: {endRoundMutation.error?.message}</p>
			)}

			{!sessionData?.user && (
				<p className="text-yellow-600">
					Sign in to enable authenticated backend test buttons.
				</p>
			)}

			{/* Existing UI below */}

			<div className="inline-flex items-center justify-between gap-3 mt-8">
				<Button size="icon" onClick={() => setCount((prev) => prev - 1)}>
					<span className="size-5 grid place-content-center">-</span>
				</Button>
				<p>{count}</p>
				<Button size="icon" onClick={() => setCount((prev) => prev + 1)}>
					<span className="size-5 grid place-content-center">+</span>
				</Button>
			</div>

			<div className="flex gap-3">
				<Button onClick={() => toast.error("This is an error toast")}>
					<span>Show Error Toast</span>
				</Button>
				<Button onClick={() => toast.info("This is an info toast")}>
					<span>Show Info Toast</span>
				</Button>
				<Button onClick={() => toast.success("This is a success toast")}>
					<span>Show Success Toast</span>
				</Button>
				<Button onClick={() => toast.warning("This is a warning toast")}>
					<span>Show Warning Toast</span>
				</Button>
			</div>

			<Dialog.Root>
				<Dialog.Trigger asChild>
					<Button>Open Dialog</Button>
				</Dialog.Trigger>
				<Dialog.Content>
					<Dialog.Title>Dialog Title</Dialog.Title>
					<Dialog.Description>Dialog Description</Dialog.Description>
					<Dialog.Close>Close</Dialog.Close>
				</Dialog.Content>
			</Dialog.Root>

			<div className="flex gap-3 mt-4">
				<Button>
					<Link to="/auth/signin">Sign In</Link>
				</Button>
				<Button>
					<Link to="/app">App</Link>
				</Button>
			</div>
		</main>
	);
}

export default Component;
