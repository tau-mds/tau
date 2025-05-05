import { Menubar as MenubarPrimitive } from "radix-ui";
import type React from "react";

import Check from "~icons/radix-icons/check";
import ChevronRight from "~icons/radix-icons/chevron-right";
import Circle from "~icons/radix-icons/circle";

import { cx } from "@tau/utils";

export namespace Menubar {
	export type Props = React.ComponentProps<typeof MenubarPrimitive.Root>;
}
export function Menubar({ className, ...props }: Menubar.Props) {
	return (
		<MenubarPrimitive.Root
			data-slot="menubar"
			className={cx(
				"bg-card flex h-9 items-center gap-1 rounded-md border p-1 shadow-xs",
				className,
			)}
			{...props}
		/>
	);
}

export namespace MenubarMenu {
	export type Props = React.ComponentProps<typeof MenubarPrimitive.Menu>;
}
export function MenubarMenu(props: MenubarMenu.Props) {
	return <MenubarPrimitive.Menu data-slot="menubar-menu" {...props} />;
}

export namespace MenubarGroup {
	export type Props = React.ComponentProps<typeof MenubarPrimitive.Group>;
}
export function MenubarGroup(props: MenubarGroup.Props) {
	return <MenubarPrimitive.Group data-slot="menubar-group" {...props} />;
}

export namespace MenubarPortal {
	export type Props = React.ComponentProps<typeof MenubarPrimitive.Portal>;
}
export function MenubarPortal(props: MenubarPortal.Props) {
	return <MenubarPrimitive.Portal data-slot="menubar-portal" {...props} />;
}

export namespace MenubarRadioGroup {
	export type Props = React.ComponentProps<typeof MenubarPrimitive.RadioGroup>;
}
export function MenubarRadioGroup(props: MenubarRadioGroup.Props) {
	return <MenubarPrimitive.RadioGroup data-slot="menubar-radio-group" {...props} />;
}

export namespace MenubarTrigger {
	export type Props = React.ComponentProps<typeof MenubarPrimitive.Trigger>;
}
export function MenubarTrigger({ className, ...props }: MenubarTrigger.Props) {
	return (
		<MenubarPrimitive.Trigger
			data-slot="menubar-trigger"
			className={cx(
				"focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex items-center rounded-sm px-2 py-1 text-sm font-medium outline-hidden select-none",
				className,
			)}
			{...props}
		/>
	);
}

export namespace MenubarContent {
	export type Props = React.ComponentProps<typeof MenubarPrimitive.Content>;
}
export function MenubarContent({
	className,
	align = "start",
	alignOffset = -4,
	sideOffset = 8,
	...props
}: MenubarContent.Props) {
	return (
		<MenubarPortal>
			<MenubarPrimitive.Content
				data-slot="menubar-content"
				align={align}
				alignOffset={alignOffset}
				sideOffset={sideOffset}
				className={cx(
					"bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[12rem] origin-(--radix-menubar-content-transform-origin) overflow-hidden rounded-md border p-1 shadow-md",
					className,
				)}
				{...props}
			/>
		</MenubarPortal>
	);
}

export namespace MenubarItem {
	export type Variant = {
		inset: boolean;
		variant: "default" | "destructive";
	};
	export type Props = React.ComponentProps<typeof MenubarPrimitive.Item> &
		Partial<Variant>;
}
export function MenubarItem({
	className,
	inset,
	variant = "default",
	...props
}: MenubarItem.Props) {
	return (
		<MenubarPrimitive.Item
			data-slot="menubar-item"
			data-inset={inset}
			data-variant={variant}
			className={cx(
				"focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
				className,
			)}
			{...props}
		/>
	);
}

export namespace MenubarCheckboxItem {
	export type Props = React.ComponentProps<typeof MenubarPrimitive.CheckboxItem>;
}
export function MenubarCheckboxItem({
	className,
	children,
	...props
}: MenubarCheckboxItem.Props) {
	return (
		<MenubarPrimitive.CheckboxItem
			data-slot="menubar-checkbox-item"
			className={cx(
				"focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-xs py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
				className,
			)}
			{...props}
		>
			<span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
				<MenubarPrimitive.ItemIndicator>
					<Check className="size-4" />
				</MenubarPrimitive.ItemIndicator>
			</span>
			{children}
		</MenubarPrimitive.CheckboxItem>
	);
}

export namespace MenubarRadioItem {
	export type Props = React.ComponentProps<typeof MenubarPrimitive.RadioItem>;
}
export function MenubarRadioItem({
	className,
	children,
	...props
}: MenubarRadioItem.Props) {
	return (
		<MenubarPrimitive.RadioItem
			data-slot="menubar-radio-item"
			className={cx(
				"focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-xs py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
				className,
			)}
			{...props}
		>
			<span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
				<MenubarPrimitive.ItemIndicator>
					<Circle className="size-2 fill-current" />
				</MenubarPrimitive.ItemIndicator>
			</span>
			{children}
		</MenubarPrimitive.RadioItem>
	);
}

export namespace MenubarLabel {
	export type Props = React.ComponentProps<typeof MenubarPrimitive.Label> & {
		inset?: boolean;
	};
}
export function MenubarLabel({ className, inset, ...props }: MenubarLabel.Props) {
	return (
		<MenubarPrimitive.Label
			data-slot="menubar-label"
			data-inset={inset}
			className={cx("px-2 py-1.5 text-sm font-medium data-[inset]:pl-8", className)}
			{...props}
		/>
	);
}

export namespace MenubarSeparator {
	export type Props = React.ComponentProps<typeof MenubarPrimitive.Separator>;
}
export function MenubarSeparator({ className, ...props }: MenubarSeparator.Props) {
	return (
		<MenubarPrimitive.Separator
			data-slot="menubar-separator"
			className={cx("bg-border -mx-1 my-1 h-px", className)}
			{...props}
		/>
	);
}

export namespace MenubarShortcut {
	export type Props = React.ComponentProps<"span">;
}
export function MenubarShortcut({ className, ...props }: MenubarShortcut.Props) {
	return (
		<span
			data-slot="menubar-shortcut"
			className={cx("text-muted-foreground ml-auto text-xs tracking-widest", className)}
			{...props}
		/>
	);
}

export namespace MenubarSub {
	export type Props = React.ComponentProps<typeof MenubarPrimitive.Sub>;
}
export function MenubarSub(props: MenubarSub.Props) {
	return <MenubarPrimitive.Sub data-slot="menubar-sub" {...props} />;
}

export namespace MenubarSubTrigger {
	export type Props = React.ComponentProps<typeof MenubarPrimitive.SubTrigger> & {
		inset?: boolean;
	};
}
export function MenubarSubTrigger({
	className,
	inset,
	children,
	...props
}: MenubarSubTrigger.Props) {
	return (
		<MenubarPrimitive.SubTrigger
			data-slot="menubar-sub-trigger"
			data-inset={inset}
			className={cx(
				"focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-none select-none data-[inset]:pl-8",
				className,
			)}
			{...props}
		>
			{children}
			<ChevronRight className="ml-auto h-4 w-4" />
		</MenubarPrimitive.SubTrigger>
	);
}

export namespace MenubarSubContent {
	export type Props = React.ComponentProps<typeof MenubarPrimitive.SubContent>;
}
export function MenubarSubContent({ className, ...props }: MenubarSubContent.Props) {
	return (
		<MenubarPrimitive.SubContent
			data-slot="menubar-sub-content"
			className={cx(
				"bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] origin-(--radix-menubar-content-transform-origin) overflow-hidden rounded-md border p-1 shadow-lg",
				className,
			)}
			{...props}
		/>
	);
}
