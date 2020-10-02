#!/bin/bash
## Accepting parameters by $1, $2, etc

function debugPrint() {

    if [[ $debug == true ]];
    then
        echo "debugging on"
    else
        echo "debuging off"
    fi

}

function getSubscription() {
    source inputs.sh --debug false --subscription $subscription
}

function setApplication() {
    if [ -z "$application" ];
    then
        echo "Select an ${bold}${green}Application${reset}:"    
        select application in ${applications[@]}
        do
            case $application in
                app | color | create | explore | motion | www)
                    source inputs.sh -a $application
                    break ;;
                exit)
                    echo "${bold}${green}cancelled.${reset}" 
                    exit ;;
                *)
                    echo "${red}invalid entry, try again${reset}" ;;
            esac
        done
    fi
}

function setEnvironment() {
    if [ -z "$environment" ];
    then
        echo "Select an ${bold}${green}Environment${reset}:"
        select environment in ${environments[@]}
        do
            case $environment in
                production | development)
                    source inputs.sh -e $environment -s $environment 
                    break ;;
                staging)
                    source inputs.sh -e $environment -s production
                    break ;;
                exit)
                    echo "${bold}${green}cancelled.${reset}" 
                    exit ;;
                *)
                    echo "${red}invalid entry, try again${reset}" ;;
            esac
        done
    fi
}

function setRegion() {
    if [ -z "$region" ];
    then
        echo "Select an ${bold}${green}Region${reset}:"    
        select region in ${regions[@]}
        do
            case $region in
                westus | eastus)  
                    resource_group=fast-$region-rg
                    source inputs.sh -r $region -rg $resource_group
                    break ;;
                centralus)  
                    resource_group=fast-ops-rg
                    source inputs.sh -r $region -rg $resource_group
                    break ;;
                exit)
                    echo "${bold}${green}cancelled.${reset}" 
                    exit ;;
                *)
                    echo "${red}invalid entry, try again${reset}" ;;
            esac
        done
    fi
}

function setTitle() {
    echo "${green}Starting to ${bold}$1${reset} ${green}now ...${reset}"

}

