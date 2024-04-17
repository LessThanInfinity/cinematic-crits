# Cinematic Crits

This module is a very wip, very simple attempt to display a short gif whenever a critical success is rolled. Currently meant for a specific campaign.

Currently, it is very static/manual/rigid. Future iterations should bring more customizability.

## Module Requirements

Hard dependencies on:

### Scene Transitions

["Scene Transitions"](https://github.com/p4535992/foundryvtt-scene-transitions) is a hard dependancy for this version of the module.

This also only works for the PF2e game system as of now.

## How to use

You will need to do some manual prep for this. We're assuming that you already have a set of gifs that you want to display when a crit happens.

1. Under your Data folder, create a directory "upload". Under "upload", create a directory "Images". Under Images, create a directory "Crit". Basically you need to create the directory: ".../Data/upload/Images/Crit
2. In this Crit directory, add the gifs you want to play when the crit happens.
3. Name each gif after the actor that you want to display the crit for. For example, if you have an actor named "Saylor Twift", your gif must be named "saylor_twift.gif". It should be snakecase, with all lowercase letters.

That should be it for now - now just test it with a crit!

(easiest way is to create a actor that has 1 AC and then just attack it with ANY weapon.)
