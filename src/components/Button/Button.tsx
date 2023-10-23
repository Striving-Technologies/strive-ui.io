import classNames from "classnames";
import { MouseEvent } from "react";
import { Spinner } from "../Spinner";
import { ButtonLoadingIconPositionType, ButtonProps } from "./Button.types";

const Button = ({
  variant = undefined,
  size = "medium",
  shape = undefined,
  disabled = false,
  children,
  className = "",
  loading = false,
  loadingIconPosition = "left",
  loadingIcon = undefined,
  loadingIconProps,
  onClick,
  href,
  anchorProps,
  ...rest
}: ButtonProps) => {
  const renderLoadingIcon = (position: ButtonLoadingIconPositionType) => {
    if (loading && position === loadingIconPosition) {
      if (loadingIcon) {
        return <span className="stc-button__loader">{loadingIcon}</span>;
      }

      return (
        <span className="stc-button__loader">
          <Spinner {...loadingIconProps} />
        </span>
      );
    }

    return null;
  };

  const generatedClasses = classNames({
    "stc-button": true,
    [`stc-button-var--${variant}`]: variant,
    [`stc-button-size--${size}`]: size !== "medium" && size,
    [`stc-button-shape--${shape}`]: shape,
    [`stc-button--loading`]: loading,
    [`stc-button__loader--${loadingIconPosition}`]: loadingIconPosition,
  });

  const ButtonGenerated = (
    <button
      className={`${generatedClasses}${className ? ` ${className}` : ""}`}
      onClick={(e: MouseEvent<HTMLButtonElement>) => {
        if (disabled) {
          e.preventDefault();
          return;
        }
        onClick && onClick(e);
      }}
      disabled={disabled}
      {...rest}
    >
      {renderLoadingIcon("left")}
      {children}
      {renderLoadingIcon("right")}
    </button>
  );

  if (href) {
    return (
      <a
        href={href}
        {...anchorProps}
      >
        {ButtonGenerated}
      </a>
    );
  }

  return ButtonGenerated;
};

export default Button;
