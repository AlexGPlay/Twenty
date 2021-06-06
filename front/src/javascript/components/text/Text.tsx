type TextProps = React.DetailedHTMLProps<
  React.LabelHTMLAttributes<HTMLLabelElement>,
  HTMLLabelElement
> & {
  color?:
    | "twenty-blue"
    | "twenty-blue-dark"
    | "twenty-blue-light"
    | "light-gray-1"
    | "light-gray-2"
    | "gray-1"
    | "gray-2"
    | "green-1"
    | "red-1"
    | "orange-1"
    | "white-1"
    | "black-1";
  size?: string | number;
  fontWeight?: number;
};

const Text: React.FC<TextProps> = ({
  children,
  color = "black-1",
  size = "12px",
  fontWeight = 400,
  ...props
}) => (
  <label style={{ color: `var(--${color})`, fontSize: size, fontWeight: fontWeight }} {...props}>
    {children}
  </label>
);

export default Text;
