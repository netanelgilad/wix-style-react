# Cheatsheet Contribution


## Cheatsheet Files

```
stories/Introduction/Cheatsheet
├── ComponentsCheatsheet.js                 # entry file for Cheatsheet
├── sharedComponents                        # shared layout UI elements
│   ├── ComponentNaming.js                  # Symbol & Components used for this symbol
│   ├── ComponentsNames.js                  # Components list
│   ├── FamilyStructure.js                  # Family display. All Symbols and Components per family type
│   ├── NotDefined.js                       # Used for a symbol that was not defined
│   ├── NotDeveloped.js                     # Used for a symbol that was not developed
│   ├── Preview.js                          # Used to display a preview of a component when a grey background is needed
│   ├── SingleComponentSideBySide.js        # Used to display the index name & preview of the symbol side by side
│   ├── SingleComponentStacked.js           # Used to display the index name & preview of the symbol stacked
│   ├── SymbolName.js                       # Symbol Name
│   ├── constants.js
│   ├── index.js
│   └── utils.js                            # Utils for UI elements
└── componentsFamilies                      # Display of each family Components & Symbols
    ├── LayoutFamily
    ├── ButtonFamily.js
    ├── ContentWidgetsFamily.js
    ├── FoundationFamily.js
    ├── InputFamily.js
    ├── ModalFamily.js
    ├── NavigationFamily.js
    ├── NotificationFamily.js
    ├── OtherFamily.js
    ├── PickerFamily.js
    ├── SelectionFamily.js
    └── TooltipFamily.js

```

## Symbol to Components mapping Files

```
stories/symbolsComponentsMapping
├── components.js                           # List of all Components per family
├── symbols.js                              # List of all symbols groups & symbols per family
├── storybookMapping.js                     # Components & Symbols actual URLs mapping
└── families                                # List of all components per symbol divided by family type (Symbol ==> Components per symbol)
    ├── buttonsFamily.js
    ├── contentWidgetsFamily.js
    ├── foundationFamily.js
    ├── inputsFamily.js
    ├── layoutFamily.js
    ├── modalsFamily.js
    ├── navigationFamily.js
    ├── notificationsFamily.js
    ├── otherFamily.js
    ├── pickerFamily.js
    ├── selectionFamily.js
    └── tooltipPopoverFamily.js

```
