import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";
import clsx from "clsx";
import { Fragment } from "react";

import { tokens } from "~/styles/tokens";

import { Button } from "../button";
import { Icon } from "../icon";
import { Separator } from "../separator";
import { View } from "../view";

import styles from "./tabs.module.css";

// TODO separate tabs variants because honestly this doesn't make that much sense

type TabsVariant = "default" | "progress" | "button-group";

interface TabsTriggerProps extends Button.Props {
  value: TabsPrimitive.Tab.Props["value"];
  /** Show indicator that tab is complete.  */
  complete?: boolean;
}

interface TabsRootProps extends TabsPrimitive.Root.Props {
  /** Tabs styling that we should use. Defaults to "default". */
  variant?: TabsVariant;

  /** Disable all triggers */
  disabled?: boolean;

  tabs: Array<TabsTriggerProps>;
}

const VARIANT_SEPARATOR: Set<TabsVariant> = new Set(["default", "progress"]);

function TabsRoot({
  variant = "default",
  disabled = false,
  tabs,
  className,
  children,
  ...props
}: TabsRootProps) {
  return (
    <View
      render={
        <TabsPrimitive.Root
          className={clsx(
            styles["tabs"],
            styles[`tabs_variant_${variant}`],
            className,
          )}
          {...props}
        />
      }
    >
      <TabsList>
        {tabs.map((tabProps, i) => (
          <Fragment key={tabProps.value}>
            <TabsTrigger disabled={disabled} {...tabProps} />
            {i + 1 < tabs.length && VARIANT_SEPARATOR.has(variant) ? (
              <TabsSeparator
                orientation={variant === "progress" ? "horizontal" : "vertical"}
              />
            ) : null}
          </Fragment>
        ))}
      </TabsList>
      {children}
    </View>
  );
}

function TabsTrigger({
  value,
  className,
  complete,
  children,
  ...props
}: TabsTriggerProps) {
  return (
    <Button
      interactive="list-item"
      className={clsx(styles["tabs__trigger"], className)}
      render={<TabsPrimitive.Tab value={value} />}
      {...props}
    >
      {complete ? (
        <Icon
          color={tokens.positiveDefault}
          name="check-line"
          className={styles["tabs__trigger-complete"]}
        />
      ) : null}
      {children}
    </Button>
  );
}

function TabsList({ className, ...props }: TabsPrimitive.List.Props) {
  return (
    <View
      render={
        <TabsPrimitive.List
          className={clsx(styles["tabs__list"], className)}
          {...props}
        />
      }
    />
  );
}

function TabsSeparator({ className, ...props }: Separator.Props) {
  return (
    <Separator
      className={clsx(styles["tabs__separator"], className)}
      {...props}
    />
  );
}

type TabsPanelProps = TabsPrimitive.Panel.Props;

function TabsPanel({ children, ...props }: TabsPanelProps) {
  return (
    <TabsPrimitive.Panel {...props}>
      <View>{children}</View>
    </TabsPrimitive.Panel>
  );
}

export const Tabs = Object.assign(TabsRoot, {
  Panel: TabsPanel,
});

export declare namespace Tabs {
  export type Props = TabsRootProps;

  export namespace Panel {
    export type Props = TabsPanelProps;
  }
}
