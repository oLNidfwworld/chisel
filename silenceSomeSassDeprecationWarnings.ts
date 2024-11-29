const messageStrings = [
  "Sass @import rules are deprecated and will be removed in Dart",
  "The legacy JS API is deprecated and will be removed",
];

export const silenceSomeSassDeprecationWarnings = {
  verbose: true,
  logger: {
    warn(
      message: string,
      options: { span?: { text: string }; stack: unknown; deprecation: unknown }
    ) {
      const { stderr } = process;
      const span = options.span ?? undefined;
      const stack =
        (options.stack === "null" ? undefined : options.stack) ?? undefined;

      if (options.deprecation) {
        if (messageStrings.some((_message) => message.startsWith(_message))) {
          // silences above deprecation warning
          return;
        }
        stderr.write("DEPRECATION ");
      }
      stderr.write(`WARNING: ${message}\n`);

      if (span !== undefined) {
        // output the snippet that is causing this warning
        if (span.text) stderr.write(`\n"${span.text}"\n`);
      }

      if (stack !== undefined) {
        // indent each line of the stack
        stderr.write(
          `    ${stack.toString().trimEnd().replace(/\n/gm, "\n    ")}\n`
        );
      }

      stderr.write("\n");
    },
  },
};
