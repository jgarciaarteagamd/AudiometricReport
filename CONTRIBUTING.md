# Contributing to AudiometricReport

AudiometricReport is a source-available clinical calculation and reporting application (under the [PolyForm Noncommercial License 1.0.0](LICENSE)), primarily maintained by **Juan Pablo García Arteaga**. External contributions, bug reports, and clinical feedback are very welcome within this framework.

---

## Reporting Bugs

If you discover a bug, unexpected calculation result, or rendering issue:

1. Check the [GitHub Issues](https://github.com/jgarciaarteagamd/AudiometricReport/issues) page to ensure the problem has not already been reported.
2. Open a new Issue providing:
   * A clear and descriptive title.
   * Step-by-step instructions to reproduce the issue.
   * Expected vs. actual behavior.
   * Your browser name/version and operating system.
   * If applicable, a screenshot of the affected audiogram or report.

> **CRITICAL - Patient Privacy & Data Protection:**
> **NEVER** include real patient information, identifiable clinical records, or sensitive health data in public issues or screenshots. Always use anonymized, synthetic, or dummy data when reporting issues.

---

## Suggesting Features

We welcome ideas for improving clinical workflows, additional calculation standards, or report formatting:

1. Open an Issue with the feature description.
2. Clearly explain the **clinical use case** and how it benefits audiologists, ENTs, or hearing care professionals.
3. If referencing a specific audiological standard or guideline, please include links or citations to relevant clinical literature or standards (e.g., ISO, ANSI, AAO-HNS, BIAP).

---

## Pull Requests

To contribute code:

1. **Discuss first:** For non-trivial features or major architectural adjustments, please open an Issue to discuss the proposal before investing significant time into a PR.
2. **Tech stack:** The codebase is built with TypeScript, React 19, Vite, Tailwind CSS, and Recharts.
3. **Type check & lint:** Ensure there are no TypeScript compilation or type errors before submitting by running:
   ```bash
   npm run lint
   ```
4. **License agreement:** All submitted contributions and code changes are accepted under the terms of the repository's [PolyForm Noncommercial License 1.0.0](LICENSE).

---

## Development Setup

To set up your local development environment and run the project, please refer to the **Getting Started / Local Development** section in the [README.md](README.md).
