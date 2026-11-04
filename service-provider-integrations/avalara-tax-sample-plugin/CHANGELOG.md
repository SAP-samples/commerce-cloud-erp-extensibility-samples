# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.1] - 2026-11-04

### Changed

- Data Mapper upgraded to use the new JEXL engine for transformations.
- Path notation updated from slash-separated to dot-separated format (e.g., /lines/lineNumber → lines.lineNumber).
- Mapping schemas now support multiple operations, such as oneOf and anyOf, providing better support for the Avalara inbound schema.
- Avalara outbound Mapper transformation no longer relies on a Commerce Serverless Function; JEXL expressions are now used instead.

## [1.0.0] - 2026-03-25

### Added

- First stable public release.
