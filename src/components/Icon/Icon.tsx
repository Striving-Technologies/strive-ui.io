import classNames from "classnames";
import { useEffect, useState } from "react";
import { IconProps } from "./Icon.types";

export const Icon = ({
  name,
  size = "medium",
  className,
  color = "currentColor",
}: IconProps) => {
  const [svgContent, setSvgContent] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadSvg = async () => {
      try {
        setLoading(true);
        setError(false);

        // Dynamic import of SVG file
        const svgModule = await import(`./files/${name}.svg`);
        const response = await fetch(svgModule.default);
        const svgText = await response.text();

        setSvgContent(svgText);
      } catch (err) {
        console.warn(`Failed to load icon: ${name}`, err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadSvg();
  }, [name]);

  const classes = classNames(
    "stc-icon",
    `stc-icon--${typeof size === "string" ? size : "custom"}`,
    className
  );

  if (loading) {
    return <span className={classes} />;
  }

  if (error || !svgContent) {
    return <span className={classes}>?</span>;
  }

  return (
    <span
      className={classes}
      dangerouslySetInnerHTML={{ __html: svgContent }}
      data-height={typeof size === "number" ? size : undefined}
      data-width={typeof size === "number" ? size : undefined}
      style={{
        display: "inline-block",
        color,
      }}
    />
  );
};
