import type { As, HTMLVeroUIProps } from "@veroui/shared-types";
import { Component } from "vue";
import { BaseItemProps as ItemProps } from "./types";
// -------------------------------------------------------------
/*
 * Credit to @react-types npm package
 */

export type ItemElement<T> = Component<ItemProps<T>> | null;
type ItemRenderer<T> = (item: T) => ItemElement<T>;

interface BaseSectionProps<T> {
    /** Rendered contents of the section, e.g. a header. */
    title?: string | Component;
    /** An accessibility label for the section. */
    "aria-label"?: string;
    /** Static child items or a function to render children. */
    children: ItemElement<T> | ItemElement<T>[] | ItemRenderer<T>;
    /** Item objects in the section. */
    items?: Iterable<T>;
}

// -----------------------------------------------------------------------------

/**
 * A modified version of the SectionProps from @react-types/shared, with the addition of the HeroUI props.
 *
 */
export type SectionProps<Type extends As = "div", T extends object = {}> = BaseSectionProps<T> &
    Omit<HTMLVeroUIProps<Type>, "children">;
