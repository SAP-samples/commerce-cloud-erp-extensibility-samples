# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.0.9] - 2026-04-16

### Changed

- To Do


## [0.0.8] - 2026-03-25

### Changed

- Removed categories from plugin-manifest.json 


## [0.0.7] - 2026-02-12

### Changed

- Renamed files for `data_mappers` and `synchronous_extensions`. File name pattern changed from snake case to camel case
- Added `uriTemplate`, `headerTransformations` and `uriTransformations` attributes to all Data Mappers
- Fixed name on `beforeSaveAddress` Synchronous Extension

## [0.0.6] - 2026-01-09

### Changed

- Rename sap.cxcommerce.address.validateAddress.validateAddress to be sap.ccm.address.validateAddress.validateAddress
- Rename sap.cxcommerce.address.saveAddress.beforeSaveAddress to be sap.ccm.address.saveAddress.beforeSaveAddress
- Rename destinationId to destinationName in the synchronous extension payload

## [0.0.5] - 2025-12-09

### Changed

- Add name in the before_save_address_inbound.json
- Add name in the before_save_address_outbound.json
- Add name in the validate_address_inbound.json
- Add name in the validate_address_outbound.json


## [0.0.4] - 2025-09-29

### Changed

- Update pluginId and componentId to comply with the UUID format
- Remove uriTransformations, headerTransformations, uriTemplate in the inbound.json and outbound.json


## [0.0.3] - 2025-07-01

### Added

- Sample DQM Microservices sample plugin.
