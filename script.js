const quotes = [
    "Would I rather be feared or loved? Easy. Both. I want people to be afraid of how much they love me.",
    "Whenever I'm about to do something, I think, 'Would an idiot do that?' and if they would, I do not do that thing.",
    "I knew exactly what to do. But in a much more real sense, I had no idea what to do.",
    "Identity theft is not a joke, Jim! Millions of families suffer every year.",
    "Sometimes I'll start a sentence and I don't even know where it's going. I just hope I find it along the way. Like an improv conversation.",
    "One day Michael came in and complained about a speed bump on the highway...I wonder who he ran over then.",
    "I wish there was a way to know you're in the good old days before you've actually left them.",
    "I'm not superstitious...but I'm a little stitious.",
    "I hate the idea that someone out there hates me. I even hate thinking that al-Qaeda hates me. I think if they got to know me, they wouldn't hate me.",
    "Sometimes the clothes at Gap Kids are just too flashy. So I'm forced to go to the American Girl store and order clothes for large colonial dolls." ,
    "Guess what, I have flaws. What are they? Oh, I don't know. I sing in the shower. Sometimes I spend too much time volunteering. Occasionally I'll hit somebody with my car. So sue me...no, don't sue me. That is the opposite of the point that I'm trying to make.",
    "Do I need to be liked? Absolutely not. I like to be liked. I enjoy being liked. I have to be liked. But it’s not like, this compulsive need to be liked, like my need to be praised.",
    "When you’re a kid, you assume your parents are soulmates. My kids are going to be right about that."
];
// store the list of words and the index of the word the player is currently typing
let words = [];
let wordIndex = 0;
// the starting time
let startTime = Date.now();
// page elements
const quoteElement = document.getElementById('quote');
const messageElement = document.getElementById('message');
const typedValueElement = document.getElementById('typed-value');

//start logic
document.getElementById('start').addEventListener('click', () => {
    // get a quote
    const quoteIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[quoteIndex];
    // Put the quote into an array of words
    words = quote.split(' ');
    // reset the word index for tracking
    wordIndex = 0;
  
    // UI updates
    // Create an array of span elements so we can set a class
    const spanWords = words.map(function(word) { return `<span>${word} </span>`});
    // Convert into string and set as innerHTML on quote display
    quoteElement.innerHTML = spanWords.join('');
    // Highlight the first word
    quoteElement.childNodes[0].className = 'highlight';
    // Clear any prior messages
    messageElement.innerText = '';
  
    // Setup the textbox
    // Clear the textbox
    typedValueElement.value = '';
    // set focus
    typedValueElement.focus();
    // set the event handler
  
    // Start the timer
    startTime = new Date().getTime();
  });

// typing logic
  typedValueElement.addEventListener('input', () => {
    // Get the current word
    const currentWord = words[wordIndex];
    // get the current value
    const typedValue = typedValueElement.value;
  
    if (typedValue === currentWord && wordIndex === words.length - 1) {
      // end of sentence
      // Display success
      const elapsedTime = new Date().getTime() - startTime;
      const message = `CONGRATULATIONS! You finished in ${elapsedTime / 1000} seconds.`;
      messageElement.innerText = message;
    } else if (typedValue.endsWith(' ') && typedValue.trim() === currentWord) {
      // end of word
      // clear the typedValueElement for the new word
      typedValueElement.value = '';
      // move to the next word
      wordIndex++;
      // reset the class name for all elements in quote
      for (const wordElement of quoteElement.childNodes) {
        wordElement.className = '';
      }
      // highlight the new word
      quoteElement.childNodes[wordIndex].className = 'highlight';
    } else if (currentWord.startsWith(typedValue)) {
      // currently correct
      // highlight the next word
      typedValueElement.className = '';
    } else {
      // error state
      typedValueElement.className = 'error';
    }
  });