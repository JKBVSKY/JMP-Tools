---

# Welcome to JMP-Tools!
# What's new?

---
## [0.4.2] OUT NOW! - 2025-08-23

### Changed
- Organized CSS code into separate files for better maintainability.
- Improved app responsiveness on mobile and desktop devices.
- Replaced the pallet input field with a modern slider for easier and more intuitive pallet adding.

## [0.4.1] OUT NOW! - 2025-08-22

### Added
- Modern side navigation bar with sliding animation and hamburger menu.
- Responsive design: navigation works great on both desktop and mobile.
- Active link highlighting in the navigation menu.
- Animated theme switcher button with sun/moon icons, positioned at the bottom of the sidebar.
- Swipe gesture support for closing the navigation on mobile devices.

### Improved
- Navigation and theme switching are now fully synchronized across the app.
- Updated sidebar and theme switcher colors for a more modern look.

### Fixed
- Improved mobile usability and layout consistency.

## [0.4.0] - 2025-08-16

### Added

- **Add new entry in score history:** User can now manually add the data and save it straight to Your score history! 

- **New clock:** To make it easier to synchronize the start time of loading trucks.

- **You can now delete entries in trucks loaded tab.** 

- **Settings:** Now as a separate menu!

- **Notifications:** Push-up notifications about the current score (enable in settings).

- **Light/Dark mode:** Two visual themes for the app (select in settings).

### Fixed

- **Language:** Changelog and score history tab is fully translated now!

### Changed

- **Font:** Changed global font.

- **Design:** Restyled the app.

- **Language selection moved to settings menu.**

## [0.3.0] - 2025-05-14

### Added

- **Score History:** A very useful function that will allow the user to monitor their work efficiency. It allows the user to save the result of each working day, then calculates and displays the average monthly result of user's score.

### Fixed

- Fixed a bug where the "47 pal/h at" function was showing the wrong time, if user adjusted his time before turning off the calculation.

- Fixed a bug where the summary tab was showing the wrong value of "Turned off at", if user adjusted his time before turning off the calculation.

- Fixed the responsiveness problems with the main score calculator display.

### Reworked

- Changed the menu style (resigned from using the hamburger menu - it just looks better now).

- Restyled the main calculations display - cleaner view, better organization, buttons are inside the display now.

- Navigation uses routes now - no more redirecting to the main page after refreshing.

### Planned in the future

- **Score history:** [DONE]

- **Tiers:** User will be able to see his score tier in real time and approx. bonus remuneration.

- **Time converter:** A simple tool allowing to convert decimal time values to normal time.

- **Pallets predictor:** An useful tool helping to predict the remaining amount of pallets that the packaging worker will produce.

- **Packaging section score calculator:** A score calculator for packaging section.

- **More statistics for score counter:** [DONE]

- **Adjustable values:** For better score synchronization.

## [0.2.1] - 2025-01-31

### Added

- **New Statistics:**

  - **Time of Beginning:** Displays the time of calculations beginning.

  - **47 pal/h at:** Displays the precise time of when the user's score will reach 47 pallets per hour (which is the max score).

- **Adjustable time:** User can now adjust the elapsed time for better score synchronization. 

---

## [0.2.0] - 2025-01-23

### Added

- Three new buttons for the navigation bar: "Home", "Calculator App" and "Score History"

- A homepage showing what's new in the App.

- Hamburger menu

- **Weighted calculations:** Calculator app now supports weighted calculations!

- **Tabs:** Introduced a tabbed interface for improved navigation and organization.

  - **Main Calculations Tab**: Displays detailed calculations.

  - **Trucks Loaded Tab**: Dedicated tab for tracking loaded trucks.

  - **Summary Tab**: Provides a summary of calculations.

### Fixed

- Fixed a bug where the loading time could be a negative value.

- Removed the possibility of unexpected behaviour when adding break time.

### Changed

- Pause function got fully reworked. User can now choose the amount of time spent on break. This function is respecting the rules of JMP's warehouse "scoring on pause" system.

- Debugging buttons are hidden now, and shown only after pressing "Enable debugging" button.

- Slightly changed the design of buttons.

- Changed size and font style of the header.

### Removed

- Old pause function that was not practical.

### Updated

- Translations are up to date now!

---

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

