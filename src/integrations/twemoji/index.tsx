import styles from "./twemoji.module.css";

export function Twemoji(props: { value: string }) {
  const img = props.value.codePointAt(0)?.toString(16);

  return (
    <img
      src={`https://cdn.jsdelivr.net/gh/twitter/twemoji@v14.0.2/assets/svg/${img}.svg`}
      className={styles["twemoji"]}
      alt={props.value}
    />
  );
}
