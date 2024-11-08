type FilterConfig = {
  matchFrom: string;
  ignoreCase: boolean;
  stringify: (s: string) => string;
  trim: boolean;
};

export const filterOptions = (config = {}) => {
  const {
    matchFrom = "any",
    ignoreCase = true,
    stringify = JSON.stringify,
    trim = false,
  } = config as FilterConfig;

  return <Value>(options: Value[], { inputValue }: { inputValue: string }) => {
    let input = trim ? inputValue.trim() : inputValue;

    if (ignoreCase) {
      input = input.toLowerCase();
    }

    return options.filter((option) => {
      let candidate = String(stringify(option));

      if (ignoreCase) {
        candidate = candidate.toLowerCase();
      }

      return matchFrom === "start"
        ? candidate.indexOf(input) === 0
        : candidate.indexOf(input) > -1;
    });
  };
};

export function delay(milliseconds = 500) {
  return new Promise((resolve: any) =>
    setTimeout(function () {
      resolve();
    }, milliseconds)
  );
}
