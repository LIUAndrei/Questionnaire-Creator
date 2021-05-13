# LeverX-Practice-Test
 
This is a questionnaire creator written as part of preemployment tech testing at LeverX company in Belarus.

Functionality is as follows:
 1. App creates new questions after pressing 'Add a question' button.
   1.1. This summons a window that prompts you to enter a question. Approve the question entered by pressing Ok button or cancel with Cancel* button. 
   1.2. Next 4 steps in the same window are steps for entering answer variants for the question, true and false alike.
   1.3. Final step lets you enter the list of correct answers from those entered in previous steps. Please enter up to 4 digits divided by a comma. (Say if you want your first and third answers to be correct enter 1,3). Please avoid letters, digits more than 5 or other characters besides 1,2,3,4 and comma.
   1.4. After pressing OK at the previous step your new questions will be stored in the system. 
   
   *Cancel button cancels the entire question entering process at any step
   
 2. After adding all desired questions, press the 'Start the quiz' button.
   2.1 Answer all the questions by clicking corresponding checkboxes, and press 'Finish the test' to get the result.

If you wish to change default questions you can do so in the app.js file at row 18.
