module.exports = {
    titleCase: (sentence) => {
        let sentenceArray = sentence.split(" ")

        for (let i = 0; i < sentenceArray.length; i++) {
            sentenceArray[i] = sentenceArray[i].charAt(0).toUpperCase() + sentenceArray[i].slice(1)
        }

        return sentenceArray.join(" ")
    }
}