---

# Welcome to JMP-Tools!
# What's new?

---

## [0.2.0b-EXPERIMENTAL] - 2025-01-XX

### Added

- Three new buttons for the navigation bar: "Home", "Calculator App" and "Score History"

- A homepage showing what's new in the App.

- Hamburger menu

- **Weighted calculations:** Calculator app now supports weighted calculations!

### Changed

- Pause function got fully reworked. User can now choose the amount of time spent on break. This function is respecting the rules of JMP's warehouse "scoring on pause" system.

- Debugging buttons are hidden now, and shown only after pressing "Debug mode" button.

- Slightly changed style of the buttons.

- Changed size and font style of the header.

### Removed

- Old pause function that was not practical.
---

### Planned in the future

- **Score history:** User will be able to save and store his score at the "Score history" tab.

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

