import { Dialog as DialogPrimitive } from "radix-ui";
import type React from "react";
import Cross from "~icons/radix-icons/cross-2";

import { cx } from "@tau/utils";

export namespace Dialog {
	export type Props = React.ComponentProps<typeof DialogPrimitive.Root>;
}
export function Dialog(props: Dialog.Props) {
	return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

export namespace DialogTrigger {
	export type Props = React.ComponentProps<typeof DialogPrimitive.Trigger>;
}
export function DialogTrigger(props: DialogTrigger.Props) {
	return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

export namespace DialogPortal {
	export type Props = React.ComponentProps<typeof DialogPrimitive.Portal>;
}
export function DialogPortal(props: DialogPortal.Props) {
	return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

export namespace DialogClose {
	export type Props = React.ComponentProps<typeof DialogPrimitive.Close>;
}
export function DialogClose(props: DialogClose.Props) {
	return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

export namespace DialogOverlay {
	export type Props = React.ComponentProps<typeof DialogPrimitive.Overlay>;
}
export function DialogOverlay({ className, ...props }: DialogOverlay.Props) {
	return (
		<DialogPrimitive.Overlay
			data-slot="dialog-overlay"
			className={cx(
				"data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
				className,
			)}
			{...props}
		/>
	);
}

export namespace DialogContent {
	export type Props = React.ComponentProps<typeof DialogPrimitive.Content>;
}
export function DialogContent({ className, children, ...props }: DialogContent.Props) {
	return (
		<DialogPortal data-slot="dialog-portal">
			<DialogOverlay />
			<DialogPrimitive.Content
				data-slot="dialog-content"
				className={cx(
					"bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
					className,
				)}
				{...props}
			>
				{children}
				<DialogPrimitive.Close className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
					<Cross />
					<span className="sr-only">Close</span>
				</DialogPrimitive.Close>
			</DialogPrimitive.Content>
		</DialogPortal>
	);
}

export namespace DialogHeader {
	export type Props = React.ComponentProps<"div">;
}
export function DialogHeader({ className, ...props }: DialogHeader.Props) {
	return (
		<div
			data-slot="dialog-header"
			className={cx("flex flex-col gap-2 text-center sm:text-left", className)}
			{...props}
		/>
	);
}

export namespace DialogFooter {
	export type Props = React.ComponentProps<"div">;
}
export function DialogFooter({ className, ...props }: DialogFooter.Props) {
	return (
		<div
			data-slot="dialog-footer"
			className={cx("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className)}
			{...props}
		/>
	);
}

export namespace DialogTitle {
	export type Props = React.ComponentProps<typeof DialogPrimitive.Title>;
}
export function DialogTitle({ className, ...props }: DialogTitle.Props) {
	return (
		<DialogPrimitive.Title
			data-slot="dialog-title"
			className={cx("text-lg leading-none font-semibold", className)}
			{...props}
		/>
	);
}

export namespace DialogDescription {
	export type Props = React.ComponentProps<typeof DialogPrimitive.Description>;
}
export function DialogDescription({ className, ...props }: DialogDescription.Props) {
	return (
		<DialogPrimitive.Description
			data-slot="dialog-description"
			className={cx("text-muted-foreground text-sm", className)}
			{...props}
		/>
	);
}
