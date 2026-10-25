/**
 * Sanity schema stubs for Studio setup.
 * Wire with `sanity init` + `defineType` from the `sanity` package when connecting the project.
 * Keep GROQ queries parameterized in the Next app (`src/lib/sanity`).
 */
export const schemaNames = [
  "product",
  "siteSettings",
  "order",
  "waitlistEntry",
  "policyPage",
] as const;
