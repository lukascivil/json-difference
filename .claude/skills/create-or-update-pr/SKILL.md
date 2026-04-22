---
name: create-or-update-pr
description: Create a pull request for the current branch, or update the existing one if it already exists. Regenerates the title (Conventional Commits format) and the body (Objective + What was done) from the actual changes, in English. INVOKE when the user asks to "open a PR", "create a PR", "update the PR", "update PR title/description", "push and PR", or similar. Works even when a PR already exists — it edits rather than re-opens.
---

# Create or Update Pull Request

This skill creates a new PR for the current branch, or updates the existing PR if one is already open. In both cases, it regenerates the **title** (Conventional Commits) and **body** (Objective + What was done) from the actual diff and commit history. All output is in **English**, regardless of the conversation language.

## When to use

Invoke this skill whenever the user wants to:

- Open a PR for the current branch
- Update an existing PR's title or description
- Refresh the PR after new commits on the branch

Do **not** invoke for: merging, reviewing, closing PRs, or operations against a different branch.

## Preconditions

Before doing any network action, verify:

1. The repository has a GitHub remote (`git remote -v` shows github.com). If not, abort and tell the user.
2. The current branch is **not** the main/master branch. Detect the main branch with `gh repo view --json defaultBranchRef -q .defaultBranchRef.name`. If the user is on it, abort and ask them to switch.
3. The `gh` CLI is authenticated (`gh auth status`). If not, abort with instructions.
4. There are commits on the current branch beyond the merge base with the default branch. If zero commits ahead, abort — nothing to PR.

## Steps

### 1. Gather branch + repo context (parallel)

Run these commands in parallel:

```sh
git branch --show-current                                            # current branch
gh repo view --json defaultBranchRef -q .defaultBranchRef.name       # default/base branch
gh pr list --head "<current-branch>" --state open --json number,title,body,url --limit 1
git status --porcelain                                               # uncommitted changes check
git rev-parse --abbrev-ref "<current-branch>@{upstream}" 2>&1        # is branch pushed?
```

### 2. Gather change context (parallel)

Using the base branch discovered above:

```sh
git log <base>..HEAD --oneline                 # commit list
git diff <base>...HEAD --stat                   # files changed + insertions/deletions
git diff <base>...HEAD                          # full diff (truncate if huge)
```

If the diff is very large (>1000 lines), prefer `--stat` plus reading key files directly over dumping everything.

### 3. Handle uncommitted changes

If `git status --porcelain` is non-empty:

- **Do NOT** auto-commit. Ask the user: "You have uncommitted changes in <files>. Commit them first, or should I proceed with just what's already committed?"
- Only continue once the user answers.

### 4. Handle unpushed branch

If the branch has no upstream (step 1 `rev-parse` errored with `no upstream`):

- Push with `git push -u origin <current-branch>` **only** if the user's request implies pushing (e.g. "open a PR", "create PR"). If they said "update the PR description" on an unpushed branch, that's inconsistent — ask.

### 5. Draft the title (Conventional Commits)

Based on the actual diff, draft a title following [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>)?: <short summary in lowercase, imperative, no trailing period>
```

Pick the `<type>` that best matches the changes:

| Type | When |
|---|---|
| `feat` | New user-facing capability |
| `fix` | Bug fix |
| `docs` | Documentation only |
| `refactor` | Code restructuring without behavior change |
| `perf` | Performance improvement |
| `test` | Adding/updating tests |
| `build` | Build system, deps, bundler config |
| `ci` | CI/CD workflow changes |
| `chore` | Tooling, repo plumbing, no user-facing impact |
| `style` | Formatting only (whitespace, semicolons) |
| `revert` | Reverting a prior commit |

Scope rules:

- Use the affected package/app name when changes are localized (e.g. `feat(mcp-json-diff): …`, `docs(playground): …`).
- If changes span multiple packages, omit the scope or use `repo`/`workspace`.
- Keep the summary under **72 characters** total.

If the branch mixes multiple types (e.g. feat + docs), pick the dominant one by line count / impact.

### 6. Draft the body (Objective + What was done)

Always use this exact structure, in English:

```md
## Objective

<1-3 sentences stating WHY this change exists — the goal or problem it solves. Infer from commit messages, diff context, and any linked issues. If nothing is clear, say "Implements <feature>" or "Fixes <issue>".>

## What was done

- <bullet 1: concrete change, reference files/symbols where useful>
- <bullet 2>
- <bullet N>

## Test plan

- [ ] <verification step derived from what changed — e.g. "Run `yarn nx test json-difference`", "Open playground and paste two JSONs">
- [ ] <additional step if relevant>
```

Body rules:

- Keep bullets concrete and tied to real changes in the diff. No generic filler.
- Reference file paths using backticks (e.g. `` `tools/mcp-json-diff/src/index.ts` ``).
- If changes include a new public API, add a `## API changes` section with before/after.
- If the branch includes a breaking change, add `## Breaking changes` and prefix the title type with `!` (e.g. `feat!: …`).
- Do **not** add a summary of what the PR "intends to do" — describe what it actually does.
- Do **not** include marketing language, emojis (unless the project uses them), or Claude attribution.

### 7. Create or update the PR

**Use HEREDOCs** to pass multi-line bodies to `gh` to avoid shell escaping issues.

#### If no open PR exists:

```sh
gh pr create \
  --base <base-branch> \
  --head <current-branch> \
  --title "<conventional-commits-title>" \
  --body "$(cat <<'EOF'
## Objective

…

## What was done

- …

## Test plan

- [ ] …
EOF
)"
```

#### If an open PR exists (from step 1):

```sh
gh pr edit <pr-number> \
  --title "<conventional-commits-title>" \
  --body "$(cat <<'EOF'
…
EOF
)"
```

> Use `gh pr edit` — never close and re-open. Editing preserves PR number, comments, and review history.

### 8. Report back

Output to the user:

- PR URL (from `gh pr create` output or `gh pr view --json url -q .url`)
- Whether it was **created** or **updated**
- The final title and a one-line summary of what the body contains

## Important rules

- **Never force-push** unless the user explicitly asks.
- **Never skip hooks** (`--no-verify`) unless the user explicitly asks.
- **Never commit or amend** as part of this skill — if there are uncommitted changes, ask the user.
- **Do not add** `Co-Authored-By: Claude …` or any AI-attribution footer to the PR body. This is a PR description, not a commit message.
- **Do not** include the "Generated with Claude Code" footer either — the user explicitly wants the PR body to look human-authored.
- Respect the user's repo conventions: if `git log` shows a consistent pattern (e.g. all commits use `chore:` for tooling), follow that pattern.

## Edge cases

| Situation | Action |
|---|---|
| PR exists but is **closed/merged** | Ask the user whether to open a new PR or reopen the old one. Default: open a new PR. |
| Branch is the default branch | Abort with an explanation. |
| No commits ahead of base | Abort — "There's nothing to PR." |
| Uncommitted changes | Ask the user — do not auto-commit. |
| Branch has no remote tracking | Push with `-u` only if the intent is to create a PR. |
| Multiple open PRs for same branch | Use the most recent; warn the user about the others. |
| Large diff (>1000 lines) | Use `--stat` + targeted reads instead of full diff; note in response that the body was generated from a summary view. |
