import classNames from "classnames";
import { generateRandomId } from "../../utils";
import { Button } from "../Button";
import { Input } from "../Input";
import { SearchProps } from "./Search.types";

const Search = ({
  size,
  className,
  onSearch,
  searchButton,
  isPrimary,
  noDivider,
  ...rest
}: SearchProps) => {
  const generatedClasses = classNames({
    "stc-search": true,
    "stc-search--no-divider": noDivider,
  });

  // auto-generate an id for the input
  const inputId = generateRandomId("search-input-");

  const id = rest.id || inputId;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch((e.target as HTMLFormElement).querySelector("input")?.value || "");
  };

  const SearchInput = (
    <form
      role="search"
      className={`${generatedClasses}${className ? ` ${className}` : ""}`}
      onSubmit={handleSubmit}
    >
      <label htmlFor={id}>
        <span className="stc-off-screen">Search:</span>
      </label>
      <Input
        {...rest}
        id={id}
        type="text"
        size={size}
      />
      <Button
        type="submit"
        size={size}
        variant={isPrimary ? "primary" : undefined}
      >
        {searchButton || "Search"}
      </Button>
    </form>
  );

  return SearchInput;
};

export default Search;
