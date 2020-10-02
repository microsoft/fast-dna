#!/bin/bash

: 'AZURE FAST PRODUCTION => DELETION
This will delete all resources within a region
'

# CONFIGURATION
    source ./config.sh

# LAUNCH
    setTitle "Delete Resources"

## SHELL Arguments
source inputs.sh --debug true --product $product --subscription $subscription --location $location --resource-group $resource_group

## DELETE Services
source $dir/services/delete-rg.sh & wait $!