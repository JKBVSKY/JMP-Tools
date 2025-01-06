# Changelog

All notable changes to this project will be documented in this file.

The format is based on Keep a Changelog,
and this project adheres to Semantic Versioning.

## [0.1.0] - 2025-01-06

### Added

- Initial stable release of the app.

- Fully functional pause and resume feature.

- Persistent states through localStorage.

- Accurate pallet rate calculation even during pauses.

- Interval synchronization to ensure smooth rate calculations after resuming.

- Improved user interface with translations using t() for buttons and labels.

- Added a language button that dynamically opens a component for language selection. Users can now switch languages seamlessly.

- Introduced a simple how-to section explaining the app’s functionality and usage.

### Design & UI

- Implemented a visually appealing SVG background with some basic styling.

- Basic Responsiveness

- Ensured the app is compatible with various screen sizes, though further improvements are planned for future updates.

- Current design focuses on simplicity, with plans for future enhancements.

### Fixed

- Resolved issues causing incorrect pallet rate calculations during pause/resume transitions.

- Fixed bugs where pauseTimer would increment incorrectly after refresh.

- Addressed synchronization problems between intervals and states.

### Changed

- Refactored pause functionality to be driven entirely by paused state, reducing complexity.

- Simplified button logic for better maintainability.

### Debugging Features

- Debugging buttons are still present for development purposes. A potential isDebugging state toggle is being considered to streamline this functionality.

### Known Limitations

- Responsiveness may not be perfect on all devices and will undergo refinement in future updates.

### Notes

- This marks the initial version where the app is fully functional and stable. Future updates will follow semantic versioning guidelines.

