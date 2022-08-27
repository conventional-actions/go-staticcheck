# go-staticcheck

A GitHub Action for running staticcheck.

## Usage

To use the GitHub Action, add the following to your job:

```yaml
- uses: conventional-actions/go-staticcheck@v1
```

### Inputs

| Name      | Default  | Description                                                    |
|-----------|----------|----------------------------------------------------------------|
| `version` | `latest` | the version of staticcheck to install                          |
| `checks`  | `all`    | comma-separated list of checks to enable                       |
| `format`  | `json`   | output format (valid choices are 'stylish', 'text' and 'json') |
| `tags`    | N/A      | comma-separated list of build tags                             |

### Outputs

No outputs

### Example

```yaml
on:
  push:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: conventional-actions/go-staticcheck@v1
```

## License

The scripts and documentation in this project are released under the [MIT License](LICENSE).
