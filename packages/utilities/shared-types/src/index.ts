import { ElementNamespace, HTMLAttributes } from "vue";

// export type As<Props = any> = React.ElementType<Props>;
export type As<Props = any> = ElementNamespace;

export type PropsOf<T extends As> = HTMLAttributes & {
  as?: As;
};

export type Merge<M, N> =
  N extends Record<string, unknown> ? M : Omit<M, keyof N> & N;

export type HTMLHeroUIProps<
  T extends As = "div",
  OmitKeys extends keyof any = never,
> = Omit<
  PropsOf<T>,
  | "ref"
  | "color"
  | "slot"
  | "size"
  | "defaultChecked"
  | "defaultValue"
  | OmitKeys
> & {
  as?: As;
};
