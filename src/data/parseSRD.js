/*
============================================================================

This file parses the `tkfu/srd_5e_monsters.json` file found at 
https://gist.github.com/tkfu/9819e4ac6d529e225e9fc58b358c3479.js

This is only intended as an initial starting point for the data source,
and it is expected that data will be edited and corrected by hand as errors
are discovered.

============================================================================
*/

const fs = require('fs');

const main = function(){

    const input = require('./srd_monsters.json');

    const output = input.flatMap((monster)=>{
        ["Actions", "Traits", "Legendary Actions"].map((item)=>{
            monster[item] = monster[item] && parseString(monster[item]).split('</p>');
        });
        return monster;
    });

    // console.log(JSON.stringify(output));

    fs.writeFileSync('./srd.json', JSON.stringify(output, null, 4));

}

const parseString = function(inputString) {
    if(!inputString) return;

    let outputString = inputString;
    
    const terms = [
        { searchTerm: '<p>', replaceTerm : '' },
        { searchTerm: '<em>', replaceTerm : '*' },
        { searchTerm: '</em>', replaceTerm : '*' },
        { searchTerm: '<strong>', replaceTerm : '**' },
        { searchTerm: '</strong>', replaceTerm : '**' },
    ]

    terms.map((term)=>{
        outputString = outputString.replaceAll(term.searchTerm, term.replaceTerm);
    });

    if(outputString.slice(0,1)== ','){
        outputString = outputString.substring(1);
    };
    if(outputString.slice(-4) == '</p>'){
        outputString = outputString.slice(0, -4);
    };

    // console.log(`${inputString}\n\n >>>\n\n ${outputString}`);
    return outputString;
};

main();