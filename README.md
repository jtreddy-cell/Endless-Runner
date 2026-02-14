My Endless Runner will be cat themed. The player would play as a cat running through a endlessly long house. The score will go up with time, and can be increased in two ways. The first will be by picking up treats, which will increase the score by a constant amount. The second will be by picking up catnip, which speeds up the game for 10 seconds, increasing difficulty but also the passive score gained by time passing.

My current plan is to implement the code first, using placeholders boxes for the graphics, then create actual assets. List will get updated as I realize what else I need to do later, I have no idea how extensive this will end up being.

SCRIPT LIST:

Mechanics:
Transitions between Menu and Play Scenes DONE
Display placeholder graphics DONE
Display elapsed time DONE
Interactable Element Spawning DONE
Interactable Element Behaviours on Collision DONE
Properly stop the game when it's ended DONE
Player Jumping DONE

Maybe: Implement additonal lanes to add depth, will try this last

Visuals:
Integrating cat animations DONE
Integrate catnip sprite/animations DONE
Integrate treat sprite/animations
Integrate obstacle sprite/animations
Implement scrolling background

Audio:
Integrate sound effects
Include background music


VISUAL LIST:

Cat Sprite for Player DONE
Catnip sprite DONE
Treat sprite
Obstacles
Background

SOUNDS LIST:
Background music
Sound effects

Rubric:
Organization (3 points)
Submit a link to your GitHub repository that shows a history of multiple meaningful commits with descriptive messages (1)
Submit a playable link on GitHub pages (1)
In main.js (or equivalent), include a comment header with your name, game title, approximate hours spent on project, and your creative tilt justification (see below) (1)

Structure and Design (15 points)
Your game should:

Use multiple Scene classes (dictated by your game's style) (1) DONE
Properly transition between Scenes and allow the player to restart w/out having to reload the page (1) DONE
Include in-game instructions using text or other means (e.g., tooltips, tutorial, diagram, etc.) (1)
Have some form of player input/control appropriate to your game design (1) DONE
Include one or more animated characters that use a texture atlas/sprite sheet* (1) DONE
Simulate scrolling with a tileSprite (or equivalent means) (1)
Implement proper collision detection (via Arcade Physics or a custom routine) (1) DONE
Have looping background music* (1) 
Use a minimum of four sound effects for key mechanics, UI, and/or significant events appropriate to your game design (1)
Use randomness to generate escalating challenge, e.g. terrain, pickups, etc. (1) DONE
Include some metric of accomplishment that a player can improve over time, e.g., score, survival time, etc. (1) DONE
Be theoretically endless (1) DONE
Be playable for at least 15 seconds for a new player of low to moderate skill (1) DONE
Run without significant crashes or errors (1) DONE
Include in-game credits for all roles, assets, music, etc. (1)
* You must make all of your own visual assets (without AI assistance). It's OK to use royalty-free music/SFX.

Creative Tilt (2 points)
Does your game...

...do something technically interesting? Are you particularly proud of a programming technique you implemented? Did you look beyond the class examples and learn how to do something new? (1)
...have a great visual style? Does it use music or art that you're particularly proud of? Are you trying something new or clever with the endless runner form? (1)

Score: 10/20