# Contributing to vuegg
I love your input! I want to make contributing to this project as easy and transparent as possible, whether it's:

- Reporting [bugs](https://github.com/vuegg/vuegg/blob/master/.github/CONTRIBUTING.md#bug-reporting)
- Submitting fixes
- Proposing [new features](https://github.com/vuegg/vuegg/blob/master/.github/CONTRIBUTING.md#feature-requests)
- Discussing current state code
- Becoming a maintainer

## Coding Style
Follow the conventions defined (babel-eslint parser rules) in the project .eslint files, in short:

> - 2 spaces for indentation rather than tabs
> - No semi-colon ( ; ) needed to end statements

## Commits format
Vuegg uses [standard-version](https://github.com/conventional-changelog/standard-version) for automatic versioning and CHANGELOG generation.

To help following these guidelines, please use `npm run commit` instead of the standard `git commit`. This way, you'll be prompted with questions to correctly format your commits (courtesy of [commitlint](https://github.com/marionebl/commitlint)).

However, even if you use `git commit`, you'll be shown errors if your commits don't follow [Conventional Commits](https://conventionalcommits.org/) format.

> - Commits of type `fix` will trigger bugfix releases (PATCH in [SemVer](https://semver.org/#summary)), think `0.0.1`
> - Commits of type `feat` will trigger feature releases (MINOR in [SemVer](https://semver.org/#summary)), think `0.1.0`
> - Commits with `BREAKING CHANGE` in body or footer will trigger breaking releases (MAJOR in [SemVer](https://semver.org/#summary)), think `1.0.0`

> All other commit types are allowed, but they will no trigger a new release.

## Vuegg :heart: Github
Vuegg uses github to host its code, so every contribution revolves around the github's way.

### Bug Reporting
Report a bug, help to improve vuegg by opening a [new issue [bug]](https://github.com/vuegg/vuegg/issues/new?template=BUG_REPORT.md). Follow the *Bug Report* template to help solving it faster.

### Feature Requests
Suggest new ideas to implement in vuegg by opening a [new issue [feat]](https://github.com/vuegg/vuegg/issues/new?template=FEATURE_REQUEST.md). Follow the *Feature Request* template to help solving it faster.

### Use Github Flow
Pull requests are the best way to propose changes to the codebase, and in order to for everyone to follow a pattern, [Github Flow](https://guides.github.com/introduction/flow/index.html) is a great solution. Your pull requests are more than welcome:

1. Fork the repo and create your branch from `master`
2. If you've added code that should be tested, add tests
3. If you've changed APIs, update the documentation
4. Ensure the test suite passes
5. Make sure your code has no lint errors
6. Open a PR! (checkout the [PR template](https://github.com/vuegg/vuegg/blob/master/.github/PULL_REQUEST_TEMPLATE.md))

## License
By contributing, you agree that your contributions will be licensed under the same [MIT License](https://github.com/vuegg/vuegg/blob/master/LICENSE) that covers the vuegg.

## References
This contribution guide was adapted from [briandk's CONTRIBUTING.md](https://gist.github.com/briandk/3d2e8b3ec8daf5a27a62), which was adapted from [Facebook's Guidelines](https://github.com/facebook/draft-js/blob/a9316a723f9e918afde44dea68b5f9f39b7d9b00/CONTRIBUTING.md)
