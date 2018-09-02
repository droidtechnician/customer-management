#!/bin/bash

git status
ng build --prod --base-href "https://droidtechnician.github.io/customer-management/"
npx ngh --dir dist/Angular-Sample --no-silent --branch=master