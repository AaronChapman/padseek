![GitHub version](https://img.shields.io/badge/version-alpha-red.svg) ![GitHub last commit](https://img.shields.io/github/last-commit/AaronChapman/padseek.svg)

![GitHub forks](https://img.shields.io/github/forks/AaronChapman/padseek.svg?style=social&label=Fork) ![GitHub followers](https://img.shields.io/github/followers/AaronChapman.svg?style=social&label=Follow)

# p a d s e e k

> padseek is a module-based drum sequencer made with love and javascript. this is an ongoing project, so things might be wonky here and there while I work out the kinks. please feel free to keep checking in for more features and add-ons

**`how to operate`**

- choose a tempo for your sequence via the 'tempo (beats per minute)' field inside of the 'sequence controls' module
- activate your selected pad pieces inside the 'drum pad' module (optionally: duplicate existing pads)
- choose the drum samples that fit your sequence through the 'sample selection' module
- press 'play sequence' or 'pause sequence' to do exactly what that says
- see modules below

**`keyboard shortcuts`**

key | shortcut
--- | ---
`[ t ]` | calculate tempo
`[ r ]` | reset tempo being calculated
`[ s ]` | set sequence tempo to calculated tempo
`[ c ]` | open / close shortcuts menu
`[ p ]` | play / pause sequence
`[ x ]` | clear sequence selections
`[ z ]` | randomize sequence
`[ m ]` | share current sequence

---
## sequence controls


-**play / pause sequence:**
- this button allows you to control whether or not the sequence is running

-**clear selections:**
- this button will reset all of the pad piece selections you've made

-**tempo (beats per minute):**
- this field controls the speed at which your drum sequence will run
- you can enter a tempo value, or calculate and set one using the keyboard shortcuts outlined in the tempo module


---
## sample selection


-**drum sample options:**
- each row of this module houses a different set of drum samples for you to choose from
- you can make your sample selections at anytime during the sequence

-**sample sampler:**
- clicking on the the sample type, or the '▶' icon, will play the currently selected option for that sample type


---
## drum pads


-**duplicate pad:**
- this button will duplicate the pad beneath it directly in front of it

-**remove pad:**
- this button will remove the pad beneath it

-**pad pieces:**
- activating a pad piece will result in that piece's row triggering the selected sample

-**duplicate sequence:**
- this button will duplicate the entire pad sequence (the maximum sequence size is 32 pads)

-**remove all pads:**
- this button will remove all pads except the first


---
## sharing sequences


-**share sequence:**
- this button will prompt you to name your sequence before sharing its data with the community

-**browse recently shared sequences:**
- click on any of the named buttons under this section to load a sequence that has been shared by another user


---
## tempo tool


-**to operate:**
- hit the [ t ] key for each beat to determine the number of beats per minute
- hit the [ r ] key to reset the bpm counter
- hit the [ s ] key to set the sequence tempo field to the newly calculated bpm


---
## randomization module


-**randomize:**
- this button will randomize the sequence according to the randomization options to have selected

-**random number of pads:**
- when selected, this option will randomize the number of drum pads in the sequence

-**random pad arrangement:**
- when selected, this option will randomize the active pad pieces across all of your drum pads

-**random samples:**
- when selected, this option will randomize the sample selections you've made

-**random tempo:**
- when selected, this option will randomize the sequence tempo (beats per minute)

