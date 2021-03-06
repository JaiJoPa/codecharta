---
permalink: /docs/tokei-importer
title: "Tokei Importer"
---

[Tokei](https://github.com/XAMPPRocky/tokei) is a program that computes basic metrics for your code.
It supports a large amount of different languages. The metrics provided are:

-   Lines
-   Lines of Code
-   Lines of comments
-   Blank lines

The TokeiImporter lets you import json files generated by Tokei into CodeCharta.

## Install Tokei

There are several ways to [install Tokei](https://github.com/XAMPPRocky/tokei#installation).
For Linux and MacOS binaries can be downloaded, on Windows the tool has to be built from source as described below:

1. Make sure you have [Rust](https://www.rust-lang.org/tools/install)
   and the C++ Build Tools of Visual Studio installed.
2. Build Tokei from source
    ```
    $ git clone https://github.com/XAMPPRocky/tokei.git
    $ cd tokei
    $ cargo build --release
    ```
3. Install tokei with enabled json support `cargo install tokei --features json`
4. Add tokei to your PATH variable if necessary

## Analyze a Project with Tokei

Run

```bash
tokei . --output json > tokei_results.json
```

in the project's root folder.

## Usage of the Tokei Importer

| Parameter                          | description                                   |
| ---------------------------------- | --------------------------------------------- |
| `FILE`                             | tokei generated json                          |
| `--path-seperator=<pathSeperator>` | path seperator (default = '/')                |
| `-h, --help`                       | displays help                                 |
| `-o, --outputFile=<outputFile>`    | output File (or empty for stdout)             |
| `-c`                               | compresses outputfile to gzip format          |
| `-r, --root-name=<rootName>`       | root folder as specified when executing tokei |

```
Usage: ccsh tokeiimporter [-h] [--path-separator=<pathSeparator>]
                          [-o=<outputFile>] [-p=<projectName>] [-r=<rootName>]
                          [FILE]
```

Examples:

```
sh ./ccsh tokeiimporter tokei_results.json --path-separator \\
```

```
tokei -o json | sh ./ccsh tokeiimporter
```
