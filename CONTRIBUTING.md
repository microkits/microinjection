# Contributing

As the creators and maintainers of this project, we want to ensure that it lives on and continues to grow and evolve. We would like to encourage everyone to help and support this library by contributing.

As a contributor, here are the guidelines we would like you to follow:

 - [Issues and Bugs](#issue)
 - [Feature Requests](#feature)
 - [Submission Guidelines](#submit)
 - [Coding Standard](#coding-standard)
 - [Commit Message Format](#commit)
 
## <a name="issue"></a> Found a Bug?

If you find a bug in the source code, you can help by [submitting an issue](#submit-issue) or even better, by [submitting a Pull Request](#submit-pr) with a fix.

## <a name="feature"></a> Missing a Feature?

You can *request* a new feature by [submitting an issue](#submit-issue). 
If you would like to *implement* a new feature, please submit an issue with a proposal for your work first, 
so that it can be discussed. This will also allow us to better coordinate our efforts, 
prevent duplication of work, and help you to craft the change so that it is successfully accepted into the project.
## <a name="submit"></a> Submission Guidelines

### <a name="submit-issue"></a> Submitting an Issue

Before you submit an issue, please search the issue tracker,
maybe an issue for your problem already exists and the discussion might inform you of workarounds readily available.

We want to fix all the issues as soon as possible, but before fixing a bug we need to reproduce and confirm it.
 In order to reproduce bugs we ask you to provide a minimal code snippet that shows a reproduction of the problem.


### <a name="submit-pr"></a> Submitting a Pull Request (PR)
Before you submit your Pull Request (PR) consider the following guidelines:

* Search [GitHub](https://github.com/microkits/microinjection/pulls) for an open or closed PR
  that relates to your submission. You don't want to duplicate effort.

* Clone your fork of the repository.
```sh
git clone https://github.com/YOUR_USERNAME/microinjection.git
```

* Install dependencies.
```sh
yarn
```

* Create your patch, **including appropriate test cases**. This project aims to have 100% code coverage, without tests your PR will not be accepted. 
* Run all test suites and ensure that all tests pass.
```sh
yarn test
```
* Run lint and ensure all code is following lint rules.
```sh
yarn lint
```
* Commit your changes using a descriptive commit message that follows our [Commit Message Format](#commit).
* In GitHub, send a pull request to `main` branch.
* If we suggest changes then:
  * Make the required updates.
  * Re-run all test suites to ensure tests are still passing.
  * Rebase your branch and force push to your GitHub repository (this will update your Pull Request):

    ```shell
    git rebase main -i
    git push -f
    ```

That's it! Thank you for your contribution!

## <a name="coding-standard"></a> Coding Standard

To ensure consistency throughout the source code, keep these rules in mind as you are working:

- All features or bug fixes **must be tested**.
- If you are implementing new feature or extending public API, you should **document it**.

Some highlights:

- use 2 spaces for indentation
- always use semicolons
- prefer `const` over `let` (and do not use `var`)

## <a name="commit"></a> Commit Message Guidelines

We have very precise rules over how our git commit messages can be formatted.  This leads to **more
readable messages** that are easy to follow when looking through the **project history**.

### Commit Message Format
Each commit message consists of a **header**, a **body** and a **footer**.  The header has a special
format that includes a **type** and a **subject**:

Each commit message consists of a header, a body and a footer, following [Conventional Commits] specification. 

```
<type>: <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```
### Subject
The subject contains succinct description of the change:

* use the imperative, present tense: "change" not "changed" nor "changes"
* don't capitalize first letter
* no dot (.) at the end

### Body
Just as in the **subject**, use the imperative, present tense: "change" not "changed" nor "changes".
The body should include the motivation for the change and contrast this with previous behavior.

### Footer
The footer should contain any information about **Breaking Changes** and is also the place to
reference GitHub issues that this commit **Closes**.

**Breaking Changes** should start with the word `BREAKING CHANGE:` with a space or two newlines.
The rest of the commit message is then used for this.

### Examples
Fix and close issue:
```
fix: resolve issues uppercase column names

Closes: #123456
```
Implement new feature:
```
feat: implement new magic decorator

This new feature changes the behavior to allow the use of the new magic decorator...

Closes: #123456
```
Docs update:
```
docs: change typo in the home page
```
Breaking change:
```
refactor: refactor driver API

BREAKING CHANGE: description of breaking change in driver API
```
