/*
============================================================================

This file parses the `tkfu/srd_5e_monsters.json` file found at 
https://gist.github.com/tkfu/9819e4ac6d529e225e9fc58b358c3479.js

This is only intended as an initial starting point for the data source,
and it is expected that data will be edited and corrected by hand as errors
are discovered.

============================================================================
*/

const main = function(){

    const input = require('./srd.json');

    const properties = [
        'name',
        'meta',
        'Armor Class',
        'Hit Points',
        'Speed',
        'STR',
        'STR_mod',
        'DEX',
        'DEX_mod',
        'CON',
        'CON_mod',
        'INT',
        'INT_mod',
        'WIS',
        'WIS_mod',
        'CHA',
        'CHA_mod',
        "Saving Throws",
        "Skills",
        "Senses",
        "Languages",
        "Challenge",
        "Traits",
        "Actions",
        "Legendary Actions",
        "img_url"
    ]

    const output = input.flatMap((monster)=>{
        const output = properties.flatMap((item)=>{
            // if(!monster[item]) {console.log(`${monster.name} : ${item}`);}
            if(!monster[item]) return [item];
            return [];
        });
        return output;
    });

    // The following properties are not present on all items
    console.log(Array.from(new Set(output)));
}


main();