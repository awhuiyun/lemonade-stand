# The Lemonade Stand Game

Mend your lemonade stand and attempt to maximise your profits in 7 days (rounds)! Check the daily weather report as an indicator of the demand for the day. If weather is great (aka hot and sunny), expect to sell more cups of lemonade. If its wet and dreary, expect less sales. Choose the amount of inventory to stock up and how to price each cup each day. Check out the tooltips available in the game for more hints. Maximise profits by minimising wastage and maximising sales.

Try it out: [HERE](https://the-lemonade-stand-game.netlify.app/)

## Project Description

### Project Objective & Tech Stack

My first ever project to solidify what I've learnt in my first 2 weeks of the General Assembly SWE Immersive Course (Singapore). I'm using purely HTML, CSS and Javascript (+ jQuery).

### How I approached this

- **_Game setup:_** A single HTML file with event listeners on buttons to toggle between the different divs (display: hide/block) to show different screens (start page, inventory/pricing page or animation page etc).
- **_Variables_**: Created 2 sets of variables for key variables like cash and inventory. One for the purpose of game logic (eg it should be updated accordingly after inventory purchase and sales). The other for presentational purposes (eg animation). I seperated them so that hiccups in animations will not affect the game flow.
- **_Calculation of daily demand:_** First, randomize the number of daily passers by between 75-100. Next, calculate the probability that each of this passers by will purchase a cup, which is a factor of weather, temperature and price. Each weather, temperature and price range is assigned a probability and the final probability of the event happening (aka purchase) is the multiplication of each factor. To determine if each customer will purchase a cup, I generated a randomized number between 0-1 (Math.random) and it'll be a "yes" if its less than the probability of purchase and "no" if it exceeds. I ensured that the cups sold do not exceed the max number of cups that can be sold based on available inventory. I created an array called resultArray which consists of "yes"s and "no"s, to aid the next step - which is animations!
- **_Animation of customers:_** Four types of characters required - (1) Character walks towards the lemonade stand, take a pause and walks away, (2) Character that just walks by without pausing; in two directions for each. This required canvas. I created a character class with properties required in the drawImage canvas method (img src, sw/sh, dw/dh etc). I looped through the resultArray and created character instances for each result, giving different arguments for "yes" vs "no" so they can be animated differently. To allow the character to pause at the lemonade stand, I used a setTimeout to delay the update of its x-coordinate so that it'll stall at the specific x-coordinate. At this specific x-coordinate, also updated the cash and inventory variables & DOM so the timing syncs up.

### Challenges faced & Key Learnings

- First attempt with animation and it was fun figuring out the basics of canvas.
- Got stuck attempting to "trickle in" the characters instead of drawing them all at once. I had a function that looped through the resultArray to create another array of character instances/objects. I made this function async to await a setTimeout of 0.5 secs to slow down its loop, resulting in the instances to be created with a 0.5 secs delay between each. This allowed the characters to be drawn with a 0.5 secs delay as well.
- Adding the animations resulted in bugs (eg, my inventory and cash balances no longer tally after each round of animations). Key learning: Use different variables for game logic and presentational purposes (displaying on DOM), so that bugs in my animation logic will not affect game flow.

### Future features to build

- Leaderboard: A record of scores from each game so you can attempt to beat your previous high score. To use localStorage for this.
- A button to fast forward the animation.

## Credits

A really helpful beginner game development tutorial which got me started on canavs: [HERE](https://www.youtube.com/watch?v=GFO_txvwK_c&t=21987s).
