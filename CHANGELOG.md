# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/)

## [unreleased]

### Added 🚀

### Changed

### Removed 🗑

### Fixed 🐞

- fixed wrong max tree map visibility ([#1624](https://github.com/MaibornWolff/codecharta/issues/1624))

### Chore 👨‍💻 👩‍💻

## [1.66.0] - 2021-01-18

### Added 🚀

-   Allow color of buildings to be customizable in the ribbon bar and in the legend. Colors of edges are now customizable as well ([#1533](https://github.com/MaibornWolff/codecharta/issues/1533))<br/><br/>
    ![example of new feature](https://user-images.githubusercontent.com/3596742/103547861-3c1c7380-4ea5-11eb-8df2-541caf65b9df.png)

### Changed

### Removed 🗑

### Fixed 🐞

-   Global settings not reverting to default ones ([#1632](https://github.com/MaibornWolff/codecharta/issues/1632))
-   Maximum treemap files shown in squarified node ([#1624](https://github.com/MaibornWolff/codecharta/issues/1624))
-   Wrong folder names and colors in legend when using the highlight folder feature ([#1555](https://github.com/MaibornWolff/codecharta/issues/1555))
-   Temporary labels are placed at the wrong height for scaled buildings ([#1618](https://github.com/MaibornWolff/codecharta/issues/1618))
-   Visible labels will disappear or placed lower for scaled buildings ([#1619](https://github.com/MaibornWolff/codecharta/issues/1619))
-   Unnecessary break line for secondary metrics ([#1093](https://github.com/MaibornWolff/codecharta/issues/1093))

### Chore 👨‍💻 👩‍💻

## [1.65.0] - 2020-12-23

### Added 🚀

-   Highlight label while hovering over building, draw a temporary label for hovered buildings that have none ([#1529](https://github.com/MaibornWolff/codecharta/issues/1529))
-   Integrated streetlayout ([#904](https://github.com/MaibornWolff/codecharta/issues/904))
    ![cc_street_ccv](https://user-images.githubusercontent.com/63230711/78872405-87eed900-7a49-11ea-984a-c0ef738779b9.png)
    In street layout file nodes are displayed as buildings and directories are displayed as streets. A street layout has the advantage of a more apparent directory structure and stable positioning of nodes after metric changes.
    two different Street layout are integrated : - StreetLayout : as described above. - TMStreet : a combination of street layout and squarified layout.

### Changed

-   The button to see excluded buildings is now merged into the flattened button. Excluded and flattened buildings can now be seen by opening the building with the eye slash icon ([#1543](https://github.com/MaibornWolff/codecharta/issues/1543))

### Removed 🗑

### Fixed 🐞

-   Height scaling not applied to buildings ([#1595](https://github.com/MaibornWolff/codecharta/issues/1595)))
-   Fixed multiple label positioning/scaling bugs

### Chore 👨‍💻 👩‍💻

-   e2e flaky test ([#1322](https://github.com/MaibornWolff/codecharta/issues/1322))

## [1.64.0] - 2020-12-15

### Added 🚀

-   Download and upload Custom Configurations is now possible ([#1472](https://github.com/MaibornWolff/codecharta/issues/1472))

    -   Open the Custom Configs menu in the toolbar on top of the map
    -   Next to the `plus` Button you can see two new buttons: Upload and download.
        -   Download: If you already have added Custom Configs you can download them by clicking the download button.
            -   Custom Configs which are applicable for the currently selected map(s) will be downloaded as `.cc.config.json` files.
        -   Upload: Click the upload button and specify your Custom Config file (`<file-name>.cc.config.json`)
            -   Already existing Custom Configs will be skipped.
            -   Different Custom Configs with same names will be renamed.
            -   Another way to upload your Custom Configs is to upload a `.cc.json` file together with one or multiple `.cc.config.json` files using the default `Load .cc.json map` button in the upper left corner.
    -   The Configs are stored to the local storage of your browser.
        -   If a limit of `768KB` is exceeded you will see a warning when trying to add a new Custom Config.
        -   You can click the displayed "download and purge" button to download/backup at least 6 months old Configs and then purge them from the local storage to make space for new ones.
        -   If we cannot purge any Configs, you might have to do that by your own by deleting specific Configs manually.

### Changed

-   Increase possible margin size ([#1490](https://github.com/MaibornWolff/codecharta/pull/1490))
    -   change displayed margin value from % to pixel
    -   change dynamic margin value to a default margin value that should fit the map

### Removed 🗑

### Fixed 🐞

-   Re-enabled color selection for folders and on hover ([#1544](https://github.com/MaibornWolff/codecharta/pull/1544))
-   Labels do not take delta height into account ([#1523](https://github.com/MaibornWolff/codecharta/issues/1523))
-   The calculation of the map resolution scale factor was wrong ([#1491](https://github.com/MaibornWolff/codecharta/issues/1491))
    -   The factor is used to decrease the map resolution especially for big maps to avoid performance issues.
    -   Now only the selected maps will be considered for the calculation. Unselected maps will be skipped.

### Chore 👨‍💻 👩‍💻

## [1.63.0] - 2020-11-30

### Added 🚀

-   Add the folder name onto the floor on the first 3 layers to get a better overview of the map ([#1491](https://github.com/MaibornWolff/codecharta/issues/1491))
-   UX Improvements related to labels allowing for user interaction #1404
    -   Labels can be hovered, hovering their corresponding node
    -   Selecting a label will select the corresponding node
    -   Hovering a label will remove its transparency and move towards the user:
        -   If other labels obstruct the hovered label it will move to the front
    -   Increased the transparency of other labels; this makes it easier to distinguish the hovered label
    -   Increase the amount of labels to 250.
-   Show file count of folders in Attribute-Side-Bar ([#1255](https://github.com/MaibornWolff/codecharta/issues/1255)):
    ![img showing file count of folder](https://user-images.githubusercontent.com/3596742/100371884-be915800-3008-11eb-89f5-ed57c62680cc.png)

### Changed

### Removed 🗑

### Fixed 🐞

-   Buildings are flattened when delta is active #824.
-   Selected Building now stays highlighted when map is rotated #1498

### Chore 👨‍💻 👩‍💻

## [1.62.0] - 2020-11-12

### Added 🚀

-   A new option in the Global Settings allows to enable/disable experimental features #1318
    -   Click on the settings button in the upper right corner to open the Global Settings dialog.
    -   Activate/Deactivate the new option "Enable Experimental Features"
    -   The features will be shown/hidden accordingly
-   "CustomViews", the first experimental feature has been added #1318

    -   It must be enabled by activating the new option in the Global Settings dialog as mentioned before.
    -   You can save your current map configurations to replay/restore them later.
    -   A saved CustomView can only be applied for it's original map.
    -   This will enable you to be more efficient in analizing projects by switching between different CustomViews.

-   NodeContextMenu now contains option to keep buildings highlighted #1323

-   Fixed Folder algorithm supports nested (parent-child) Fixed Folders #1431
    1. Define children of a Fixed Folder also as Fixed Folders by adding the `fixedPosition` attribute manually in `.cc.json`.
    1. All children of a parent Fixed Folder must be fixed.
    1. Read the how-to guide for further information: https://maibornwolff.github.io/codecharta/how-to/fixate_folders_with_a_custom_cc_json/

### Changed

-   Improved search

    1. Not providing any star in the search bar from now on expects the input to
       be a wildcard search. Thus, files are going to match paths that have
       leading or following characters. E.g., `oo` is going to match
       `/root/foobar`.
    1. To use the explicit former search mode, wrap the search entry in quotes as
       in: `"oo"`. This would only match filenames that are exactly `oo`.
    1. The search field accepts multiple search entries at once, separated by
       commata. `foo,bar` is going to search for both `*foo*` and `*bar*` and
       marks all matched files accordingly.
    1. It is possible to invert the search with a leading exclamation mark as in
       `!foobar`. That will match any file that does not match `*foobar*`. It is
       only possible to invert the complete input, not individual search entries.
    1. Whitespace handling changed to ignore leading whitespace.

-   Distribution metric #1188

    1. set rloc to default distribution metric, showing language percentages for real lines of code, if available. Else set to unary to show language distribution over files

-   Improved file sorting in the file overview of the search bar
    -   Numbers are sorted naturally
    -   Characters are compared with their base character (e.g., `a` is now next to `á`).
-   Label metric not shown by default anymore

### Removed 🗑

### Fixed 🐞

### Chore 👨‍💻 👩‍💻

## [1.61.0] - 2020-10-30

### Added 🚀

### Changed

-   Disable highlighting buildings during map movement #1432

### Removed 🗑

### Fixed 🐞

-   File tree/flattened/excluded overlay visualization is buggy #1269
-   EdgePreview on Map broken when selecting zero #1276

### Chore 👨‍💻 👩‍💻

-   Schedules and merge retries of dependabot dependency updates changed

## [1.60.2] - 2020-10-24

### Added 🚀

### Changed

### Removed 🗑

### Fixed 🐞

-   Mouse cursor flickering #1170
-   Fix flipping map when clicking any option in the toolbar #1410
-   Fix edge metric not working correctly

### Chore 👨‍💻 👩‍💻

## [1.60.1] - 2020-10-20

### Added 🚀

### Changed

### Removed 🗑

### Fixed 🐞

-   Issue with first start without an internet connection not working#1266
-   Issue with ribbon bar sizes for opened cards #1035

### Chore 👨‍💻 👩‍💻

## [1.60.0] - 2020-10-16

### Added 🚀

-   Parsing feedback with progressbar and probable ETA for parsers and SonarImporter #847
-   Mark node names and make the names clickable for nodes that have a link to them #1313
-   Indicate the metric name next to a shown value in a new line on labels #1035
-   Checkboxes to display metric names and values and to display node names on labels #1035
-   Mark node names and make the names clickable for nodes that have a link to them #1313

### Changed

-   Label design #1035

### Removed 🗑

### Fixed 🐞

-   First start without an internet connection of standalone not working #1266
-   Comparing a map in delta mode shows the correct differences
-   This mainly applies to maps compared with itself while it also fixes some other minor miscalculations
-   File extensions detection is improved
-   Zooming in and out the map will now close the node context menu #1324
    -   Improved and simplified event handling in NodeContextMenu component

### Chore 👨‍💻 👩‍💻

-   Improved performance of multiple operations (e.g., delta mode).

## [1.59.0] - 2020-10-09

### Added 🚀

-   New EXPERIMENTAL SCMLogParser version
-   Improved performance around 300% when parsing CodeCharta
-   Improved memory usage
-   Fixed issue with old parser creating incorrect nodes in CodeCharta #871
-   ATTENTION: the parser is experimental, therefore some potential issues might remain, e.g. potentially an unhandled edge case when parsing node
-   To use the new parser a reversed git log is needed, as well as a git file list, refer to `ccsh scmlogparserv2 -h` for additional information

### Changed

### Removed 🗑

### Fixed 🐞

-   Color-Metric slider is set and activated in the map accordingly to the released sliderbutton #1319
-   Deselcting a building will instantly dehighlight the buildings which were connected through edges #890

### Chore 👨‍💻 👩‍💻

## [1.58.1] - 2020-10-02

### Added 🚀

### Changed

### Removed 🗑

### Fixed 🐞

-   Showing wrong edges when hovering a building after selecting one #1137

### Chore 👨‍💻 👩‍💻

## [1.58.0] - 2020-10-02

### Added 🚀

-   Add active color metric to the top of the legend panel #1278
-   SourceCodeParser: Java 14 Support #1277

### Changed

### Removed 🗑

### Fixed 🐞

### Chore 👨‍💻 👩‍💻

## [1.57.4] - 2020-09-25

### Added 🚀

### Changed

### Removed 🗑

### Fixed 🐞

-   Metric-Settings-Panels closed when clicking an option inside the panel #1258
-   Improve loading and rendering maps performance

### Chore 👨‍💻 👩‍💻

## [1.57.3] - 2020-09-18

### Added 🚀

### Changed

### Removed 🗑

### Fixed 🐞

-   Improve overall performance for loading and rendering maps
-   Improve error messages when a file can't be loaded with the URL parameters

### Chore 👨‍💻 👩‍💻

## [1.57.2] - 2020-09-11

### Added 🚀

### Changed

### Removed 🗑

### Fixed 🐞

-   New API version 1.2 not set correctly in analysis

### Chore 👨‍💻 👩‍💻

## [1.57.1] - 2020-09-11

### Added 🚀

### Changed

### Removed 🗑

### Fixed 🐞

-   Validation of unique filenames not checking for the complete path and instead throwing an error on duplicate filename

### Chore 👨‍💻 👩‍💻

## [1.57.0] - 2020-09-11

### Added 🚀

-   `fixedPosition` as a new property in the `cc.json` that allows to fixate folders in the map

### Changed

-   `cc.json` version updated to `1.2`

### Removed 🗑

### Fixed 🐞

-   Compressed `cc.jsons (.gz) not marked as accepted when selecting a file in the file chooser

### Docs 🔎

-   [How-To: Fixate Folders in the `cc.json`](https://maibornwolff.github.io//codecharta/how-to/fixate_folders_with_a_custom_cc_json/)
-   CC-Json-API changes

## [1.56.0] - 2020-09-04

### Added 🚀

### Changed

### Removed 🗑

### Fixed 🐞

-   Improve performance when switching to multiple or delta mode when edges are available
-   Scenario with EdgeMetric is only appliable when EdgeMetric is existing for the Map #1201
-   Starting standalone version results in infinite loading loop #1202
-   Expanded metric selection will close when clicking anywhere outside of that selection #1036

### Chore 👨‍💻 👩‍💻

## [1.55.0] - 2020-08-28

### Added 🚀

-   Cursor indicator for different mouse actions #1042

### Changed

-   Edge-Metrics sorted by name now instead of number of incoming and outgoing edges

### Removed 🗑

### Fixed 🐞

-   Number of incoming and outgoing edges not visible when hovering over a node #1095
-   Highlighting buildings in multiple mode now works #956

### Chore 👨‍💻 👩‍💻

## [1.54.0] - 2020-08-21

### Added 🚀

-   Opening NodeContextMenu in the tree-view marks the node until it is closed #1068

### Changed

### Removed 🗑

### Fixed 🐞

-   Missing Sonarcloud metrics in demo

### Docs 🔎

-   Added note how to fix missing `sh` command issue when running integration tests on Windows

### Chore 👨‍💻 👩‍💻

## [1.53.0] - 2020-08-14

### Added 🚀

### Changed

-   NodeContextMenu will show up when releasing the right-mouse-button now #1027

### Removed 🗑

### Fixed 🐞

-   NodeContextMenu showing up after moving the mouse while holding right-mouse-button #1027

### Chore 👨‍💻 👩‍💻

## [1.52.0] - 2020-08-07

### Added 🚀

-   Support for Tokei 12 new JSON schema #1103

### Changed

-   Rename master branch to main for a more inclusive naming #1117

### Removed 🗑

### Fixed 🐞

-   After loading an invalid file the filechooser pops up again, so that the user can choose a valid file #1021
-   Quality gates on sonarcloud.io are red #879

### Docs 🔎

-   Moved developer guides to our [gh-pages](https://maibornwolff.github.io/codecharta/) #986

### Chore 👨‍💻 👩‍💻

## [1.51.0] - 2020-07-24

### Added 🚀

-   File chooser now accept ".json" files only to avoid accidentally loading incorrect files #1094
-   Lots of tooltips #1030

### Changed

### Removed 🗑

### Fixed 🐞

-   Blacklisting a building would sometimes not update the map #1098
-   Changes made after opening the filechooser and closing it won't be applied #875
-   Edge metric list not always updated correctly when loading a new file #1106

### Chore 👨‍💻 👩‍💻

## [1.50.0] - 2020-07-10

### Added 🚀

-   Line between scenario indicator and remove button #1069

### Changed

-   Reduced transition time when opening or collapsing parts of the ribbon bar #1043
-   Search Panel will open now when clicking in the search field and collapse when clicking somewhere else #1071

### Removed 🗑

### Fixed 🐞

-   Opening the same file again will now reload the file and reset the application #1032
-   Improve render performance by persisting color conversions #1034
-   Sorting in tree-view not being applied #1040

### Chore 👨‍💻 👩‍💻

## [1.49.1] - 2020-07-03

### Added 🚀

### Changed

### Removed 🗑

### Fixed 🐞

-   Improved performance significantly when switching between single, multiple and delta
-   Color-Range-Slider sometimes misbehaved when loading a new map or excluding buildings #926

### Chore 👨‍💻 👩‍💻

## [1.49.0] - 2020-06-19

### Added 🚀

-   Custom scenarios can be created and saved through the scenario menu #675
-   Importer and parser documentation can now be found on the github Website #954
-   Output of sourcemonitor can now be compressed with the compression flag

### Changed

### Removed 🗑

### Fixed 🐞

### Chore 👨‍💻 👩‍💻

-   [Security] Bump angular from 1.7.9 to 1.8.0 in /visualization #995

## [1.48.0] - 2020-06-12

### Added 🚀

-   Support of compressed cc.json files. Files can be compressed in the analysis #848

### Changed

### Removed 🗑

### Fixed 🐞

-   Improved performance of several importers #846

### Chore 👨‍💻 👩‍💻

## [1.47.1] - 2020-05-08

### Added 🚀

### Changed

### Removed 🗑

### Fixed 🐞

-   Attribute-Side-Bar being invisible

### Chore 👨‍💻 👩‍💻

## [1.47.0] - 2020-05-02

### Added 🚀

-   When hovering over a folder, all buildings inside it will be highlighted as well #694

### Changed

-   Rename the button Show-Complete-Map button to Unfocus #642
-   Move the Unfocus button (visible when right-clicking a focused node) to the node-context-menu #948

### Removed 🗑

### Fixed 🐞

-   Generating a delta map with merged empty folders in between is now working correctly #730
-   Reduced time when opening a new file #932

### Chore 👨‍💻 👩‍💻

-   [Security] Bump jquery from 3.4.0 to 3.5.0 in /visualization #944

## [1.46.1] - 2020-04-24

### Added 🚀

-   Error dialogs in case of validation or api version issues #610

### Changed

### Removed 🗑

### Fixed 🐞

-   Improved overall rendering performance of larger maps by roughly 40% #836

### Chore 👨‍💻 👩‍💻

## [1.45.5] - 2020-04-17

### Added 🚀

-   Median symbol for aggregated relative metrics #365
-   AttributeTypes for tokeiImporter and SCMLogParser #365
-   Ellipsis button in TreeView list when hovering a node to access context menu #780
-   Show gray eye-icon next to the ellipsis-button to indicate a flattened node #780
-   Attribute Type selector in the metric dropdowns for edges and nodes

### Changed

-   Metrics with AttributeType relative are now aggregated using the median #365
-   Showing absolute number of files instead of relative number when hovering list item in TreeView #780
-   Clicking a hovered list item inside the TreeView opens folders #780
-   Color node name in gray when flattened #780

### Removed 🗑

-   Eye-icon in TreeView list to flatten a node #780
-   Option to focus a node when clicking the node name inside the TreeView #780

### Fixed 🐞

-   Consistency of AttributeTypes representation #365
-   Wrong file description for tokeiimporter
-   Improved search performance #837

### Chore 👨‍💻 👩‍💻

## [1.44.0] - 2020-03-27

### Added 🚀

-   Dialog to select between different sorting options #388
-   Button to reverse the current selected sorting #388

### Changed

### Removed 🗑

### Fixed 🐞

-   Show file selection in toolBar after excluding or hiding a node instead of an empty toolBar #896

### Chore 👨‍💻 👩‍💻

## [1.43.0] - 2020-03-20

### Added 🚀

### Changed

-   Selectable metrics will only contain metrics from the visible maps
-   Closing the attribute-side-bar by clicking somewhere in the map will now be triggered on mouse up instead of mouse down

### Removed 🗑

### Fixed 🐞

-   Search-panel opening for a short duration when importing a new file

### Chore 👨‍💻 👩‍💻

-   Fix vulnerability with nokogiri <1.10.8

## [1.42.3] - 2020-03-13

### Added 🚀

### Changed

### Removed 🗑

### Fixed 🐞

-   Loading Gif not displayed when preparing to render a new map #857
-   Selecting zero files in Multiple mode will not trigger the 3D CodeMap creation
-   Metrics in the dropdown menu now show the correct max value for the visible maps #876

### Chore 👨‍💻 👩‍💻

## [1.42.2] - 2020-02-14

### Added 🚀

### Changed

### Removed 🗑

### Fixed 🐞

-   Replaced non standard `[[` in sh scripts #849
-   Improved performance for loading a new file #836
-   Marked Packages are loaded from files #798

### Chore 👨‍💻 👩‍💻

## [1.42.1] - 2020-02-07

### Added 🚀

### Changed

### Removed 🗑

### Fixed 🐞

-   GC Overhead Limit (OutOfMemory Exception) during analysis of large SCMLogs fixed #845

### Chore 👨‍💻 👩‍💻

## [1.42.0] - 2020-01-31

### Added 🚀

-   Support for camel and kebab-case for ccsh arguments #772
-   RawTextParser for analysis #660
-   IndentationLevel as metric for RawTextParser #660
-   Show additional Pairing Rate of Selected Building, simultaneously to the currently hovered Buildings #736

### Changed

-   Options of the ccsh are now consistently in kebab-case #772

### Removed 🗑

### Fixed 🐞

-   Path prefix handling in tokeiimporter #841

### Chore 👨‍💻 👩‍💻

## [1.41.8] - 2020-01-17

### Added 🚀

### Changed

### Removed 🗑

-   Project name parameters in the ccsh #773

### Fixed 🐞

### Chore 👨‍💻 👩‍💻

## [1.41.6] - 2020-01-10

### Added 🚀

### Changed

### Removed 🗑

### Fixed 🐞

-   Deployment

### Chore 👨‍💻 👩‍💻

## [1.41.1] - 2020-01-10

### Added 🚀

### Changed

### Removed 🗑

### Fixed 🐞

-   Performance of loading maps with edges improved #823
-   Calculation of other Group for fileExtensionBar #768
-   Remove focus of UI elements when they are not visible anymore

### Chore 👨‍💻 👩‍💻

## [1.41.0] - 2019-12-06

### Added 🚀

-   Show the relative number of files a folder includes compared to the project in the TreeView #380
-   Show the number of files a folder includes in the TreeView when hovering #380
-   When the File Extension Bar is hovered, all buildings corresponding to that extension are highlighted #545
-   Toggle between percentage and absolute values when clicking the file extension details section #545
-   Sum hovered delta values for folders #781

### Changed

### Removed 🗑

### Fixed 🐞

### Chore 👨‍💻 👩‍💻

## [1.40.0] - 2019-11-22

### Added 🚀

### Changed

-   Replaced Blacklist Hide with Flatten option #691
-   Flattened buildings are not hidden by default #691

### Removed 🗑

### Fixed 🐞

### Chore 👨‍💻 👩‍💻

-   Bump @types/three from 0.89.12 to 0.103.2 in /visualization #453
-   Bump angularjs-slider from 6.5.1 to 7.0.0 in /visualization #454
-   Bump webpack from 3.12.0 to 4.41.2 in /visualization #436
-   [Security] Bump angular from 1.7.7 to 1.7.9 in /visualization #800

## [1.39.0] - 2019-11-15

### Added

-   Progress indicator for SonarImporter #544

### Changed

-   New style for hovered metric values #696
-   Redesigned slider labels in ribbonBar sections #696
-   Shortened ribbonBar sections #696

### Removed

### Fixed

-   Missing pictures and broken links in docs #785
-   SCMLogParser is now more resilient to unusual SVN commit messages #763

### Chore

## [1.38.1] - 2019-11-13

### Added

-   New github-pages https://maibornwolff.github.io/codecharta/

### Changed

### Removed

### Fixed

-   Sum symbol for hovered metric values only shows for folders #775

### Chore

## [1.38.0] - 2019-11-08

### Added

-   Temporal coupling edges generated by SCMLogParser #622

### Changed

-   Downloaded files are no longer formatted #679
-   Added highly and median coupled files metrics to non-churn metric list of SCMLogParser #622
-   Moved nodePathPanel to toolBar and updated style #607

### Removed

### Fixed

-   Removed attributes from downloaded files that should not be there #679

### Chore

## [1.37.0] - 2019-10-25

### Added

-   Sidebar with information regarding the selected building #527
-   Sidebar closes when selected buildings is excluded #748

### Changed

-   Animation to show or hide the legend panel #527

### Removed

-   Expandable detail panel in lower left corner #527
-   Removed option to maximize/minimize detail panel #527

### Fixed

-   Autofocus and label size for focused nodes #747
-   Selected buildings stays selected when settings are changed #748
-   IllegalStateException when scanning single file in SourceCodeParser #573
-   SourceCodeParser places files in the project root correctly into the hierarchy #574

### Chore

## [1.36.0] - 2019-10-18

### Added

### Changed

-   Open and close the ribbonBar sections independently with an updated animation

### Removed

### Fixed

-   Camera is now resetted correctly, when unfocusing #634
-   Inputs of Color Range Slider now waits a second before it commits its values #676
-   Fixed root folder name in TreeView after new map after loading new map #649
-   Increased size of ribbonBar for big screens #644
-   File-Extension-Bar will not display excluded nodes anymore #725
-   Sanitize input for shelljs #600

### Chore

-   Bump jacoco from 0.8.1 to 0.8.4 in /analysis

## [1.35.0] - 2019-10-04

### Added

-   Checkbox in global Settings for disabling camera reset, when new map is loaded #685
-   Pipe support for SourceCodeParser #716
-   Pipe support for SCMLogParser #717
-   Pipe support for SonarImporter #715

### Changed

### Removed

### Fixed

-   Exclude and Hide options are disabled for empty and already existing search patterns #654

### Chore

## [1.34.0] - 2019-09-20

### Added

-   Tokei Importer #538
-   Prominent Notice that we use Sonar-jar #713

### Changed

### Removed

### Fixed

### Chore

-   Bump kotlin-reflect from 1.3.41 to 1.3.50 in /analysis
-   Bump json from 20180813 to 20190722 in /analysis
-   Bump rxjava from 2.2.9 to 2.2.12 in /analysis
-   Bump assertj-core from 3.12.2 to 3.13.2 in /analysis
-   Bump sonar-java-plugin from 5.12.1.17771 to 5.14.0.18788 in /analysis

## [1.33.0] - 2019-09-10

### Added

-   Edge Previews (Palm-Tree-Effect) #529
-   Dropdown to select Edge Metric, including Edge Counter #529
-   Edge Metric settings for Edge Height, Number of Previews & show only building with Edges #529

### Changed

-   Edge Visualization to better distinguish between incoming and outgoing edges #529
-   Distribution metric is by default the same as area metric #689
-   MapTreeView below searchBar opens the first level by default #690
-   Focus metric search when opening metricChooser #693

### Removed

-   Edge Options in Context menu #529

### Fixed

-   SourceCodeParser now skips custom metrics for files, if the syntax tree cannot be created
-   Nodes with color metric equals 0 are colored correct again #677

### Chore

-   [Security] Bump mixin-deep from 1.3.1 to 1.3.2 in /visualization

## [1.32.0] - 2019-08-09

### Added

-   Search for metrics and an indicator for the highest value in dropdown #575
-   Button to enable PresentationMode that uses Flashlight-Hovering #576
-   Clarifying information which file is which in the file bar when in delta mode #615

### Changed

-   Replaced Scenario dropdown with button on the left of the metric sections #628

### Removed

### Fixed

### Chore

## [1.31.0] - 2019-08-02

### Added

-   New Metric in SourceCodeParser: Maximum-Nesting-Level #659

### Changed

### Removed

### Fixed

-   Label hight adjustment now matches scaling of map #594
-   SCMLogParser now guesses the input file encoding #614

### Chore

## [1.30.0] - 2019-07-26

### Added

-   New Search Bar #526
-   Number of Renames Metric to SCMLogParser #621
-   Age In Weeks Metric for SCMLogParser #620

### Changed

-   ToolBar now shows partially cut-off controls if the window is too small #582
-   Position of the legendPanel was moved to the bottom-right corner #633
-   RibbonBar only opens the three metric section
-   Moved Scenario-select to the right in order to use less space
-   Moved loading-gif from ribbonBar to toolBar

### Removed

-   RibbonBar toggle button

### Fixed

-   FileExtensionBar height to not show a bottom-margin in Chrome
-   PointerEvents not being propagated when RibbonBar was extended
-   Reduced memory usage of SCMLogParser to avoid OutOfMemory Exception #631

### Chore

-   [Security] Bump lodash.mergewith from 4.6.1 to 4.6.2 in /visualization
-   [Security] Bump lodash from 4.17.11 to 4.17.13 in /visualization
-   [Security] Bump fstream from 1.0.11 to 1.0.12 in /visualization

## [1.29.0] - 2019-07-12

### Added

### Changed

-   Moved Button to reset the map to the center next to the view-cube #606
-   Moved FileExtensionBar #527

### Removed

-   Burger Menu / SideNav #526

### Fixed

-   Colors in File-Extension-Bar will be displayed in MS Edge and Standlone now #584

### Chore

## [1.28.0] - 2019-06-28

### Added

-   Releasing will now remind the developer to manually add the release notes #533
-   StructureModifier to remove and move nodes and set root of projects #547 / #181

### Changed

-   More informative log messages regarding the success of project merging #547

### Removed

-   Release Notes are not generated and added automatically to a release #533

### Fixed

-   Margin will now be set correctly depending on whether dynamicMargin is enabled or not #602

### Chore

## [1.27.0] - 2019-06-25

### Added

-   Automatically generates release notes from changelog and appends it to release #533
-   Adds global settings-menu with settings from options panel and weblinks #528

### Changed

-   Moved File Settings from Ribbon Bar to new File Setting Bar #525
-   Rename sample file codemap-nodes #587
-   Hide checkbox to select white-positive-buildings in delta state #345

### Removed

-   Removes Options panel from sidebar #528
-   Removes Weblinks panel from sidebar #528
-   Removed URL-parameter info from sidebar #525

### Fixed

-   Unary Metric will no longer be auto-selected when a new map is loaded #579

### Chore

## [1.26.0] - 2019-06-14

### Added

-   FileExtensionBar to show file-distribution of chosen metric #495
-   sum icon is now displayed on the left of the metric value #364
-   Added Pop-up dialog before downloading file to set filename and see what data will be stored #523

### Changed

### Removed

### Fixed

-   Fix set default ColorRange when resetting color section #560

### Chore

## [1.25.1] - 2019-05-30

### Added

-   SVN log parser keeps track of renaming of files for metric calculation #542

### Changed

### Removed

### Fixed

-   Entries with renaming information in SVN logs are attributed to correct file #542
-   Unary metric will no longer be removed from the MetricChooser-Dropdown when a folder was excluded or hidden #548
-   Changing margin and then file or mode will no longer freeze the application #524

### Chore

-   [Security] Bump tar from 2.2.1 to 2.2.2 in /visualization

## [1.25.0] - 2019-05-17

### Added

-   Added SonarJava to Source code parser #343
-   Added exclude and defaultExclude options to SourceCodeParser #508
-   Show loading-gif in ribbonBar when rerendering map

### Changed

-   Using Sonar Plugins for Source code parser, giving the Sonar Metrics #343
-   Use debounced settings update instead of throttled
-   Filename of downloaded file now contains time #484

### Removed

### Fixed

-   Fixed issue with too long line in ccsh.bat #506
-   Prevent downloaded files from having multiple Timestamps #484
-   Do not show loadingGif when cancelling the fileChooser #498
-   Excluding a building now updates the maximum value of colorRange #355

### Chore

-   Bump angular-material from 1.1.9 to 1.1.14 in /visualization
-   [Security] Bump jquery from 3.3.1 to 3.4.0 in /visualization

## [1.24.0] - 2019-04-23

### Added

### Changed

### Removed

-   Settings as URL parameters #470

### Fixed

-   Fixed issue with trailing slash in URL parameter of SonarImporter #356

### Chore

-   Bump d3 from 4.13.0 to 5.9.2 in /visualization
-   Bump sinon from 4.5.0 to 7.3.1 in /visualization

## [1.23.0] - 2019-03-22

### Added

-   Project Name can be specified for merge filter #394

### Changed

-   Throw a MergeException if project names do not match in MergeFilter #394

### Removed

### Fixed

-   Excluded buildings are no longer used for aggregated metric calculation #352

### Chore

-   Bump browser-sync-webpack-plugin from 1.2.0 to 2.2.2 in /visualization
-   Bump @types/node from 8.10.19 to 11.11.3 in /visualization
-   Bump html-webpack-plugin from 2.30.1 to 3.2.0 in /visualization
-   Bump load-grunt-tasks from 3.5.2 to 4.0.0 in /visualization #444
-   Bump ajv from 5.5.2 to 6.10.0 in /visualization #447
-   Bump resolve-url-loader from 2.3.0 to 3.0.1 in /visualization #448

## [1.22.0] - 2019-03-15

### Added

-   Added buttons to select all/none/inversion of revisions/maps in multiple mode #391
-   Merge filter can merge all files of folders #392

### Changed

### Removed

### Fixed

-   Fixed bug that code map was not re-loaded when changing from multiple to single revision mode #396
-   Fixed missing apiVersion in aggregated map #398
-   Input Fields of color sliders adjust width according to content #409

### Chore

-   Bump nouislider from 11.1.0 to 13.1.1 in /visualization
-   Bump typescript from 2.7.2 to 3.3.3333 in /visualization
-   Bump @types/d3 from 4.13.0 to 5.7.1 in /visualization

## [1.21.2] - 2019-02-26

### Added

-   When entering Multiple Mode, all Maps/revisions are preselected

### Changed

### Removed

### Fixed

-   Fixing non-existent metric aggregation on root-level when using multiple Files

## [1.21.1] - 2019-02-22

### Added

-   Hovering a node in the map also hovers it in the tree view #351

### Changed

### Removed

### Fixed

-   Fixing sync between treeview hovering and map hovering #351
-   Folders can no longer be colored in the CodeMap or TreeView #359

## [1.21.0] - 2019-02-16

### Added

-   Color searched node names green in TreeView #225
-   Add option buttons (three dots) in TreeViewSearch to `Hide` or `Exclude` matching nodes #298
-   Show blacklist entry counter in blacklistPanel header #298
-   Option checkbox 'Hide Flattened Buildings' #225
-   Hide/Flatten non-searched buildings #225
-   Hide/Flatten all buildings, if searchPattern can't find any matching nodes #225
-   Show maxValue of each metric in metricChooser select list #204
-   Colored color-slider inside the RibbonBar #318
-   Option to color positive buildings white #311
-   Clicking the ribbonBar section-titles toggles the ribbonBar #324
-   View-Cube displayed in top right corner #274
-   Adding prettier formatter
-   Adapt colorRange when changing colorMetric #330

### Changed

-   Update TreeView filter with search field #225
-   Use 'gitignore' style matching in TreeViewSearch #225
-   Reorder `Focus`, `Hide` and `Exclude` buttons in nodeContextMenu #298
-   Reorder sidebarPanels (BlacklistPanel beneath TreeViewSearchPanel) #298
-   Use `fa-ban`-icon as symbols for blacklistPanel (instead of `fa-list`) #298
-   Use `fa-ban`-icon as symbols for blacklistType `Exclude` (instead of `fa-times`) #298
-   Label size keeps readable for large maps or a high distance between camera and map #237
-   updated dependencies to fix vulnerabilities
-   Scenarios only update settings which exist in Scenario and not all #224
-   MergeFilter to merge unique blacklist entries #275
-   MergeFilter to only merge unique attributeType entries #275

### Removed

-   Remove invertHeight checkbox in delta-view #306
-   Remove option to add blacklist entries from inside the blacklistPanel #298
-   Remove statistic functions in Experimental panel #308

### Fixed

-   CodeMap does not move anymore when navigating in text-fields #307
-   Merge blacklist in multipleFile view and convert paths #275
-   Show logo in NW.js standalone application #233

## [1.20.1] - 2018-12-19

### Added

### Changed

### Removed

### Fixed

## [1.20.0] - 2018-12-19

### Added

-   button to unfocus node
-   NodeContextMenu: Option to only hide dependent edges
-   plop support

### Changed

-   Renaming 'isolate node' to 'focus node'
-   Focusing a node does not remove the blacklist items of type Hide

### Removed

-   NodeContextMenu: Option to 'show all' nodes, which used to unhide all nodes

### Fixed

-   Reshow hidden nodes from Treeview or Blacklist

## [1.19.0] - 2018-11-02

### Added

-   Deleted files in delta view use their previous area value in order to be visible #254

### Changed

### Removed

### Fixed

-   Buildings in the delta view are not colored correctly #253
-   Reset Button in RibbonBar to reset 'Invert Colors' #255
-   Remove lag of 'Invert Color' checkboxes, when selecting single/delta mode #255

## [1.18.1] - 2018-10-31

### Added

### Changed

### Removed

### Fixed

## [1.18.0] - 2018-10-29

### Added

-   Integration with Jasome through JasomeImporter #245
-   URL parameter 'mode' with the values Single, Multiple or Delta
-   Blacklist to persist excluded or hidden nodes #205
-   Option to exclude nodes in nodeContextMenu #205
-   BlacklistPanel in SettingsSidebar to manage blacklist #205
-   Save-Button to download current CodeMap #205
-   Publishing visualization on Docker Hub #252

### Changed

-   No longer fat jar of every subcomponent of analysis, baked into ccsh
-   Changed simple syserr write to logger call for analysis #243

### Removed

-   URL parameter 'delta' does not exist anymore

### Fixed

-   Show delta of CodeMap when URL parameter mode=delta is set

## [1.17.0] - 2018-09-28

### Added

### Changed

-   Invert delta colors moved from color to heigh metric column in ribbon bar #220
-   Delta value now as kindOfMap shown #220
-   Aggreate maps as multiple rename #220

### Removed

### Fixed

-   Single/delta buttons now correctly activated when delta in ulr shown #220

## [1.17.0] - 2018-09-21

### Added

-   CodeMaatImport for temporal coupling dependencies #172
-   EdgeFilter to aggregate edge-attributes as node-attributes #222
-   Option to show and hide dependent edges from node-context-menu #218

### Changed

-   MergeFilter merges edges #172

### Removed

### Fixed

## [1.16.2] - 2018-09-10

### Added

### Changed

### Removed

### Fixed

-   missing event in firefox #232

## [1.16.1] - 2018-08-31

### Added

-   gitlab + dotnet manual

### Changed

### Removed

### Fixed

## [1.16.0] - 2018-08-31

### Added

-   add the option to add multiple files via url parameter (e.g. ?file=a&file=b...)

### Changed

### Removed

### Fixed

## [1.15.1] - 2018-08-13

### Added

### Changed

### Removed

### Fixed

## [1.15.0] - 2018-08-13

### Added

-   e2e tests are running in CI Environment (headless)
-   pupeteer as e2e test framework
-   Show names of marked packages in legend
-   Added a source code importer that can analyse rloc,mcc for java source code
-   keep settings when the user changes a file
-   Added option to set white background

### Changed

### Removed

-   cypress

### Fixed

## [1.14.2] - 2018-07-16

### Added

### Changed

-   Changed folder detail metrics from mean to sum

### Removed

### Fixed

## [1.14.1] - 2018-07-13

### Added

### Changed

### Removed

### Fixed

## [1.14.0] - 2018-07-13

### Added

-   Added UnderstandImporter to Analysis
-   Packages can be highlighted in different colors #152
-   Adding a context menu with highlighting colors and convenience methods for the tree view and 3D view #155
-   Folders and files to highlight can be described in the cc.json #165
-   Dynamic/automatic margin computing de/activated by tick

### Changed

-   Details panel: using the sum of the childrens metrics instead of the mean value

### Removed

### Fixed

-   Display buttons do not trigger map changes #185
-   Flickering surfaces when zooming out

## [1.13.0] - 2018-06-08

### Added

-   Layout switcher #141
-   Added CrococosmoImporter to Analysis
-   Added type, dirs, name to CSVExporter
-   Invert height of building checkbox
-   Aggregate multiple maps in visualization #110
-   Auto Focus selected map part
-   Timmer added to applySettings in SettingsService

### Changed

-   Crococosmo xml files will now generate a cc.json file for each version
-   Suppressing ARIA warnings
-   Simplified gradle structure of analysis part
-   Deltas added in the metric quick access panel #138
-   Ticks and ResetValue Buttons call to onSettingsChange to avoid applySettings timer
-   compacting empty middle packages #150
-   Detail panel minimized by default

### Removed

### Fixed

-   filter by regex shows parent nodes #116
-   typo in scss file

## [1.12.0] - 2018-04-27

### Added

-   horizontal quick access metric chooser
-   Link behind filepath in detailPanel #84
-   Double click event-handler on Buildings #84
-   Detail Panel can be minimized and maximized
-   Settings option to minimize Detail Panel
-   cypress as an e2e test runner

### Changed

### Removed

-   metric details from legend
-   metric chooser from settings panel

### Fixed

## [1.11.2] - 2018-04-13

### Added

### Changed

### Removed

### Fixed

-   a sonar importer bug which prevented the importer to fetch the last page #122

## [1.11.1] - 2018-04-11

### Added

### Changed

### Removed

### Fixed

## [1.11.0] - 2018-04-11

### Added

-   SASS support
-   simple regex filter
-   Reset Button
-   Dialog Service replaces console log calls and window.alert calls
-   linking tree view and map hover
-   auto fit scene button
-   anugularJS material
-   Scenarios are now filtered by compatibility for the given map
-   Link in visualization #84

### Changed

### Removed

-   materialize-css
-   grunt

### Fixed

-   less flickering and artifacts

## [1.10.0] - 2018-03-22

### Added

### Changed

-   Clean up UI #86
-   Updated analysis dependencies

### Removed

### Fixed

-   Delta View shows Deltas of itself as non-trivial if nodes have same name #89: Compare deltas by path not name
-   Delta calculation performance boost #91
-   Problems when intermediate nodes missed metrics #92
-   removed unnecessary calculations
-   removed bug in SonarImporter that slowed up performance and missed out multiple metrics
-   minor bugs

## [1.9.3] - 2018-02-23

### Added

### Changed

-   sorting treeview by folders and names

### Removed

### Fixed

## [1.9.2] - 2018-02-20

### Added

-   added preliminary CSVExporter for visualisation data

### Changed

-   padding rendering
-   minimal building height is 1 to prevent clipping issues
-   fallback values for visualization when no metric is available (area = 1, height = 1, color = grey). Data in data structure will not be changed.

### Removed

### Fixed

## [1.9.1] - 2018-02-20

### Added

### Changed

### Removed

### Fixed

-   detail panel bug fix

## [1.9.0] - 2018-02-20

### Added

### Changed

-   moved to unscoped npm packages

### Removed

### Fixed

## [1.8.2] - 2018-02-20

### Added

### Changed

-   detail panel background is white now. better visibility

### Removed

### Fixed

## [1.8.1] - 2018-02-20

### Added

### Changed

-   revision chooser moved to settings panel and uses now understandable dropdowns instead of links. Part of the #82 proposals

### Removed

### Fixed

## [1.8.0] - 2018-02-20

### Added

-   Experimental dependency support
-   loading indicator
-   file path to detail panel
-   collapsible tree view and visibility/isolation per node toggles

### Changed

-   added a ray-aabb intersection test before precise testing. Less time is spent in intersection methods.

### Removed

### Fixed

-   fixed a minor bug
-   canvas mouse event listener are now limited to the canvas dom element. UI events will not trigger the canvas listeners anymore
-   canvas mouse events distinguish now between click and drag. Dragging does not reset selection anymore
-   slider input #64
-   rz slider initialization bug
-   increasing test coverage
-   deltas where calculated on map loading even though, they were disabled

## [1.7.2] - 2018-02-02

### Added

### Changed

### Removed

### Fixed

-   url to homepage
-   analysis package

## [1.7.1] - 2018-02-02

### Added

### Changed

### Removed

### Fixed

## [1.7.0] - 2018-02-02

### Added

### Changed

-   npm pachage scoped to @maibornwolff
-   Defined further scenarios via json file
-   Added description for metrics and scenarios
-   using fixed point values in detail panel (ui) to truncate infinite or long decimals
-   folders now use the mean attributes of their buildings(leaves)

### Removed

### Fixed

-   Bugfix: detail panel should be cleared before setting new details else old values may survive

## [1.6.7] - 2018-02-01

### Added

### Changed

### Removed

### Fixed

## [1.6.6] - 2018-02-01

### Added

-   added anonymous git log generator anongit
-   browser demo shows codecharta-visualization sonar analysis

### Changed

-   rewrote command line interface
-   linking ccsh to bin/ccsh will be deleted later

### Removed

### Fixed

-   No underscore for scenarios in tooltips #71

## [1.6.5] - 2018-01-30

### Added

### Changed

### Removed

### Fixed

## [1.6.4] - 2018-01-30

### Added

### Changed

### Removed

### Fixed

-   fixed broken SonarImporter due to jdk9 migration

## [1.6.3] - 2018-01-26

### Added

-   added npm publish for analysis
-   simple release script for automatic changelog updates, commits, tags, version bumps

### Changed

### Removed

### Fixed

## [1.6.2] - 2018-01-25

### Added

-   added support for git log --raw and git log --numstat --raw
-   added support for git log --numstat and codechurn
-   added support for renames in SCMLogParser for git log --name-status
-   added support for renames in SCMLogParser for git log --numstat, git log --raw and git log --numstat --raw
-   added new SCM experimental metrics range_of_weeks_with_commits and successive_weeks_of_commits
-   the file origin of a node is displayed in the details now
-   sonarqube analysis on CI build
-   npm publish support in visualization

### Changed

-   Deltas are no longer experimental
-   two selected delta maps now merge their nodes correctly. The map where
    a node was missing get's a copy of this node with metrics=0.
    File additions/deletions are therefore only visible when areaMetric is
    unary and deltas are activated.

### Removed

### Fixed

-   delta display bug for heights
-   going back from delta view now correctly removes deltas from node data
-   Delta shown although not in delta mode #60
-   Allow inversion of delta colors #57
-   npm binary error

## [1.5.2] - 2018-01-04

### Added

### Changed

-   scaling slider now has steps of 0.1. This allows the user to select precise values like 2.0
-   updated jdk to jdk9

### Removed

### Fixed

-   Opening the same file a second time does not work #53
-   added missing require declaration
-   added glsl loader in testing environment
-   Native Application support is bugged while building in Travis CI #48

## [1.5.1] - 2017-11-14

### Added

-   command line parameter to toggle "authors" attribute in SCMLogParser

### Changed

### Removed

### Fixed

-   when passing a file through the "file" parameter in the URL, the map now renders correctly

## [1.5.0] - 2017-10-24

### Added

-   experimental delta functionality
-   loading multiple maps
-   experimental margin slider

### Changed

-   faster rendering

### Removed

-   nwjs packages and native apps due to a bug

### Fixed

-   using color metric instead of height metric for color range slider ceil

## [1.4.0] - 2017-09-14

### Added

-   Typescript support
-   Browsersync
-   added advanced merging strategy "leaf" in MergeFilter
-   advanced merging with restructuring

### Changed

-   Browserify replaced with Webpack
-   Better debugging
-   Karma instead of Mocha

### Removed

### Fixed

## [1.3.2] - 2017-08-18

### Added

-   add slider controls for color thresholds #19
-   Added additional structuring in SonarImporter for multi-module projects
-   button to generate current url parameters
-   camera position is now a setting (e.g. in scenarios or url parameters)
-   margin slider: make it easier to find out to which package/folder a class belongs #20

### Changed

-   better url parameter resolution (nested parameters are handled correctly)
-   changed hover color. Allows better distinction between hover and select

### Removed

-   obsolete helper grid

### Fixed

-   changing display or color settings resets scaling #18
-   scenario description #32
-   Scaling should not scale the labels #35

## [1.3.1] - 2017-07-05

### Added

### Changed

### Removed

### Fixed

-   Prevented override of URL-parameters by default scenario

## [1.3.0] - 2017-07-05

### Added

-   Adding simple merge functionality for multiple json files
-   Added CSVImporter
-   Added Translation for SonarQube metrics
-   Added descriptions for metrics

### Changed

-   Changed uppercase metrics, e.g. RLOC, to lowercase metrics

### Removed

### Fixed

-   Simple cc.json does not display anything #17

## [1.2.0] - 2017-06-19

### Added

-   Adding Labels and UI
-   Support for links to source page of SonarQube in sonarimporter
-   Added SCMLogParser

### Changed

### Removed

### Fixed

-   GitHub Issue: legend is wrong #21

## [1.1.5] - 2017-05-31

### Fixed

-   Wrong version numbers in analysis part

## [1.1.4] - 2017-05-26

### Added

-   Scenarios and default scenario
-   Translation API for Metrics
-   Metric tooltips in dropdown

### Fixed

-   GitHub Issue: Sonarimporter crashes with null pointer exception when there is a component without path. #13

## [1.1.3] - 2017-05-01

### Added

-   Support for SonarQube Measures-API
-   Error logging for sonarqube errors

### Changed

-   Standard Sonar metric is now complexity,ncloc,functions,duplicated_lines,classes,blocker_violations,generated_lines,bugs,commented_out_code_lines,lines,violations,comment_lines,duplicated_blocks

## [1.1.2] - 2017-04-28

### Added

-   Translation API for Metrics

## [1.1.1] - 2017-04-07

### Fixed

-   GitHub Issue: Flickering surfaces #3
-   GitHub Issue: Unable to install due to readlink error on macOS #4

## [1.1.0] - 2017-03-27

### Added

-   SourceMonitorImporter for importing projects from SourceMonitor.

## [1.0.0] - 2017-03-17

### Added

-   SonarImporter for importing projects from SonarQube.
-   ValidationTool for validating an existing json file.
