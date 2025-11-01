import type { As, HTMLVeroUIProps } from "@veroui/shared-types";
import { BaseItemProps } from "./types";

/**
 * A modified version of the ItemProps from @react-types/shared, with the addition of the HeroUI props.
 *
 */
export type ItemProps<Type extends As = "div", T extends object = {}> = BaseItemProps<T> & HTMLVeroUIProps<Type>;
