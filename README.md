# p a d s e e k

![GitHub version](https://img.shields.io/badge/version-beta-red.svg) ![GitHub last commit](https://img.shields.io/github/last-commit/AaronChapman/padseek.svg)

![GitHub forks](https://img.shields.io/github/forks/AaronChapman/padseek.svg?style=social&label=Fork) ![GitHub followers](https://img.shields.io/github/followers/AaronChapman.svg?style=social&label=Follow)

>padseek is a module-based drum sequencer made with love and javascript. this is an ongoing project, so it might be wonky here and there, but please feel free to check back in for more features and add-ons!

**`how to operate`**

- choose a tempo for your sequence via the 'tempo (beats per minute)' field inside of the 'sequence controls' module
- activate your selected pad pieces inside the 'drum pad' module (optionally: duplicate existing pads)
- choose the drum samples that fit your sequence through the 'sample selection' module
- press 'play sequence' or 'pause sequence' to do exactly what that says
- see modules below

>click "what is this?" in the bottom left corner of padseek for a visual walkthrough

![walkthrough](images/README/walkthrough.png "walkthrough")

**`keyboard shortcuts`**

key | shortcut
--- | ---
`[ c ]` | open / close shortcuts menu
`[ p ]` | play / pause sequence
`[ x ]` | clear pad piece selections
`[ z ]` | randomize sequence
`[ m ]` | share current sequence
`[ j ]` | copy sequence JSON to clipboard
`[ t ]` | calculate tempo
`[ r ]` | reset calculated tempo
`[ s ]` | set sequence tempo

---
## sequence controls

visual | how to operate
--- | ---
![controls module](images/README/controls.png "controls module") | **`play / pause sequence:`**<br/> • • this button allows you to control whether or not the sequence is running<br/><br/>**`clear selections:`**<br/> • • this button will reset all of the pad piece selections you've made<br/><br/>**`tempo (beats per minute):`**<br/> • • this field controls the speed at which your drum sequence will run<br/> • • you can enter a tempo value, or calculate and set one using the keyboard shortcuts outlined in the tempo module

## sample selection

visual | how to operate
--- | ---
![sample selection module](images/README/samples.png "sample selection module") | **`drum sample options:`**<br/> • • each row of this module houses a different set of drum samples for you to choose from<br/> • • you can make your sample selections at anytime during the sequence<br/><br/>**`sample sampler:`**<br/> • • clicking on the '▶' icon will play the currently selected option for that sample type
![sample swapper](images/README/swapper.png "sample swapper") | **`sample swapper:`**<br/> • • clicking on the '⏣' icon will allow you to swap that row's sample type with a new one


## drum pads

visual | how to operate
--- | ---
![drum pad module](images/README/pad.png "drum pad module") | **`duplicate pad:`**<br/> • • this button will duplicate the pad beneath it directly in front of it (the maximum sequence size is 32 pads)<br/><br/>**`remove pad:`**<br/> • • this button will remove the pad beneath it<br/><br/>**`pad pieces:`**<br/> • • activating a pad piece will result in that piece's row triggering the selected sample<br/><br/>**`duplicate sequence:`**<br/> • • this button will duplicate the entire pad sequence (the maximum sequence size that can be duplicated is 16 pads)<br/>**`remove all pads:`**<br/> • • this button will remove all pads except the first


## randomization module

visual | how to operate
--- | ---
![randomization module](images/README/randomization.png "randomization module") | **`randomize:`** • • this button will randomize the sequence according to the randomization options you have selected<br/><br/>option | description | pseudo*<br/>--- | --- | ---<br/>arrangement | randomly<br/>arranges pad pieces | no<br/>samples | selects random sample options | no<br/>number of pads | generates a random sequence size | yes<br/>beats per minute | randomizes the sequence tempo | yes<br/>these options | switches random randomization options on / off | no

<sup>*pseudorandom options choose from a set a predefined values that follow popular sequence structures</sup>


## shared sequences

visual | how to operate
--- | ---
![shared sequences module](images/README/shared.png "shared sequences module") | **`share sequence:`**<br/> • • this button will prompt you to name your sequence before sharing its data with the community<br/><br/>**`browse recently shared sequences:`**<br/> • • click on any of the named buttons under this section to load a sequence that has been shared by another user


## saved sequences

visual | how to operate
--- | ---
![saved sequences module](images/README/saved.png "saved sequences module") | **`load sequences:`**<br/> • • after entering the name of an existing user with valid data, pressing this button will load up that user's personally saved sequences<br/><br/>**`save current sequence:`**<br/> • • pressing this button will save the current sequence for the user that was provided<br/><br/>**`sequences saved by loaded user:`**<br/> • • uhh... a list... of sequences... saved... by the... currently... loaded... user... ahem...


## tempo tool

visual | how to operate
--- | ---
![tempo module](images/README/tempo.png "tempo module") | **`to operate:`**<br/> • • the bpm display inside the tempo module displays the tempo currently being calculated<br/> • • hit the [ t ] key on each beat to get the number of beats per minute<br/> • • hit the [ r ] key to reset the bpm counter<br/> • • hit the [ s ] key to set the sequence tempo to the newly calculated bpm