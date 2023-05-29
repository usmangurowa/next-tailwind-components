interface CommonProp {
  children?: React.ReactNode;
}

interface DefaultComponentProps extends CommonProp {
  className?: string;
  style?: React.CSSProperties;
}
