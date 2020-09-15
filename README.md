

# codeQuiz 
### week 04 homework

---

##### Process Summary
For this project I created a dynamic web app that tests the users knowledge on the front-end programming skills, with the potential to be easily expanded or modified for other quizzes.

I began by building out the basic html tags I would need in order to initiate the quiz and easily update the clock and render the questions and answers as needed. I based my clock off of the coding from the tomato timer class activity and inputting new html tags from other activties we've worked on.

I didn't want to create too many html documents, so I realized there would be a lot of html removal and updating, which just took a lot of patients and fiddling with append and appendChild. After passwordGenerator project, I realized I needed to breakdown my function a lot more. I definitely could condense a few further, but as of now the functionality is there. 

And it's not too ugly `¯\_(ツ)_/¯`

##### Basic Functionality

- Build out HTML (index + quiz)
    - Boilerplate
    - Link css stylesheet, javascript, bootstrap, google fonts
    - Create elements to tie javascript to
- Build out basic CSS
- Build out Javascript
    - Began with linking variables to ids and classes
    - Creating timer functionality
    - Creating questions array
        - how to traverse the array and access object keys
        - best way to store questions and link to html
    - Answer verification
        - comparing answer to correct answer
        - deducting from timer
        - adding and storing points
    - Rendering next question
        - incrementing through questions array
    - Game Over functionality
        - game over to initiate when quiz ended or clock runs out
        - removing questions and rendering final score, previous score, and input for user initials
- Local Storage Functionality 
    - setting and retrieving previous scores on button click event
    - displaying data
- Troubleshooting
- Modifying CSS as needed

##### Troubleshooting    

Initials bugs came from simple syntax issues and over complicating the element creation process in Javascript. I broke down functions further and modified the scope of some variables and things started to click. Also, nesting bootstrap attributes requires a looot of attention to detail. But in the end it worked out. I could modify the CSS until I'm blue in the face, and I might, but at the moment *she's working!* And easily modified via the questions object array.
