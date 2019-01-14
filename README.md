# Protractor Start

do these steps: 
1.  npm run webdriver-update
2.  npm run build
3.  npm run test

That should do the trick.... normally

How to use:

package.json:
    Here we declare all the scripts like the above. 
    These files link towards the projectFiles/config/*.ts files
    npm run test => projectFiles/config/config-test.ts

ProjectFiles:
config files:
    the specs: are used to talk to the features. Which features should we run? 
    cucumberOpts: which files are used to execute the features
    (the hooks are used for easy switch between dev - prod - local)

features:
    Here we declare cucumber features: for easy human readable

pages:
    BasePage.ts: All methods combined for re-usage
    page object / page

stepDefinitions:
    Let the features speak to the page objects
    use await, otherwise you will get errors :/ 

support: Generation of reports and screenshots and so on
    hooks: Used to declare what happens before every test, all test and also after. 

typeScript: 
    This file is created automatic, it's a conversion from typeScript to JavaScript (Not needed to touch)

Utils:
    Here you can put files for usage through the project
